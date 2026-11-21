import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Feather,
  Sparkles,
  Timer,
  Play,
  Square,
  RotateCcw,
} from 'lucide-react';
import {
  VOICE_ARTICLES,
  VOICE_POEMS,
  NYOKUM_YULLO_FOLKTALE,
  NYISHI_RIDDLES,
  NYISHI_RIDDLES_COMPILER,
  BREATH_HOLDING_RECITATION,
} from '../data/communityVoicesData';
import { PageHeader, OrnamentalDivider, EditorialImage } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';
import { subscribePublishedCmsArticles, type CmsArticleDoc } from '../services/cmsService';

type VoicesMode = 'articles' | 'article-detail' | 'poems' | 'folktales' | 'creativity';

export function CommunityVoicesPage({ mode = 'articles' }: { mode?: VoicesMode }) {
  const { slug } = useParams<{ slug?: string }>();
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [cmsArticles, setCmsArticles] = useState<CmsArticleDoc[]>([]);
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  // Breath-holding recitation timer state
  const [reciting, setReciting] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [bestMs, setBestMs] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const unsub = subscribePublishedCmsArticles(setCmsArticles);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!reciting) return;
    startTimeRef.current = performance.now() - elapsedMs;
    const interval = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedMs(Math.round(performance.now() - startTimeRef.current));
      }
    }, 50);
    return () => window.clearInterval(interval);
  }, [reciting]);

  const stopTimer = () => {
    setReciting(false);
    if (elapsedMs > 0 && (bestMs === null || elapsedMs > bestMs)) {
      setBestMs(elapsedMs);
    }
  };

  const resetTimer = () => {
    setReciting(false);
    setElapsedMs(0);
    startTimeRef.current = null;
  };

  const formatTimer = (ms: number) => `${(ms / 1000).toFixed(2)}s`;

  const toggleRiddle = (id: number) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllRiddles = () => {
    const next = !showAllAnswers;
    setShowAllAnswers(next);
    const map: Record<number, boolean> = {};
    for (const r of NYISHI_RIDDLES) map[r.id] = next;
    setRevealedIds(map);
  };

  // Single Article Detail View
  if (mode === 'article-detail') {
    const idx = VOICE_ARTICLES.findIndex((a) => a.slug === slug);
    const article = idx >= 0 ? VOICE_ARTICLES[idx] : VOICE_ARTICLES[0];
    const prevArticle = VOICE_ARTICLES[(idx - 1 + VOICE_ARTICLES.length) % VOICE_ARTICLES.length];
    const nextArticle = VOICE_ARTICLES[(idx + 1) % VOICE_ARTICLES.length];

    usePageSeo({
      title: article.title,
      description: `${article.excerpt} — By ${article.author}.`,
      canonicalPath: `/voices/${article.slug}`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        author: { '@type': 'Person', name: article.author },
        publisher: { '@type': 'Organization', name: 'Rang Welfare Society' },
        description: article.excerpt,
      },
    });

    return (
      <div>
        <PageHeader
          kicker={`Community Voices · ${article.category} · ${article.readingMinutes} min read`}
          title={article.title}
          subtitle={`By ${article.author}${article.authorCredential ? ` — ${article.authorCredential}` : ''}`}
          breadcrumbs={[
            { label: 'Community Voices', to: '/voices' },
            { label: article.title },
          ]}
        />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          {article.heroImage && (
            <div className="mb-10">
              <EditorialImage
                src={article.heroImage}
                alt={article.title}
                imgClassName="w-full max-h-[420px] object-cover rounded-sm border border-[#DED4BD]"
              />
            </div>
          )}

          <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 sm:p-12 space-y-9">
            {article.sections.map((sec, sIdx) => (
              <section key={sIdx} className="space-y-4">
                {sec.heading && (
                  <h2 className="font-serif text-2xl sm:text-[26px] font-semibold text-[#143A28] leading-snug pt-2">
                    {sec.heading}
                  </h2>
                )}
                <div className="space-y-4 font-serif text-[17px] leading-[1.86] text-[#242925]">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className={sIdx === 0 && pIdx === 0 ? 'editorial-dropcap' : ''}>
                      {p}
                    </p>
                  ))}
                </div>
                {sec.lessonLearnt && (
                  <div className="mt-4 bg-[#F2ECE0] border-t border-b border-[#D8C9A9] px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold mb-1">
                      Lesson Learnt
                    </p>
                    <p className="font-serif italic text-[15.5px] text-[#143A28] leading-relaxed">
                      {sec.lessonLearnt}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {article.disclaimer && (
              <div className="pt-6 border-t border-[#E2D9C4] text-xs italic text-[#5A6058] leading-relaxed">
                <strong className="not-italic uppercase tracking-wider text-[#7A6434] block mb-1">
                  Author’s Disclaimer
                </strong>
                {article.disclaimer}
              </div>
            )}

            <div className="pt-6 border-t border-[#E2D9C4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
              <div>
                <p className="font-serif font-semibold text-[#143A28]">{article.author}</p>
                {article.authorCredential && (
                  <p className="text-xs text-[#5A6058]">{article.authorCredential}</p>
                )}
              </div>
              <p className="text-xs text-[#7A6434] font-mono">
                Silver Jubilee Souvenir · Verbatim Text
              </p>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <nav
            aria-label="Article navigation"
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Link
              to={`/voices/${prevArticle.slug}`}
              className="p-5 bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm transition-colors"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-[#7A6434] font-medium">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
              </span>
              <p className="font-serif text-base font-semibold text-[#143A28] mt-1 line-clamp-2">
                {prevArticle.title}
              </p>
            </Link>
            <Link
              to={`/voices/${nextArticle.slug}`}
              className="p-5 bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm transition-colors sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-[#7A6434] font-medium">
                Next Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <p className="font-serif text-base font-semibold text-[#143A28] mt-1 line-clamp-2">
                {nextArticle.title}
              </p>
            </Link>
          </nav>
        </article>
      </div>
    );
  }

  const tabs: { key: Exclude<VoicesMode, 'article-detail'>; label: string; to: string }[] = [
    { key: 'articles', label: 'Articles & Memoirs (11)', to: '/voices' },
    { key: 'poems', label: 'Poems (3)', to: '/voices/poems' },
    { key: 'folktales', label: 'Folktales', to: '/voices/folktales' },
    { key: 'creativity', label: 'Nyishi Riddles & Recitation', to: '/voices/creativity' },
  ];

  const headerMap: Record<Exclude<VoicesMode, 'article-detail'>, { title: string; subtitle: string; crumb: string }> = {
    articles: {
      title: 'Community Voices — Articles & Memoirs',
      subtitle:
        'Full verbatim essays, childhood memoirs, historical accounts, and youth reflections preserved from the Silver Jubilee Souvenir.',
      crumb: 'Articles & Memoirs',
    },
    poems: {
      title: 'Poems of Rang',
      subtitle: 'Original verse celebrating childhood, family love, and Sory-Alang—the sacred guardian stone of Rang Village.',
      crumb: 'Poems',
    },
    folktales: {
      title: 'Folktales & Sacred Legends',
      subtitle: 'Oral wisdom passed down by priests and elders—preserving how Ane Donyi’s blessing came to the Nyishi.',
      crumb: 'Folktales',
    },
    creativity: {
      title: 'Creativity, Niitam Riddles & Recitation',
      subtitle:
        'Traditional Nyishi riddles (with interactive reveal) and the Breath-Holding Reciting Competition compiled by Longpa Kocho.',
      crumb: 'Nyishi Riddles & Recitation',
    },
  };

  const activeHeader = headerMap[mode];
  usePageSeo({ title: activeHeader.title, description: activeHeader.subtitle });

  const articleCategories = ['All', 'Cultural & Historical', 'Personal Memoir', 'Youth Perspective', 'Social Reflection'];
  const filteredArticles =
    categoryFilter === 'All'
      ? VOICE_ARTICLES
      : VOICE_ARTICLES.filter((a) => a.category === categoryFilter);

  return (
    <div>
      <PageHeader
        kicker="Section 10 · Literary & Oral Heritage Library"
        title={activeHeader.title}
        subtitle={activeHeader.subtitle}
        breadcrumbs={[{ label: 'Community Voices', to: '/voices' }, { label: activeHeader.crumb }]}
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              to={tab.to}
              className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                mode === tab.key
                  ? 'bg-[#B88A3E] text-[#0E2418] font-semibold'
                  : 'bg-white/10 text-[#F9F6EF] hover:bg-white/20'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {mode === 'articles' && (
          <div className="space-y-12">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 pb-5 border-b border-[#E2D9C4]">
              {articleCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-[#143A28] text-[#F9F6EF]'
                      : 'bg-[#F2ECE0] text-[#363C37] hover:bg-[#E7DFCE]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Authoritative Silver Jubilee Archive Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/voices/${article.slug}`}
                  className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm p-6 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <p className="text-xs text-[#7A6434] font-medium">
                      {article.category} · {article.readingMinutes} min read
                    </p>
                    <h2 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F] mt-2 leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[#4A504B] mt-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#EFE8D8] flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#143A28]">{article.author}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2D6A4F]">
                      Read Full Text <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Separately Managed CMS Community Contributions (only rendered if admins have published new items) */}
            {cmsArticles.length > 0 && (
              <section className="pt-10 border-t border-[#E2D9C4] space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                    Post-Jubilee Additions · CMS Published
                  </p>
                  <h2 className="font-serif text-2xl font-semibold text-[#143A28] mt-1">
                    Recent Community Contributions
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cmsArticles.map((doc) => (
                    <article
                      key={doc.id}
                      className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 space-y-3"
                    >
                      <p className="text-xs text-[#7A6434] font-medium">
                        {doc.category} · By {doc.authorDisplay}
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-[#143A28]">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-[#363C37] leading-relaxed whitespace-pre-line">
                        {doc.body}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {mode === 'poems' && (
          <div className="max-w-4xl mx-auto space-y-10">
            {VOICE_POEMS.map((poem) => (
              <article
                key={poem.slug}
                className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-8 sm:p-12"
              >
                <div className="text-center pb-6 border-b border-[#ECE5D5]">
                  <Feather className="w-5 h-5 text-[#B88A3E] mx-auto mb-2" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28]">
                    {poem.title}
                  </h2>
                  {poem.subtitle && (
                    <p className="font-serif italic text-base text-[#2D6A4F] mt-1">
                      {poem.subtitle}
                    </p>
                  )}
                  <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold mt-3">
                    By {poem.author}
                  </p>
                  {poem.authorNote && (
                    <p className="text-xs text-[#646B62] mt-1">{poem.authorNote}</p>
                  )}
                </div>

                <div className="mt-8 space-y-6 max-w-xl mx-auto font-serif text-[17px] leading-[1.85] text-[#242925] text-center">
                  {poem.stanzas.map((stanza, idx) => (
                    <p key={idx} className="space-y-1">
                      {stanza.map((line, lIdx) => (
                        <span key={lIdx} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        {mode === 'folktales' && (
          <div className="max-w-4xl mx-auto space-y-10">
            <article className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 sm:p-12 space-y-6">
              <div className="border-b border-[#ECE5D5] pb-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Sacred Nyishi Oral Folktale</span>
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#143A28] mt-1.5">
                  {NYOKUM_YULLO_FOLKTALE.title}
                </h2>
                <p className="font-serif italic text-lg text-[#2D6A4F] mt-1">
                  {NYOKUM_YULLO_FOLKTALE.subtitle}
                </p>
                <p className="text-sm font-medium text-[#5A6058] mt-2">
                  {NYOKUM_YULLO_FOLKTALE.author}
                </p>
              </div>

              <div className="space-y-4 font-serif text-[17px] leading-[1.86] text-[#242925]">
                {NYOKUM_YULLO_FOLKTALE.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? 'editorial-dropcap' : ''}>
                    {p}
                  </p>
                ))}
              </div>

              <OrnamentalDivider />

              <section className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-[#143A28]">
                  Lessons from the Legend
                </h3>
                <p className="text-sm text-[#4A504B]">
                  Like many stories handed down through generations, the legend of Nyokum Yullo is
                  more than an account of the origin of a prayer. It carries lessons that remain
                  relevant today:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {NYOKUM_YULLO_FOLKTALE.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.title}
                      className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-5"
                    >
                      <p className="font-mono text-xs text-[#B88A3E] font-semibold">
                        Lesson 0{idx + 1}
                      </p>
                      <h4 className="font-serif text-base font-semibold text-[#143A28] mt-1">
                        {lesson.title}
                      </h4>
                      <p className="text-sm text-[#363C37] mt-1.5 leading-relaxed">{lesson.body}</p>
                    </div>
                  ))}
                </div>
                <p className="pt-4 font-serif text-[16.5px] leading-[1.8] text-[#143A28]">
                  {NYOKUM_YULLO_FOLKTALE.closing}
                </p>
              </section>
            </article>
          </div>
        )}

        {mode === 'creativity' && (
          <div className="space-y-16">
            {/* 13 Traditional Nyishi Riddles */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E2D9C4]">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>{NYISHI_RIDDLES_COMPILER} · 13 Traditional Riddles</span>
                  </p>
                  <h2 className="font-serif text-3xl font-semibold text-[#143A28] mt-1">
                    Niitam / Nyishi Riddles
                  </h2>
                  <p className="text-sm text-[#4A504B] mt-1.5">
                    Read the original Nyishi riddle alongside its English rendering, then click to reveal the answer.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleAllRiddles}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#143A28] text-[#F9F6EF] text-xs font-medium rounded-sm hover:bg-[#1B4332] cursor-pointer whitespace-nowrap shrink-0"
                >
                  {showAllAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showAllAnswers ? 'Hide All Answers' : 'Reveal All Answers'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {NYISHI_RIDDLES.map((riddle) => {
                  const isOpen = !!revealedIds[riddle.id];
                  return (
                    <article
                      key={riddle.id}
                      className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <p className="font-mono text-xs text-[#B88A3E] font-semibold tabular-nums">
                          Riddle {String(riddle.id).padStart(2, '0')} of 13
                        </p>
                        <p className="font-serif text-lg font-semibold text-[#143A28] leading-snug">
                          “{riddle.nyishi}”
                        </p>
                        <p className="text-sm text-[#414742] leading-relaxed">{riddle.english}</p>
                      </div>

                      <div className="pt-3 border-t border-[#EFE8D8]">
                        {isOpen ? (
                          <div className="bg-[#F2ECE0] p-3.5 rounded-sm flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-wider text-[#7A6434] font-semibold">
                                Answer
                              </p>
                              <p className="font-serif text-base font-semibold text-[#143A28] mt-0.5">
                                {riddle.nyishiAnswer} — {riddle.englishAnswer}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleRiddle(riddle.id)}
                              className="text-xs text-[#5A6058] hover:text-[#143A28] underline cursor-pointer shrink-0"
                            >
                              Hide
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleRiddle(riddle.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#143A28] hover:text-[#2D6A4F] cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Reveal Nyishi & English Answer</span>
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <OrnamentalDivider />

            {/* Breath Holding Reciting Competition */}
            <section className="max-w-4xl mx-auto bg-[#143A28] text-[#F9F6EF] rounded-sm p-7 sm:p-10 border border-[#B88A3E]/40">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/15">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#E3C17A] font-semibold flex items-center gap-1.5">
                    <Timer className="w-4 h-4" />
                    <span>{BREATH_HOLDING_RECITATION.compiler}</span>
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold mt-1">
                    {BREATH_HOLDING_RECITATION.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D6CEBC] mt-1.5">
                    Take a deep breath and try reciting the entire Nyishi verse aloud in a single breath!
                  </p>
                </div>

                <div className="bg-[#0E281B] border border-[#B88A3E]/40 rounded-sm p-4 min-w-[210px] text-center">
                  <p className="font-mono text-3xl font-semibold text-[#E3C17A] tabular-nums">
                    {formatTimer(elapsedMs)}
                  </p>
                  {bestMs !== null && (
                    <p className="text-[11px] text-[#D6CEBC] mt-0.5 font-mono tabular-nums">
                      Best Single Breath: {formatTimer(bestMs)}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {!reciting ? (
                      <button
                        type="button"
                        onClick={() => setReciting(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#B88A3E] text-[#0E2418] text-xs font-semibold rounded-sm hover:bg-[#C99B4E] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Start</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopTimer}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C2591A] text-white text-xs font-semibold rounded-sm cursor-pointer"
                      >
                        <Square className="w-3.5 h-3.5" />
                        <span>Stop</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={resetTimer}
                      aria-label="Reset timer"
                      className="p-1.5 border border-white/20 text-[#F9F6EF] hover:bg-white/10 rounded-sm cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-5 text-center">
                <p className="font-serif italic text-lg sm:text-xl text-[#E3C17A]">
                  “{BREATH_HOLDING_RECITATION.openingChant}”
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto">
                  {BREATH_HOLDING_RECITATION.lines.map((line, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 flex items-center gap-3 text-left"
                    >
                      <span className="font-mono text-xs text-[#E3C17A] tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-base text-[#F9F6EF]">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
