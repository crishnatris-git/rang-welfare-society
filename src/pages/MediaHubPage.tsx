import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Images,
  MapPin,
  Megaphone,
  ArrowRight,
  Eye,
  X,
} from 'lucide-react';
import { PageHeader, OrnamentalDivider, EditorialImage, Lightbox, LightboxItem } from '../components/EditorialUI';
import { VideoHero } from '../components/VideoHero';
import { ASSETS } from '../data/assets';
import {
  STATIC_GALLERY_PHOTOS,
  OFFICIAL_PUBLICATIONS,
  STATIC_NEWS_ARTICLES,
  type OfficialNewsArticle,
} from '../data/communityAndVisionData';
import {
  AnnouncementDoc,
  GalleryItemDoc,
  PublicationDoc,
  SocietyEventDoc,
  subscribePublishedAnnouncements,
  subscribePublishedEvents,
  subscribePublishedGallery,
  subscribePublishedPublications,
} from '../services/cmsService';
import { usePageSeo } from '../utils/seo';

type MediaMode = 'gallery' | 'publications' | 'newsroom' | 'news-detail' | 'events';

interface UnifiedNewsItem {
  id: string;
  slug: string;
  title: string;
  category: OfficialNewsArticle['category'];
  location?: string;
  publishDate?: string;
  summary: string;
  paragraphs: string[];
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  authorName: string;
}

