import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Scale, BookOpen, Clock } from 'lucide-react';
import {
  GENESIS_SECTIONS,
  GENESIS_MILESTONES_GLANCE,
  RWS_SERVICE_PERIODS,
  UNIFIED_TIMELINE,
} from '../data/heritageData';
import { HISTORICAL_AGREEMENTS } from '../data/rangEncyclopedia';
import { filterTimeline } from '../utils/archiveLogic';
import { PageHeader, OrnamentalDivider, Lightbox, type LightboxItem } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';

type HeritageMode = '25-years' | 'genesis' | 'agreements';

const PERIOD_FILTERS = ['All', '1991–2013', '2013–2016', '2016–2020', '2020–2023', '2023–2026'];
const CATEGORY_FILTERS = [
  'All',
  'Governance',
  'Infrastructure',
  'Education',
  'Environment',
  'Social Welfare',
  'Community Participation',
];

export function HeritagePage({ mode = '25-years' }: { mode?: HeritageMode }) {
  const [periodFilter, setPeriodFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxState, setLightboxState] = useState<{ items: LightboxItem[]; index: number } | null>(null);

  const meta: Record<HeritageMode, { title: string; kicker: string; subtitle: string; crumb: string }> = {
    '25-years': {
      title: '25 Years of RWS Services (1991–2026)',
      kicker: 'Heritage & History · The Kameng Flows On',
      subtitle:
        'Five leadership chapters and every recorded milestone from the first committee at Rang Saam footbridge to official village mapping.',
      crumb: '25 Years of Services',
    },
    genesis: {
      title: 'Genesis of Rang Welfare Society',
      kicker: 'Heritage & History · Institutional Origins',
      subtitle:
        'How a village that once guarded itself with Mithun and ritual became a society of written bye-laws, youth enforcement, and shared vision.',
      crumb: 'Genesis of RWS',
    },
    agreements: {
      title: 'Historical Incidents & Inter-Village Agreements',
      kicker: 'Heritage & History · Documentary Record',
      subtitle:
        'Preserving Rang’s traditional Lungte-Dapo pacts with Myora and Loffa villages alongside a neutral archival record of boundary proceedings.',
      crumb: 'Agreements & Records',
    },
  };

  const current = meta[mode];
  usePageSeo({ title: current.title, description: current.subtitle });

  const filteredTimeline = useMemo(
    () =>
      filterTimeline(UNIFIED_TIMELINE, {
        period: periodFilter,
        category: categoryFilter,
        query: searchQuery,
      }),
    [periodFilter, categoryFilter, searchQuery]
  );

  const tabs: { key: HeritageMode; label: string; to: string }[] = [
    { key: '25-years', label: '25 Years of Services & Timeline', to: '/heritage/25-years' },
    { key: 'genesis', label: 'Genesis of RWS', to: '/heritage/genesis' },
    { key: 'agreements', label: 'Historical Agreements', to: '/heritage/agreements' },
  ];

  return (
    <div>
      <PageHeader
        kicker={current.kicker}
        title={current.title}
        subtitle={current.subtitle}
        breadcrumbs={[{ label: 'Heritage & History', to: '/heritage/25-years' }, { label: current.crumb }]}
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
        {mode === '25-years' && (
          <div className="space-y-16">
            {/* Interactive Achievement Timeline */}
            <section className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#ECE5D5]">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Interactive Historical Timeline</span>
                  </p>
                  <h2 className="font-serif text-2xl font-semibold text-[#143A28] mt-1">
                    Filter Milestones by Period, Domain or Keyword
                  </h2>
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search milestones, leaders, projects..."
                  className="px-3.5 py-2 bg-[#F9F6EF] border border-[#D4CBB4] rounded-sm text-sm text-[#1F2421] focus:outline-none focus:border-[#143A28] w-full lg:w-72"
                />
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#646B62] mr-2">Term:</span>
                  {PERIOD_FILTERS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriodFilter(p)}
                      className={`px-3 py-1 text-xs font-mono rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                        periodFilter === p
                          ? 'bg-[#143A28] text-[#F9F6EF]'
                          : 'bg-[#F2ECE0] text-[#363C37] hover:bg-[#E7DFCE]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#646B62] mr-2">Category:</span>
                  {CATEGORY_FILTERS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategoryFilter(c)}
                      className={`px-3 py-1 text-xs rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                        categoryFilter === c
                          ? 'bg-[#B88A3E] text-[#0E2418] font-semibold'
                          : 'bg-[#F2ECE0] text-[#363C37] hover:bg-[#E7DFCE]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 divide-y divide-[#EFE8D8]">
                {filteredTimeline.length === 0 ? (
                  <p className="py-8 text-sm text-[#5A6058] text-center">
                    No milestones match your current filters.
                  </p>
                ) : (
                  filteredTimeline.map((item) => (
                    <div
                      key={item.id}
                      className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
                    >
                      <div className="md:col-span-2">
                        <span className="font-mono text-sm font-semibold text-[#B88A3E] tabular-nums">
                          {item.year}
                        </span>
                        <span className="block text-[11px] text-[#646B62] mt-0.5">
                          {item.category}
                        </span>
                      </div>
                      <div className="md:col-span-10">
                        <h3 className="font-serif text-lg font-semibold text-[#143A28]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#3E4540] mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        {item.leadership && (
                          <p className="text-xs text-[#7A6434] mt-1.5 font-medium">
                            {item.leadership} · Term {item.period}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Full 5 Period Chapters with Activities & Photo Galleries */}
            <div className="space-y-14">
              {RWS_SERVICE_PERIODS.map((period) => (
                <section
                  key={period.id}
                  id={`period-${period.id}`}
                  className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-10 space-y-6"
                >
                  <div className="border-b border-[#ECE5D5] pb-5">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#B88A3E] font-semibold">
                      Period {period.range}
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28] mt-1">
                      {period.title}
                    </h2>
                    <p className="text-sm font-medium text-[#2D6A4F] mt-1">
                      Under the leadership of {period.leaders}
                    </p>
                    <p className="mt-3 text-sm sm:text-base text-[#363C37] leading-relaxed">
                      {period.intro}
                    </p>
                  </div>

                  {/* Landmark Highlight Box */}
                  <div className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold">
                      Landmark of the Term · {period.landmarkHeading}
                    </p>
                    <p className="mt-2 text-sm text-[#262B27] leading-relaxed">
                      {period.landmarkBody}
                    </p>
                  </div>

                  {/* Recorded Activities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {period.activities.map((act) => (
                      <div
                        key={act.slNo + act.title}
                        className="bg-[#F9F6EF] border border-[#E6DFCE] rounded-sm p-4"
                      >
                        <p className="text-xs font-mono text-[#B88A3E] font-semibold">
                          {act.slNo} · {act.category}
                        </p>
                        <h3 className="font-serif text-base font-semibold text-[#143A28] mt-1">
                          {act.title}
                        </h3>
                        <p className="text-sm text-[#414742] mt-1.5 leading-relaxed">
                          {act.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Period Photo Gallery */}
                  {period.photos.length > 0 && (
                    <div className="pt-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#646B62] font-semibold mb-3">
                        Archival Photographs · {period.range}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {period.photos.map((photo, idx) => (
                          <button
                            key={photo.url}
                            type="button"
                            onClick={() =>
                              setLightboxState({
                                items: period.photos.map((p) => ({
                                  url: p.url,
                                  title: p.caption,
                                  category: period.title,
                                })),
                                index: idx,
                              })
                            }
                            className="group text-left bg-[#F2ECE0] border border-[#DED4BD] rounded-sm overflow-hidden cursor-zoom-in"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            />
                            <p className="p-2 text-[11px] text-[#4A504B] line-clamp-2 leading-snug">
                              {photo.caption}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        )}

        {mode === 'genesis' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 sm:p-12 space-y-10">
              {GENESIS_SECTIONS.map((sec, sIdx) => (
                <section key={sec.heading} className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28]">
                    {sec.heading}
                  </h2>
                  <div className="space-y-4 font-serif text-[16.5px] leading-[1.85] text-[#262B27]">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className={sIdx === 0 && pIdx === 0 ? 'editorial-dropcap' : ''}>
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <OrnamentalDivider />

              {/* Milestones at a Glance */}
              <section>
                <div className="flex items-center gap-2 text-[#7A6434] text-xs uppercase tracking-[0.16em] font-semibold mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Milestones at a Glance</span>
                </div>
                <div className="divide-y divide-[#ECE5D5] border-t border-b border-[#ECE5D5]">
                  {GENESIS_MILESTONES_GLANCE.map((row) => (
                    <div key={row.year + row.event} className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <span className="sm:col-span-3 font-mono text-sm font-semibold text-[#B88A3E] tabular-nums">
                        {row.year}
                      </span>
                      <span className="sm:col-span-9 text-sm text-[#2E3430] leading-relaxed">
                        {row.event}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {mode === 'agreements' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-5 flex items-start gap-3 text-sm text-[#414742]">
              <Scale className="w-5 h-5 text-[#B88A3E] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Presented in a neutral, documentary archival tone exactly as recorded in Chapter 4 (§6)
                of <em>Rang Village: The 9 Colours</em> by Advisor Pai Dawe Rang.
              </p>
            </div>

            {HISTORICAL_AGREEMENTS.map((ag) => (
              <article
                key={ag.id}
                className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 sm:p-10 space-y-4"
              >
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#B88A3E] font-semibold">
                  {ag.period}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28]">
                  {ag.title}
                </h2>
                <p className="text-sm font-medium text-[#2D6A4F]">{ag.subtitle}</p>
                <div className="pt-2 space-y-4 font-serif text-[16.5px] leading-[1.82] text-[#262B27]">
                  {ag.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </article>
            ))}

            <div className="text-center pt-4">
              <Link
                to="/heritage/genesis"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read the Genesis of Rang Welfare Society →</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Lightbox
        items={lightboxState?.items || []}
        index={lightboxState ? lightboxState.index : null}
        onClose={() => setLightboxState(null)}
        onNavigate={(nextIdx) =>
          setLightboxState((prev) => (prev ? { ...prev, index: nextIdx } : null))
        }
      />
    </div>
  );
}
