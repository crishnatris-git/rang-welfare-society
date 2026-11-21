import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight, X } from 'lucide-react';
import { PageHeader } from '../components/EditorialUI';
import { ASSETS } from '../data/assets';
import { buildStaticSearchIndex } from '../data/searchIndex';
import {
  AnnouncementDoc,
  CmsArticleDoc,
  SocietyEventDoc,
  subscribePublishedAnnouncements,
  subscribePublishedCmsArticles,
  subscribePublishedEvents,
} from '../services/cmsService';
import { searchArchive, SearchCategory, SearchDocument } from '../utils/archiveLogic';
import { usePageSeo } from '../utils/seo';

const SEARCH_CATEGORIES: SearchCategory[] = [
  'All',
  'Clans',
  'Articles',
  'Poems',
  'Folktales',
  'People & Pioneers',
  'Historical Milestones',
  'Landscape & Sites',
  'Vision 2047',
  'Community Institutions',
  'News & Publications',
];

const SUGGESTED_QUERIES = [
  'Nyangpo Soh',
  'Kocho',
  'Monolith',
  'PMGSY',
  'Nyokum Yullo',
  'Mama Kocho',
  'Vision 2047',
  'Lungte-Dapo',
];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('All');

  const [announcements, setAnnouncements] = useState<AnnouncementDoc[]>([]);
  const [events, setEvents] = useState<SocietyEventDoc[]>([]);
  const [cmsArticles, setCmsArticles] = useState<CmsArticleDoc[]>([]);

  usePageSeo({
    title: query ? `Search: ${query} — Rang Welfare Society` : 'Archive Search — Rang Welfare Society',
    description:
      'Search across the complete Rang Welfare Society digital heritage archive — Nine Clans, pioneers, 81 named landscape sites, 25-year timeline, articles, poems, folktales, and Vision 2047.',
    canonicalPath: '/search',
  });

  useEffect(() => {
    const paramQ = searchParams.get('q') || '';
    if (paramQ !== query) {
      setQuery(paramQ);
    }
  }, [searchParams]);

  useEffect(() => {
    const unsubA = subscribePublishedAnnouncements(setAnnouncements);
    const unsubE = subscribePublishedEvents(setEvents);
    const unsubC = subscribePublishedCmsArticles(setCmsArticles);
    return () => {
      unsubA();
      unsubE();
      unsubC();
    };
  }, []);

  const allDocuments = useMemo<SearchDocument[]>(() => {
    const staticDocs = buildStaticSearchIndex();
    const dynamicDocs: SearchDocument[] = [
      ...announcements.map((a) => ({
        id: `cms-news-${a.id}`,
        title: a.title,
        subtitle: `${a.category} · ${a.publishDate}`,
        excerpt: a.summary,
        category: 'News & Publications' as const,
        route: '/media/newsroom',
        year: a.publishDate,
        keywords: [a.category, a.authorName, a.title],
      })),
      ...events.map((e) => ({
        id: `cms-event-${e.id}`,
        title: e.title,
        subtitle: `${e.category} · ${e.eventDate} · ${e.location}`,
        excerpt: e.description,
        category: 'News & Publications' as const,
        route: '/media/events',
        year: e.eventDate,
        keywords: [e.category, e.location, e.title],
      })),
      ...cmsArticles.map((c) => ({
        id: `cms-art-${c.id}`,
        title: c.title,
        subtitle: `${c.category} by ${c.authorDisplay}`,
        excerpt: c.excerpt,
        category: (c.category === 'Poem' ? 'Poems' : c.category === 'Folktale' ? 'Folktales' : 'Articles') as SearchDocument['category'],
        route: '/voices',
        keywords: [c.authorDisplay, c.category, c.title],
      })),
    ];
    return [...dynamicDocs, ...staticDocs];
  }, [announcements, events, cmsArticles]);

  const results = useMemo(
    () => searchArchive(allDocuments, query, selectedCategory),
    [allDocuments, query, selectedCategory]
  );

  const handleSearchChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setSearchParams({ q: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <div>
      <PageHeader
        kicker="Digital Archive Index"
        title="Search the Rang Heritage Archive"
        subtitle="Query across all Nine Clans, 81 traditional landscape sites, pioneers, historical milestones, community articles, poems, folktales, Vision 2047 missions, and published notices."
        breadcrumbs={[{ label: 'Archive Search' }]}
        backgroundImage={ASSETS.landscapes.valleyKamengPanorama}
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-white border border-[#D8CEB8] rounded-sm p-5 sm:p-6 shadow-xs">
          <label htmlFor="archive-search-input" className="block text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium mb-2">
            Search Keywords, Names, Clans, Rivers, Years or Topics
          </label>
          <div className="relative flex items-center">
            <SearchIcon className="w-5 h-5 text-[#6B726C] absolute left-4 pointer-events-none" />
            <input
              id="archive-search-input"
              type="search"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Try 'Nyangpo Soh', 'Kocho', 'Lungte-Dapo', 'PMGSY', 'Vision 2047'..."
              className="w-full pl-12 pr-12 py-3.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-[#1C241E] placeholder:text-[#7A8078] focus:outline-none focus:border-[#143A28] text-base"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                aria-label="Clear search query"
                className="absolute right-3 p-1.5 text-[#5A6058] hover:text-[#143A28] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#6B726C] mr-1">Suggested:</span>
            {SUGGESTED_QUERIES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleSearchChange(term)}
                className="px-2.5 py-1 text-xs text-[#143A28] bg-[#F2ECE0] hover:bg-[#E6DEC8] border border-[#D8CEB8] rounded-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter results by archive category">
          {SEARCH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#143A28] text-[#F9F6EF] border-[#143A28]'
                  : 'bg-[#F9F6EF] text-[#334139] border-[#D8CEB8] hover:border-[#B88A3E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-b border-[#D8CEB8] pb-3">
          <p className="text-sm text-[#4A524C] tabular-nums">
            <span className="font-semibold text-[#143A28]">{results.length}</span>{' '}
            {results.length === 1 ? 'record' : 'records'} found
            {query.trim() ? ` for “${query.trim()}”` : ''}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="mt-8 bg-white border border-[#E4DCC9] rounded-sm p-10 text-center">
            <h2 className="font-serif text-xl text-[#143A28] font-semibold">
              No Matching Archival Records
            </h2>
            <p className="mt-2 text-sm text-[#4A524C] max-w-lg mx-auto">
              Try searching with a broader term, a clan name (e.g., Kocho, Tallang, Tamar, Rang, Waii, Sangdo, Cheda, Sangyu, Flago), or reset the category filter to All.
            </p>
            <button
              type="button"
              onClick={() => {
                handleSearchChange('');
                setSelectedCategory('All');
              }}
              className="mt-5 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 divide-y divide-[#E4DCC9] bg-white border border-[#E4DCC9] rounded-sm">
            {results.map((doc) => (
              <Link
                key={doc.id}
                to={doc.route}
                className="block p-5 sm:p-6 hover:bg-[#F9F6EF] transition-colors group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.14em] text-[#8E6520] font-medium">
                  <span>{doc.category}</span>
                  {doc.year && <span className="tabular-nums text-[#5A6058]">{doc.year}</span>}
                </div>
                <h3 className="mt-1.5 font-serif text-lg sm:text-xl text-[#143A28] font-semibold group-hover:text-[#2D6A4F] transition-colors">
                  {doc.title}
                </h3>
                {doc.subtitle && (
                  <p className="mt-1 text-xs font-medium text-[#5A6058]">{doc.subtitle}</p>
                )}
                <p className="mt-2 text-sm text-[#4A524C] leading-relaxed line-clamp-2">
                  {doc.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#143A28] group-hover:text-[#8E6520]">
                  Open Record
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
