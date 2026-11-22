import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Compass, MapPin, Mountain, Waves, Trees, Award } from 'lucide-react';
import {
  RANG_AT_A_GLANCE,
  FOUR_FOUNDING_LINEAGES,
  NINE_CLANS,
  RESPECTED_FIGURES_EARLIER_TIMES,
  LANDSCAPE_GAZETTEER,
  INFRASTRUCTURE_MILESTONES,
} from '../data/rangEncyclopedia';
import { ASSETS } from '../data/assets';
import { PageHeader, OrnamentalDivider, EditorialImage } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';

export function RangEncyclopediaPage({ mode = 'overview' }: { mode?: 'overview' | 'clan-detail' | 'landscape' }) {
  const { slug } = useParams<{ slug?: string }>();
  const [gazetteerTab, setGazetteerTab] = useState<'kameng' | 'streams' | 'myoko' | 'myodi'>('kameng');
  const [siteFilter, setSiteFilter] = useState('');

  if (mode === 'clan-detail') {
    const clan = NINE_CLANS.find((c) => c.slug === slug) || NINE_CLANS[0];
    const prevClan = NINE_CLANS[(clan.order - 2 + NINE_CLANS.length) % NINE_CLANS.length];
    const nextClan = NINE_CLANS[clan.order % NINE_CLANS.length];

    usePageSeo({
      title: `${clan.name} Clan — ${clan.symbolTitle}`,
      description: `Heritage profile of ${clan.name} Clan of Rang Village: settled from ${clan.originVillage}, ancestors ${clan.foundingAncestors}, and Monolith emblem ${clan.symbolTitle}.`,
    });

    return (
      <div>
        <PageHeader
          kicker={`Rang — The 9 Colours · Monolith Face 0${clan.order}`}
          title={`${clan.name} Clan`}
          subtitle={`${clan.symbolTitle} — ${clan.monolithMeaning}`}
          breadcrumbs={[
            { label: 'Rang: 9 Colours', to: '/rang' },
            { label: 'Nine Clans', to: '/rang#nine-clans' },
            { label: clan.name },
          ]}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4 bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 text-center">
              <img
                src={clan.symbolImage}
                alt={`${clan.name} Clan symbol — ${clan.symbolTitle}`}
                referrerPolicy="no-referrer"
                className="w-40 h-40 mx-auto object-cover rounded-sm border border-[#B88A3E]/60 shadow-sm"
              />
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-[#7A6434]">
                Face 0{clan.order} of 09
              </p>
              <h2 className="font-serif text-xl font-semibold text-[#143A28] mt-1">
                {clan.symbolTitle}
              </h2>
              <p className="text-xs text-[#5A6058] mt-1">{clan.symbolShort}</p>

              <div className="mt-5 pt-4 border-t border-[#ECE5D5] text-left space-y-2.5 text-xs">
                <div>
                  <span className="text-[#646B62] block">{clan.settlerLabel}</span>
                  <span className="font-medium text-[#143A28]">{clan.foundingAncestors}</span>
                </div>
                <div>
                  <span className="text-[#646B62] block">Origin / Migration</span>
                  <span className="font-medium text-[#143A28]">{clan.originVillage}</span>
                </div>
                {clan.foundingLineage && (
                  <div>
                    <span className="text-[#646B62] block">Primary Founding Lineage</span>
                    <span className="font-medium text-[#143A28]">{clan.foundingLineage}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-8 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                  Settlement History
                </p>
                <h3 className="font-serif text-2xl font-semibold text-[#143A28] mt-1.5">
                  Roots & Migration to Rang
                </h3>
                <p className="mt-3 text-base text-[#2E3430] leading-relaxed">
                  {clan.earlySettlement}. Recorded founding ancestors:{' '}
                  <strong>{clan.foundingAncestors}</strong>.
                </p>
              </div>

              <div className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                  Monolith Symbolism
                </p>
                <p className="mt-2.5 font-serif text-lg text-[#143A28] leading-relaxed">
                  {clan.symbolDescription}
                </p>
                <p className="mt-3 text-sm text-[#4A504B]">
                  <strong>Charge for the next 25 years:</strong> {clan.chargeForFuture}.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-[#143A28] mb-3">
                  Recorded Pioneers & Heritage References
                </h3>
                <ul className="space-y-2.5">
                  {clan.notableReferences.map((ref, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[#363C37] bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm px-4 py-3 leading-relaxed"
                    >
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prev / Next Clan Navigation */}
              <div className="pt-6 border-t border-[#E2D9C4] flex flex-wrap items-center justify-between gap-4">
                <Link
                  to={`/rang/clans/${prevClan.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>
                    0{prevClan.order}. {prevClan.name}
                  </span>
                </Link>
                <Link
                  to="/rang/monolith"
                  className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold hover:text-[#143A28]"
                >
                  View Full Monolith
                </Link>
                <Link
                  to={`/rang/clans/${nextClan.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
                >
                  <span>
                    0{nextClan.order}. {nextClan.name}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'landscape') {
    usePageSeo({
      title: 'The Landscape of Rang — Geographic Gazetteer',
      description:
        'Traditional south-to-north living geographic register of Rang Village: 18 places along the Kameng River, 15 streams, 37 Myoko sites, and 11 mountain (Myodi) places.',
    });

    const tabConfig = {
      kameng: {
        label: 'Kameng River Places (18)',
        icon: Waves,
        subtitle: 'Section 5.1 · Important Places along the Kameng River (South to North)',
        items: LANDSCAPE_GAZETTEER.kamengRiverPlaces,
      },
      streams: {
        label: 'Streams of Rang (15)',
        icon: Compass,
        subtitle: 'Section 5.2 · Named Streams in Rang Village (South to North)',
        items: LANDSCAPE_GAZETTEER.streams,
      },
      myoko: {
        label: 'Myoko & Village Sites (37)',
        icon: MapPin,
        subtitle: 'Section 5.3 · Important Places and Myoko Sites (South to North)',
        items: LANDSCAPE_GAZETTEER.myokoSites,
      },
      myodi: {
        label: 'Mountain Places / Myodi (11)',
        icon: Mountain,
        subtitle: 'Section 5.4 · Places Towards the Mountain (Myodi)',
        items: LANDSCAPE_GAZETTEER.mountainPlaces,
      },
    };

    const currentList = tabConfig[gazetteerTab].items
      .map((name, idx) => ({ no: idx + 1, name }))
      .filter((entry) =>
        siteFilter.trim()
          ? entry.name.toLowerCase().includes(siteFilter.trim().toLowerCase())
          : true
      );

    return (
      <div>
        <PageHeader
          kicker="Rang — The 9 Colours · Living Geography"
          title="The Landscape of Rang"
          subtitle={LANDSCAPE_GAZETTEER.intro}
          breadcrumbs={[
            { label: 'Rang: 9 Colours', to: '/rang' },
            { label: 'Landscape Gazetteer' },
          ]}
          backgroundImage={ASSETS.landscapes.valleyKamengSunrise}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-10">
          {/* Interactive Tab Switcher + Filter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E2D9C4]">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(tabConfig) as Array<keyof typeof tabConfig>).map((key) => {
                const Icon = tabConfig[key].icon;
                const active = gazetteerTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setGazetteerTab(key)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#143A28] text-[#F9F6EF]'
                        : 'bg-[#F2ECE0] text-[#363C37] hover:bg-[#E7DFCE]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tabConfig[key].label}</span>
                  </button>
                );
              })}
            </div>
            <input
              type="search"
              value={siteFilter}
              onChange={(e) => setSiteFilter(e.target.value)}
              placeholder="Filter place or stream name..."
              className="px-3.5 py-2 bg-[#FDFBF6] border border-[#D4CBB4] rounded-sm text-sm text-[#1F2421] focus:outline-none focus:border-[#143A28] w-full lg:w-64"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
              {tabConfig[gazetteerTab].subtitle}
            </p>
            <p className="text-xs text-[#646B62] mt-1">
              Traditional indigenous place names recorded in south-to-north geographical order.
            </p>

            {currentList.length === 0 ? (
              <p className="mt-8 text-sm text-[#5A6058]">
                No named landscape site matches “{siteFilter}” in this section.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentList.map((site) => (
                  <div
                    key={`${gazetteerTab}-${site.no}`}
                    className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm px-4 py-3.5 flex items-center gap-3.5"
                  >
                    <span className="font-mono text-xs font-semibold text-[#B88A3E] w-6 shrink-0 tabular-nums">
                      {String(site.no).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-base text-[#143A28]">{site.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cultural Stream Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-6 sm:p-8">
            <div className="lg:col-span-4">
              <EditorialImage
                src={ASSETS.landscapes.nyangpoSohStream}
                alt="Nyangpo Soh stream flowing through Rang Village"
                imgClassName="w-full h-64 object-cover rounded-sm"
              />
            </div>
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                Landscape & Oral Lore
              </p>
              <h3 className="font-serif text-2xl font-semibold text-[#143A28]">
                From Rangso Haaling to Nyangpo Soh
              </h3>
              <p className="text-sm text-[#3E4540] leading-relaxed">
                Every stream and hillside in Rang carries living memory—from <strong>Rangso</strong>, the
                stream believed to have given Rang its name (recorded along the Kameng as{' '}
                <em>Rangso Haaling</em>), to <strong>Nyangpo Soh</strong>, the quiet watercourse at the
                center of the village remembered in ancestral folklore.
              </p>
              <Link
                to="/voices/the-legend-of-nyangpo-soh"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
              >
                <span>Read “The Legend of Nyangpo Soh” by Kaya Rang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Overview Mode (/rang & /rang/clans)
  usePageSeo({
    title: 'Rang — The 9 Colours (Village Encyclopedia)',
    description:
      'Complete encyclopedic guide to Rang Village by Advisor Pai Dawe Rang: origin of the name, 4 founding lineages, all 9 clans, 20 respected elders, infrastructure milestones, and consensus governance.',
  });

  return (
    <div>
      <PageHeader
        kicker="Village Encyclopedia · By Pai Dawe Rang, Advisor, RWS"
        title="Rang Village — The 9 Colours"
        subtitle="Nine identities and nine expressions living together as one collective soul since the 16th–17th century."
        breadcrumbs={[{ label: 'Rang — The 9 Colours' }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/rang/monolith"
            className="px-4 py-2 bg-[#B88A3E] text-[#0E2418] text-xs font-semibold rounded-sm hover:bg-[#C99B4E]"
          >
            Silver Jubilee Monolith
          </Link>
          <Link
            to="/rang/landscape"
            className="px-4 py-2 bg-white/10 text-[#F9F6EF] text-xs font-medium rounded-sm hover:bg-white/20"
          >
            Landscape Gazetteer (81 Sites)
          </Link>
          <Link
            to="/heritage/agreements"
            className="px-4 py-2 bg-white/10 text-[#F9F6EF] text-xs font-medium rounded-sm hover:bg-white/20"
          >
            Historical Agreements
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">
        {/* Intro + Rang at a Glance */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4 text-[#2E3430] leading-relaxed">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
              1. Introduction & Origin of the Name
            </p>
            <h2 className="font-serif text-3xl font-semibold text-[#143A28]">
              Nine Colours, One Collective Soul
            </h2>
            <p>
              The Rang word in Hindi meaning is colors; though it has nothing to do with the name of Rang
              village, coincidentally Rang village is inhabited by 9 clans. As colors represent different
              dimensions of human life, they symbolize our emotions, thoughts and relationships. So the
              nine colors—the nine clans of Rang village with nine identities and nine expressions—have
              lived together as one collective soul since its establishment around the 16th to 17th Century.
            </p>
            <p>
              Historically, there is no well-established legend explaining the origin of the name Rang.
              However, it is widely believed that the name is derived from a stream called{' '}
              <strong>Rangso</strong>, which flows through the area and also appears in the village’s
              list of important places along the Kameng River (<em>Rangso Haaling</em>).
            </p>
            <p>
              Situated in Seppa Circle, East Kameng District, Arunachal Pradesh, approximately 4 km from
              Seppa, Rang’s story runs from the settlement of four founding lineages through the gradual
              coming together of nine clans, to a present in which the village is known well beyond its
              boundaries for its institutions, its scholars, and its model of consensus community governance.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6">
            <h3 className="font-serif text-xl font-semibold text-[#143A28] pb-3 border-b border-[#ECE5D5]">
              Rang at a Glance
            </h3>
            <dl className="divide-y divide-[#EFE8D8] text-xs sm:text-sm mt-2">
              {RANG_AT_A_GLANCE.map((row) => (
                <div key={row.label} className="py-2.5 grid grid-cols-12 gap-2">
                  <dt className="col-span-5 text-[#646B62] font-medium">{row.label}</dt>
                  <dd className="col-span-7 text-[#143A28]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Four Founding Lineages */}
        <section>
          <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
            3. Early Settlement & Lineages
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28] mt-1">
            The Four Primary Founding Lineages
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FOUR_FOUNDING_LINEAGES.map((lin) => (
              <div
                key={lin.lineage}
                className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-5"
              >
                <p className="text-xs font-mono text-[#7A6434] uppercase">Primary Lineage</p>
                <h3 className="font-serif text-xl font-semibold text-[#143A28] mt-1">{lin.lineage}</h3>
                <p className="text-sm text-[#2D6A4F] font-medium mt-1">→ {lin.emergedClan}</p>
                <p className="text-xs text-[#5A6058] mt-2 leading-relaxed">{lin.remarks}</p>
              </div>
            ))}
          </div>
        </section>

        {/* All Nine Clans Interactive Directory */}
        <section id="nine-clans">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                Clans in Order of Settlement
              </p>
              <h2 className="font-serif text-3xl font-semibold text-[#143A28] mt-1">
                The Nine Clans and Their Symbols
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[#4A504B] max-w-2xl leading-relaxed">
                Each face carries the emblem of one clan, shown here in the order of settlement. Together
                they form the vocabulary of a good society: foundation, growth, continuity, warmth,
                balance, vision, connection, grace and unity.
              </p>
            </div>
            <Link
              to="/rang/monolith"
              className="text-sm font-medium text-[#143A28] hover:text-[#2D6A4F] whitespace-nowrap shrink-0"
            >
              Read Full Monolith Symbolism Essay →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {NINE_CLANS.map((clan) => (
              <Link
                key={clan.slug}
                to={`/rang/clans/${clan.slug}`}
                className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm p-5 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={clan.symbolImage}
                      alt={`${clan.name} symbol`}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-sm object-cover border border-[#C8BC9F] shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F] leading-snug">
                        {clan.name}
                      </h3>
                      <p className="text-xs font-medium text-[#7A6434] mt-0.5">{clan.symbolTitle}</p>
                      <p className="mt-1.5 text-xs text-[#5A6058] leading-snug">
                        <strong className="text-[#143A28]">{clan.settlerLabel}:</strong>{' '}
                        {clan.foundingAncestors}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3.5 text-sm text-[#3E4540] leading-relaxed">
                    {clan.symbolDescription}
                  </p>
                </div>
                <span className="mt-4 pt-3 border-t border-[#EFE8D8] inline-flex items-center gap-1.5 text-xs font-semibold text-[#143A28]">
                  Open Clan Profile <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <OrnamentalDivider />

        {/* 20 Respected Figures of Earlier Times */}
        <section>
          <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
            4. Ancestral Memory
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28] mt-1">
            Twenty Respected Figures of Earlier Times
          </h2>
          <p className="text-sm text-[#4A504B] mt-2 max-w-3xl">
            Honoured in the exact order recorded in the village archive:
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RESPECTED_FIGURES_EARLIER_TIMES.map((elder) => (
              <div
                key={elder.no}
                className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm px-4 py-3 flex items-center gap-3"
              >
                <span className="font-mono text-xs text-[#B88A3E] font-semibold w-6 tabular-nums">
                  {String(elder.no).padStart(2, '0')}
                </span>
                <span className="font-serif text-sm text-[#143A28] font-medium">{elder.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure, Academic Excellence & Grassroots Governance */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
              7. Institutional & Infrastructure Milestones (1983–2026)
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28]">
              From Isolation to a Model Village
            </h2>
            <div className="space-y-3 pt-2">
              {INFRASTRUCTURE_MILESTONES.map((m) => (
                <div
                  key={m.year + m.title}
                  className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-4 flex flex-col sm:flex-row sm:items-start gap-3"
                >
                  <span className="font-mono text-xs font-semibold text-[#B88A3E] sm:w-28 shrink-0 tabular-nums pt-0.5">
                    {m.year}
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#143A28]">{m.title}</h3>
                    <p className="text-xs sm:text-sm text-[#4A504B] mt-1 leading-relaxed">
                      {m.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#7A6434] text-xs uppercase tracking-[0.14em] font-semibold">
                <Award className="w-4 h-4" />
                <span>8. Academic & Professional Distinction</span>
              </div>
              <div className="space-y-4 text-sm text-[#2E3430] leading-relaxed">
                <div>
                  <h3 className="font-serif font-semibold text-[#143A28]">
                    Er. Mara Kocho, IES
                  </h3>
                  <p className="mt-1">
                    First Indian Engineering Service (IES) officer from the Nyishi community and East
                    Kameng District; since 2025 serving as Managing Director of the North Eastern
                    Handicrafts and Handloom Development Corporation (NEHHDC), a CPSE under the Ministry
                    of DoNER, Govt. of India, Guwahati.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DED4BD]">
                  <h3 className="font-serif font-semibold text-[#143A28]">
                    Dr. Yakar Dawe, APPSC (EAC)
                  </h3>
                  <p className="mt-1">
                    Selected as Circle Officer through the Arunachal Pradesh Public Service Commission
                    (APPSC) in 2016; presently serving as Extra Assistant Commissioner (EAC) in Papum
                    Pare District, Arunachal Pradesh.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#143A28] text-[#F9F6EF] rounded-sm p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#E3C17A] text-xs uppercase tracking-[0.14em] font-semibold">
                <Trees className="w-4 h-4" />
                <span>9. A Model of Grassroots Governance</span>
              </div>
              <h3 className="font-serif text-xl font-semibold">
                Consensus Over Contested Elections
              </h3>
              <p className="text-sm text-[#DCD4C2] leading-relaxed">
                During the tenure of <strong>Langpa Kocho</strong> as Anchal Samiti Member (awarded Best
                Performing ASM of East Kameng in 2018), Rang established its unique tradition of selecting
                Panchayat members by consensus without contested elections. Succeeded by{' '}
                <strong>Garbe Lichi Rang</strong>—who earned Best GPC of East Kameng in 2025—Rang achieved
                two consecutive district-level governance honours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