export function MediaHubPage({ mode = 'gallery' }: { mode?: MediaMode }) {
  const { slug } = useParams<{ slug?: string }>();
  const [cmsGallery, setCmsGallery] = useState<GalleryItemDoc[]>([]);
  const [cmsPublications, setCmsPublications] = useState<PublicationDoc[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementDoc[]>([]);
  const [events, setEvents] = useState<SocietyEventDoc[]>([]);

  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activePdf, setActivePdf] = useState<{
    title: string;
    documentUrl: string;
    downloadFilename?: string;
  } | null>(null);
  const [newsCategory, setNewsCategory] = useState<string>('All');
  const [eventFilter, setEventFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    if (!activePdf) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePdf(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePdf]);

  const combinedNews: UnifiedNewsItem[] = useMemo(() => {
    const staticItems: UnifiedNewsItem[] = STATIC_NEWS_ARTICLES.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      category: a.category,
      location: a.location,
      publishDate: a.publishDate,
      summary: a.summary,
      paragraphs: a.paragraphs,
      imageUrl: a.imageUrl,
      imageAlt: a.imageAlt,
      imageCaption: a.imageCaption,
      authorName: a.authorName,
    }));
    const cmsItems: UnifiedNewsItem[] = announcements.map((a) => ({
      id: a.id,
      slug: a.id,
      title: a.title,
      category: a.category,
      publishDate: a.publishDate,
      summary: a.summary,
      paragraphs: a.body
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean),
      authorName: a.authorName,
    }));
    return [...staticItems, ...cmsItems];
  }, [announcements]);

  const activeNewsArticle = useMemo(() => {
    if (mode !== 'news-detail' || !slug) return null;
    return combinedNews.find((item) => item.slug === slug || item.id === slug) || null;
  }, [mode, slug, combinedNews]);

  usePageSeo({
    title:
      mode === 'gallery'
        ? 'Photo Gallery — Rang Welfare Society'
        : mode === 'publications'
        ? 'Official Publications & Souvenirs — Rang Welfare Society'
        : mode === 'news-detail'
        ? activeNewsArticle
          ? `${activeNewsArticle.title} — Rang Welfare Society`
          : 'Newsroom Article — Rang Welfare Society'
        : mode === 'newsroom'
        ? 'Newsroom & Official Notices — Rang Welfare Society'
        : 'Events & Conferences — Rang Welfare Society',
    description:
      mode === 'gallery'
        ? 'Curated archival photographs of Rang Village landscapes, Nine Clans heritage, Silver Jubilee Monolith, leadership, Self-Help Groups, and 25 years of RWS service.'
        : mode === 'publications'
        ? 'Read and download official Rang Welfare Society publications, including the Silver Jubilee Commemorative Souvenir — Rang: The 9 Colours.'
        : mode === 'news-detail' && activeNewsArticle
        ? activeNewsArticle.summary
        : mode === 'newsroom'
        ? 'Official notices, community news, announcements, and institutional updates published by Rang Welfare Society.'
        : 'Official conferences, community meetings, cultural programmes, and development activities announced by Rang Welfare Society.',
    canonicalPath:
      mode === 'news-detail' && slug ? `/media/newsroom/${slug}` : `/media/${mode}`,
    jsonLd:
      mode === 'news-detail' && activeNewsArticle
        ? {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: activeNewsArticle.title,
            description: activeNewsArticle.summary,
            image: activeNewsArticle.imageUrl,
            publisher: {
              '@type': 'Organization',
              name: 'Rang Welfare Society',
            },
          }
        : undefined,
  });

  useEffect(() => {
    const unsubs: Array<() => void> = [];
    if (mode === 'gallery') {
      unsubs.push(subscribePublishedGallery(setCmsGallery));
    } else if (mode === 'publications') {
      unsubs.push(subscribePublishedPublications(setCmsPublications));
    } else if (mode === 'newsroom' || mode === 'news-detail') {
      unsubs.push(subscribePublishedAnnouncements(setAnnouncements));
    } else if (mode === 'events') {
      unsubs.push(subscribePublishedEvents(setEvents));
    }
    return () => {
      unsubs.forEach((u) => u());
    };
  }, [mode]);

  const combinedGallery = useMemo(() => {
    const cmsMapped = cmsGallery.map((item) => ({
      id: `cms-${item.id}`,
      title: item.title,
      caption: item.caption,
      category: item.category || 'Community Archive',
      period: item.period || 'Post-Jubilee Archive',
      url: item.imageUrl,
    }));
    return [...cmsMapped, ...STATIC_GALLERY_PHOTOS];
  }, [cmsGallery]);

  const galleryCategories = useMemo(() => {
    const unique = Array.from(new Set(combinedGallery.map((p) => p.category)));
    return ['All', ...unique];
  }, [combinedGallery]);

  const filteredGallery = useMemo(() => {
    if (selectedGalleryCategory === 'All') return combinedGallery;
    return combinedGallery.filter((p) => p.category === selectedGalleryCategory);
  }, [combinedGallery, selectedGalleryCategory]);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      filteredGallery.map((p) => ({
        url: p.url,
        title: p.title,
        caption: p.caption,
        category: `${p.category} · ${p.period}`,
      })),
    [filteredGallery]
  );

  const filteredNews = useMemo(() => {
    if (newsCategory === 'All') return combinedNews;
    return combinedNews.filter((a) => a.category === newsCategory);
  }, [combinedNews, newsCategory]);

  const filteredEvents = useMemo(() => {
    if (eventFilter === 'upcoming') return events.filter((e) => !e.isPast);
    if (eventFilter === 'past') return events.filter((e) => e.isPast);
    return events;
  }, [events, eventFilter]);

  const subNav = (
    <div className="flex flex-wrap gap-2">
      {[
        { label: 'Photo Gallery', to: '/media/gallery', active: mode === 'gallery' },
        { label: 'Publications & PDFs', to: '/media/publications', active: mode === 'publications' },
        {
          label: 'Newsroom & Notices',
          to: '/media/newsroom',
          active: mode === 'newsroom' || mode === 'news-detail',
        },
        { label: 'Events & Conferences', to: '/media/events', active: mode === 'events' },
      ].map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className={`px-4 py-2 text-xs font-medium tracking-wide rounded-sm border transition-colors whitespace-nowrap shrink-0 ${
            tab.active
              ? 'bg-[#B88A3E] text-[#0E2A1C] border-[#B88A3E]'
              : 'bg-white/5 text-[#E4DEC9] border-white/20 hover:bg-white/10 hover:text-white'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );

  if (mode === 'gallery') {
    return (
      <div>
        <PageHeader
          kicker="Media & Visual Archive"
          title="Archival Photo Gallery"
          subtitle="Visual documentation of Rang Village landscapes, customary leadership, Self-Help Groups, infrastructure milestones, and 25 years of Rang Welfare Society service."
          breadcrumbs={[{ label: 'Media' }, { label: 'Photo Gallery' }]}
          backgroundImage={ASSETS.landscapes.valleyKamengSunrise}
        >
          {subNav}
        </PageHeader>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <VideoHero variant="media" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D8CEB8] pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium">
                Curated Photographic Record
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#143A28] font-semibold">
                {selectedGalleryCategory === 'All' ? 'Complete Archival Collection' : selectedGalleryCategory}
              </h2>
            </div>
            <p className="text-sm text-[#5A6058] tabular-nums">
              Showing {filteredGallery.length} of {combinedGallery.length} archival photographs
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery by category">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedGalleryCategory === cat}
                onClick={() => {
                  setSelectedGalleryCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedGalleryCategory === cat
                    ? 'bg-[#143A28] text-[#F9F6EF] border-[#143A28]'
                    : 'bg-[#F9F6EF] text-[#334139] border-[#D8CEB8] hover:border-[#B88A3E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredGallery.map((photo, idx) => (
              <article
                key={photo.id}
                className="bg-white border border-[#E4DCC9] rounded-sm overflow-hidden flex flex-col shadow-xs hover:border-[#B88A3E]/70 transition-colors"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE3D2]">
                  <EditorialImage
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover"
                    onClick={() => setLightboxIndex(idx)}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.14em] text-[#8E6520] font-medium">
                    <span className="truncate">{photo.category}</span>
                    <span className="tabular-nums shrink-0 text-[#5A6058]">{photo.period}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-lg text-[#143A28] font-semibold leading-snug">
                    {photo.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#4A524C] leading-relaxed flex-1">{photo.caption}</p>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#143A28] hover:text-[#8E6520] transition-colors self-start cursor-pointer"
                  >
                    <Images className="w-3.5 h-3.5" />
                    Inspect Full Frame
                  </button>
                </div>
              </article>
            ))}
          </div>

          <OrnamentalDivider className="my-12" />

          <div className="bg-[#F2ECE0] border border-[#D8CEB8] rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium">
                Community Photographic Preservation
              </p>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#143A28] font-semibold">
                Preserve Historical Photographs of Rang Village
              </h3>
              <p className="mt-2 text-sm text-[#4A524C] leading-relaxed">
                Families and elders holding historical photographs of earlier conferences, pioneers, or community milestones may submit references for review and archival inclusion by the RWS Editorial Committee.
              </p>
            </div>
            <Link
              to="/contribute"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#1B4332] transition-colors whitespace-nowrap shrink-0"
            >
              Submit Archival Photograph
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      </div>
    );
  }

  if (mode === 'publications') {
    return (
      <div>
        <PageHeader
          kicker="Official Library & Digital Editions"
          title="Publications & Souvenirs"
          subtitle="Read and download the authoritative Silver Jubilee Commemorative Souvenir and official archival publications issued by Rang Welfare Society."
          breadcrumbs={[{ label: 'Media' }, { label: 'Publications & PDFs' }]}
          backgroundImage={ASSETS.landscapes.heroRangHills}
        >
          {subNav}
        </PageHeader>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="border-b border-[#D8CEB8] pb-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium">
              Silver Jubilee Commemorative Library (2026)
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#143A28] font-semibold">
              Primary Archival Editions
            </h2>
          </div>

          {(() => {
            const displayedPublications = OFFICIAL_PUBLICATIONS.filter(
              (pub) => pub.id !== 'pub-master-manuscript'
            );
            const isSingle = displayedPublications.length === 1;
            return (
              <div
                className={
                  isSingle
                    ? 'mt-8 max-w-4xl mx-auto'
                    : 'mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8'
                }
              >
                {displayedPublications.map((pub) => (
                  <article
                    key={pub.id}
                    className="bg-[#FDFBF6] border border-[#E4DCC9] rounded-sm overflow-hidden flex flex-col sm:flex-row shadow-xs"
                  >
                    <div
                      className={`${
                        isSingle ? 'sm:w-64' : 'sm:w-56'
                      } shrink-0 bg-[#143A28] flex items-center justify-center p-6`}
                    >
                      <img
                        src={pub.coverUrl}
                        alt={`${pub.title} cover`}
                        referrerPolicy="no-referrer"
                        className="w-full max-w-[200px] aspect-[210/297] object-contain bg-white rounded-xs border border-[#B88A3E]/55 shadow-md"
                      />
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.14em] text-[#8E6520] font-medium">
                        <span>{pub.category}</span>
                        <span className="tabular-nums text-[#5A6058]">{pub.year}</span>
                      </div>
                      <h3 className="mt-2 font-serif text-xl sm:text-2xl text-[#143A28] font-semibold leading-snug">
                        {pub.title}
                      </h3>
                      <p className="mt-1.5 text-xs font-mono text-[#5A6058]">{pub.pages}</p>
                      <p className="mt-3 text-sm sm:text-[15px] text-[#4A524C] leading-relaxed flex-1">
                        {pub.description}
                      </p>
                      <div className="mt-6 pt-4 border-t border-[#EFE8D8] flex flex-wrap gap-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            setActivePdf({
                              title: pub.title,
                              documentUrl: pub.documentUrl,
                              downloadFilename: pub.downloadFilename,
                            })
                          }
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Read Online
                        </button>
                        <a
                          href={pub.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#143A28] border border-[#D8CEB8] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:border-[#B88A3E] transition-colors whitespace-nowrap shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Open PDF
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={pub.documentUrl}
                          download={pub.downloadFilename || true}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F2ECE0] text-[#143A28] border border-[#D8CEB8] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:border-[#B88A3E] transition-colors whitespace-nowrap shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            );
          })()}

          <OrnamentalDivider className="my-12" />

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium">
              Post-Jubilee Institutional Repository
            </p>
            <h2 className="mt-1 font-serif text-2xl text-[#143A28] font-semibold">
              Annual Reports, Resolutions & Subsequent Bulletins
            </h2>

            {cmsPublications.length === 0 ? (
              <div className="mt-6 bg-[#F2ECE0] border border-[#D8CEB8] rounded-sm p-8 text-center">
                <FileText className="w-8 h-8 text-[#8E6520] mx-auto mb-3" />
                <h3 className="font-serif text-lg text-[#143A28] font-semibold">
                  No Post-Jubilee Publications Added Yet
                </h3>
                <p className="mt-2 text-sm text-[#4A524C] max-w-xl mx-auto leading-relaxed">
                  Additional annual reports, Vision 2047 baseline survey dossiers, and future RWS circulars will appear here once formally issued and published by the Society through the RWS Administration Portal.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cmsPublications.map((pub) => (
                  <article
                    key={pub.id}
                    className="bg-white border border-[#E4DCC9] rounded-sm p-6 flex flex-col shadow-xs"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#8E6520] font-medium">
                      <span>{pub.category}</span>
                      <span className="tabular-nums text-[#5A6058]">{pub.year}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-lg text-[#143A28] font-semibold">
                      {pub.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4A524C] leading-relaxed flex-1">
                      {pub.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-[#EFE8D8]">
                      <a
                        href={pub.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#143A28] hover:text-[#8E6520]"
                      >
                        Open Document
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {activePdf && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activePdf.title}
            className="fixed inset-0 z-50 bg-[#0B1E14]/90 flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActivePdf(null)}
          >
            <div
              className="bg-[#FDFBF6] border border-[#B88A3E]/50 rounded-sm shadow-2xl w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#143A28] text-[#F9F6EF] px-4 sm:px-6 py-3.5 border-b border-[#B88A3E]/40 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#E3C17A] font-medium">
                    Digital Publication Viewer
                  </p>
                  <h3 className="font-serif text-base sm:text-lg font-semibold truncate">
                    {activePdf.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activePdf.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#F9F6EF] text-xs font-medium rounded-sm transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open in New Tab</span>
                  </a>
                  <a
                    href={activePdf.documentUrl}
                    download={activePdf.downloadFilename || true}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B88A3E] hover:bg-[#C99B4E] text-[#0E2418] text-xs font-semibold rounded-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setActivePdf(null)}
                    aria-label="Close publication viewer"
                    className="p-1.5 text-[#F9F6EF] bg-white/10 hover:bg-white/20 rounded-sm transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-[#EAE3D2] relative">
                <iframe
                  src={`${activePdf.documentUrl}#view=FitH`}
                  title={activePdf.title}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode === 'news-detail') {
    if (!activeNewsArticle) {
      return (
        <div>
          <PageHeader
            kicker="Official Communications"
            title="Newsroom & Official Notices"
            subtitle="The requested news article could not be located in the Rang Welfare Society Newsroom."
            breadcrumbs={[
              { label: 'Media' },
              { label: 'Newsroom & Notices', to: '/media/newsroom' },
              { label: 'Article Not Found' },
            ]}
            backgroundImage={ASSETS.landscapes.valleyKamengPanorama}
          >
            {subNav}
          </PageHeader>
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="font-serif text-2xl text-[#143A28] font-semibold">
              News Article Not Found
            </h2>
            <p className="mt-3 text-sm text-[#4A524C]">
              Return to the Newsroom to browse the latest community news and official notices from Rang Welfare Society.
            </p>
            <Link
              to="/media/newsroom"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Newsroom
            </Link>
          </section>
        </div>
      );
    }

    return (
      <div>
        <PageHeader
          kicker={`Newsroom · ${activeNewsArticle.category}${activeNewsArticle.location ? ` · ${activeNewsArticle.location}` : ''}`}
          title={activeNewsArticle.title}
          subtitle={activeNewsArticle.publishDate ? `Published ${activeNewsArticle.publishDate} · ${activeNewsArticle.authorName}` : `Issued by ${activeNewsArticle.authorName}`}
          breadcrumbs={[
            { label: 'Media' },
            { label: 'Newsroom & Notices', to: '/media/newsroom' },
            { label: activeNewsArticle.title },
          ]}
          backgroundImage={ASSETS.landscapes.valleyKamengPanorama}
        >
          {subNav}
        </PageHeader>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mb-6">
            <Link
              to="/media/newsroom"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#143A28] hover:text-[#8E6520] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Newsroom &amp; Notices
            </Link>
          </div>

          {activeNewsArticle.imageUrl && (
            <figure className="mb-8 bg-[#FDFBF6] border border-[#DED4BD] rounded-sm overflow-hidden shadow-xs">
              <div className="bg-[#F2ECE0]">
                <img
                  src={activeNewsArticle.imageUrl}
                  alt={activeNewsArticle.imageAlt || activeNewsArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
              </div>
              {activeNewsArticle.imageCaption && (
                <figcaption className="px-5 py-3.5 text-xs sm:text-[13px] text-[#535A52] italic leading-relaxed border-t border-[#ECE5D5] bg-[#FDFBF6]">
                  {activeNewsArticle.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 sm:p-11 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-[#EFE8D8] text-xs uppercase tracking-[0.14em] text-[#8E6520] font-medium">
              <span className="inline-flex items-center gap-2">
                <span>{activeNewsArticle.category}</span>
                {activeNewsArticle.location && (
                  <>
                    <span className="text-[#C8BC9F]">·</span>
                    <span className="inline-flex items-center gap-1 text-[#5A6058]">
                      <MapPin className="w-3.5 h-3.5 text-[#8E6520]" />
                      {activeNewsArticle.location}
                    </span>
                  </>
                )}
              </span>
              {activeNewsArticle.publishDate && (
                <span className="tabular-nums text-[#5A6058]">{activeNewsArticle.publishDate}</span>
              )}
            </div>

            <div className="space-y-5 font-serif text-[17px] leading-[1.86] text-[#242925]">
              {activeNewsArticle.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[#EFE8D8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B726C]">
              <span>Issued by {activeNewsArticle.authorName}</span>
              <Link
                to="/media/newsroom"
                className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] text-[#143A28] hover:text-[#8E6520] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Newsroom Stories
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  }

  if (mode === 'newsroom') {
    const categories = [
      'All',
      'Community News',
      'Official Notice',
      'Announcement',
      'Institutional Update',
      'Public Statement',
      'Development Initiative',
    ];

    return (
      <div>
        <PageHeader
          kicker="Official Communications"
          title="Newsroom & Official Notices"
          subtitle="Community news, verified public statements, official notices, and institutional updates issued by Rang Welfare Society."
          breadcrumbs={[{ label: 'Media' }, { label: 'Newsroom & Notices' }]}
          backgroundImage={ASSETS.landscapes.valleyKamengPanorama}
        >
          {subNav}
        </PageHeader>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#D8CEB8]">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setNewsCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  newsCategory === cat
                    ? 'bg-[#143A28] text-[#F9F6EF] border-[#143A28]'
                    : 'bg-[#F9F6EF] text-[#334139] border-[#D8CEB8] hover:border-[#B88A3E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredNews.length === 0 ? (
            <div className="mt-10 bg-white border border-[#D8CEB8] rounded-sm p-10 sm:p-12 text-center">
              <Megaphone className="w-9 h-9 text-[#8E6520] mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-[#143A28] font-semibold">
                No Official Notices in This Category Yet
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#4A524C] max-w-xl mx-auto leading-relaxed">
                This newsroom exclusively carries verified news, notices, and announcements published by authorised office-bearers of Rang Welfare Society.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setNewsCategory('All')}
                  className="px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View All News
                </button>
                <Link
                  to="/society/messages"
                  className="px-4 py-2.5 bg-[#F2ECE0] text-[#143A28] border border-[#D8CEB8] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:border-[#B88A3E] transition-colors whitespace-nowrap shrink-0"
                >
                  Read Silver Jubilee Messages
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {filteredNews.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white border border-[#E4DCC9] hover:border-[#B88A3E] rounded-sm overflow-hidden shadow-xs transition-colors"
                >
                  <Link
                    to={`/media/newsroom/${item.slug}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143A28]"
                  >
                    {item.imageUrl && (
                      <div className="aspect-video w-full bg-[#F2ECE0] border-b border-[#EFE8D8] overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.imageAlt || item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.14em] text-[#8E6520] font-medium">
                        <span className="inline-flex items-center gap-2">
                          <span>{item.category}</span>
                          {item.location && (
                            <>
                              <span className="text-[#C8BC9F]">·</span>
                              <span className="inline-flex items-center gap-1 text-[#5A6058]">
                                <MapPin className="w-3.5 h-3.5 text-[#8E6520]" />
                                {item.location}
                              </span>
                            </>
                          )}
                        </span>
                        {item.publishDate && (
                          <span className="tabular-nums text-[#5A6058]">{item.publishDate}</span>
                        )}
                      </div>
                      <h2 className="mt-2.5 font-serif text-2xl sm:text-[26px] text-[#143A28] group-hover:text-[#2D6A4F] font-semibold leading-snug transition-colors">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm sm:text-base text-[#4A524C] leading-relaxed">
                        {item.summary}
                      </p>
                      <div className="mt-5 pt-4 border-t border-[#EFE8D8] flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-[#6B726C]">
                          Issued by {item.authorName}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#143A28] group-hover:text-[#8E6520] transition-colors">
                          Read More
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="Community Calendar & Programmes"
        title="Events & Conferences"
        subtitle="Official General Conferences, Vision Day reviews, cultural programmes, and community meetings scheduled by Rang Welfare Society."
        breadcrumbs={[{ label: 'Media' }, { label: 'Events & Conferences' }]}
        backgroundImage={ASSETS.landscapes.heroRangHills}
      >
        {subNav}
      </PageHeader>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CEB8]">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'past', label: 'Past Programmes' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setEventFilter(opt.id as 'all' | 'upcoming' | 'past')}
                className={`px-4 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  eventFilter === opt.id
                    ? 'bg-[#143A28] text-[#F9F6EF] border-[#143A28]'
                    : 'bg-[#F9F6EF] text-[#334139] border-[#D8CEB8] hover:border-[#B88A3E]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#5A6058] tabular-nums">
            {filteredEvents.length} published {filteredEvents.length === 1 ? 'programme' : 'programmes'}
          </p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="mt-10 bg-white border border-[#D8CEB8] rounded-sm p-10 sm:p-12 text-center">
            <Calendar className="w-9 h-9 text-[#8E6520] mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-[#143A28] font-semibold">
              No Scheduled Events Published Yet
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A524C] max-w-xl mx-auto leading-relaxed">
              Following the Silver Jubilee Celebration (18–19 November 2026), upcoming General Conferences, Annual Rang Vision Day assemblies, and cultural programmes will be posted here once officially announced by RWS leadership.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/heritage/25-years"
                className="px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] transition-colors whitespace-nowrap shrink-0"
              >
                Explore 25-Year Historical Timeline
              </Link>
              <Link
                to="/vision-2047"
                className="px-4 py-2.5 bg-[#F2ECE0] text-[#143A28] border border-[#D8CEB8] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:border-[#B88A3E] transition-colors whitespace-nowrap shrink-0"
              >
                View Rang Vision 2047
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {filteredEvents.map((ev) => (
              <article
                key={ev.id}
                className="bg-white border border-[#E4DCC9] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-xs"
              >
                {ev.posterUrl && (
                  <div className="sm:w-48 shrink-0">
                    <EditorialImage
                      src={ev.posterUrl}
                      alt={ev.title}
                      className="w-full aspect-[4/3] rounded-xs overflow-hidden"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.14em] text-[#8E6520] font-medium">
                    <span>
                      {ev.category} · {ev.isPast ? 'Past Programme' : 'Upcoming'}
                    </span>
                    <span className="tabular-nums text-[#5A6058]">{ev.eventDate}</span>
                  </div>
                  <h2 className="mt-2 font-serif text-2xl text-[#143A28] font-semibold">
                    {ev.title}
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#5A6058]">
                    <MapPin className="w-3.5 h-3.5 text-[#8E6520]" />
                    {ev.location}
                  </p>
                  <p className="mt-3 text-sm text-[#4A524C] leading-relaxed whitespace-pre-line">
                    {ev.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
