import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, Users, Calendar } from 'lucide-react';
import { ASSETS } from '../data/assets';
import {
  ASM_GPC_BOARD,
  HEAD_GAON_BURAHS,
  GAON_BURAHS_AND_BURIS,
  FOUNDING_GROUPS,
} from '../data/societyData';
import {
  FIRSTS_NARRATIVE,
  ROLL_OF_HONOUR,
  TWO_PILLARS,
} from '../data/heritageData';
import { NINE_CLANS } from '../data/rangEncyclopedia';
import { PageHeader, OrnamentalDivider, Lightbox, type LightboxItem } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';

type PeopleMode = 'pioneers' | 'firsts' | 'two-pillars';

const CUSTOMARY_GROUP_PHOTOS: LightboxItem[] = [
  {
    url: ASSETS.groups.gaonBurahs,
    title: 'Gaon Burahs of Rang Village',
    caption: 'Gaon Burahs of Rang Village in traditional ceremonial attire.',
    category: 'Customary Village Leadership',
  },
  {
    url: ASSETS.groups.gaonBurahsAndBuri,
    title: 'Gaon Burahs and Gaon Buris of Rang Village',
    caption: 'Gaon Burahs and Gaon Buris standing together in customary authority.',
    category: 'Customary Village Leadership',
  },
  {
    url: ASSETS.groups.panchayatTeam,
    title: 'Rang Panchayat Team',
    caption: 'Rang Panchayat Team serving under consensus leadership.',
    category: 'Grassroots Governance',
  },
];

export function PeoplePioneersPage({ mode = 'pioneers' }: { mode?: PeopleMode }) {
  const [honourSearch, setHonourSearch] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const meta: Record<PeopleMode, { title: string; kicker: string; subtitle: string; crumb: string }> = {
    pioneers: {
      title: 'Founders & Pioneers of Rang Village',
      kicker: 'People & Pioneers · Leadership Register',
      subtitle:
        'Anchal Samiti Members, Gram Panchayat Chairpersons, Head Gaon Burahs, Gaon Burahs & Buris, and the Founding Leaders of RWS and Youth Associations.',
      crumb: 'Founders & Panchayat',
    },
    firsts: {
      title: 'The First in Rang',
      kicker: 'People & Pioneers · Roll of Honour',
      subtitle: FIRSTS_NARRATIVE.subtitle,
      crumb: 'The First in Rang',
    },
    'two-pillars': {
      title: TWO_PILLARS.title,
      kicker: 'Silver Jubilee Memorial · Cultural Night Dedication',
      subtitle: TWO_PILLARS.subtitle,
      crumb: 'Two Pillars of Rang',
    },
  };

  const current = meta[mode];
  usePageSeo({ title: current.title, description: current.subtitle });

  const tabs: { key: PeopleMode; label: string; to: string }[] = [
    { key: 'pioneers', label: 'Founders & Panchayat', to: '/people' },
    { key: 'firsts', label: 'The First in Rang', to: '/people/firsts' },
    { key: 'two-pillars', label: 'Two Pillars of Rang', to: '/people/two-pillars' },
  ];

  const filteredHonour = ROLL_OF_HONOUR.filter((row) =>
    honourSearch.trim()
      ? `${row.milestone} ${row.pioneers}`.toLowerCase().includes(honourSearch.trim().toLowerCase())
      : true
  );

  return (
    <div>
      <PageHeader
        kicker={current.kicker}
        title={current.title}
        subtitle={current.subtitle}
        breadcrumbs={[{ label: 'People & Pioneers', to: '/people' }, { label: current.crumb }]}
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
        {mode === 'pioneers' && (
          <div className="space-y-16">
            {/* 6.1 ASM / Gram Panchayat Incumbency Board */}
            <section>
              <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                Section 6.1 · Grassroots Self-Government (1981–Present)
              </p>
              <h2 className="font-serif text-3xl font-semibold text-[#143A28] mt-1">
                Anchal Samiti Members & Gram Panchayat Chairpersons
              </h2>
              <p className="text-sm text-[#5A6058] mt-2 max-w-3xl">
                Official sequential incumbency board alongside verified archival portraits. Also honoured
                among Rang’s first Gram Chairpersons is <strong>Smti. Padak Tamar Rang</strong>.
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ASM_GPC_BOARD.map((leader) => (
                  <div
                    key={leader.slNo}
                    className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-5 flex items-start gap-4"
                  >
                    {leader.photo ? (
                      <img
                        src={leader.photo}
                        alt={leader.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 object-cover object-top rounded-sm border border-[#D4CBB4] shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-20 rounded-sm bg-[#EAE3D2] border border-[#D4CBB4] flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-[#7A6434]/60" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-[#B88A3E] font-semibold tabular-nums">
                        #{String(leader.slNo).padStart(2, '0')} · {leader.from}–{leader.to}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-[#143A28] mt-0.5">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-medium text-[#2D6A4F]">{leader.role}</p>
                      {leader.note && (
                        <p className="text-xs text-[#5A6058] mt-1.5 leading-relaxed">
                          {leader.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Smti. Padak Tamar Portrait Card */}
                <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-5 flex items-start gap-4">
                  <img
                    src={ASSETS.leaders.padakTamar}
                    alt="Smti. Padak Tamar Rang"
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover object-top rounded-sm border border-[#D4CBB4] shrink-0"
                  />
                  <div>
                    <p className="font-mono text-xs text-[#B88A3E] font-semibold">Gram Pioneer</p>
                    <h3 className="font-serif text-lg font-semibold text-[#143A28] mt-0.5">
                      Smti. Padak Tamar Rang
                    </h3>
                    <p className="text-xs font-medium text-[#2D6A4F]">First Female Gram Chairperson</p>
                    <p className="text-xs text-[#5A6058] mt-1.5 leading-relaxed">
                      Recorded alongside Shri Sangkam Tamar Rang as Rang’s first Gram Chairpersons.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <OrnamentalDivider />

            {/* 6.2 Gaon Burahs & Gaon Buris */}
            <section className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                  Section 6.2 · Customary Village Leadership
                </p>
                <h2 className="font-serif text-3xl font-semibold text-[#143A28] mt-1">
                  Head Gaon Burahs, Gaon Burahs & Gaon Buris
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HEAD_GAON_BURAHS.map((hgb) => (
                  <div
                    key={hgb.name}
                    className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 flex items-center gap-5"
                  >
                    <img
                      src={hgb.photo}
                      alt={hgb.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-24 object-cover object-top rounded-sm border border-[#B88A3E]/60 shrink-0"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-[#B88A3E] font-semibold">
                        {hgb.order}
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-[#143A28] mt-1">
                        {hgb.name}
                      </h3>
                      <p className="text-xs text-[#4A504B] mt-1.5 leading-relaxed">{hgb.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {GAON_BURAHS_AND_BURIS.map((gb) => (
                  <div
                    key={gb.slNo}
                    className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm px-4 py-3.5"
                  >
                    <p className="font-mono text-[11px] text-[#B88A3E] font-semibold">
                      No. {String(gb.slNo).padStart(2, '0')} · {gb.role}
                    </p>
                    <p className="font-serif text-base font-semibold text-[#143A28] mt-0.5">
                      {gb.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {CUSTOMARY_GROUP_PHOTOS.map((photo, idx) => (
                  <figure
                    key={photo.title}
                    className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm overflow-hidden flex flex-col shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`View full archival photograph: ${photo.title}`}
                      className="w-full aspect-[3/2] bg-[#F2ECE0] p-2.5 sm:p-3 flex items-center justify-center border-b border-[#ECE5D5] overflow-hidden cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B88A3E]"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </button>
                    <figcaption className="px-4 py-3.5 text-xs sm:text-[13px] text-[#4A504B] leading-relaxed font-sans flex-1 flex items-center">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <OrnamentalDivider />

            {/* 6.3, 6.4, 6.5 Founding Members */}
            <section className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                  Sections 6.3 – 6.5 · Builders of the Society
                </p>
                <h2 className="font-serif text-3xl font-semibold text-[#143A28] mt-1">
                  Founding Members of RWS & Rang Youth Associations
                </h2>
              </div>

              <div className="space-y-8">
                {/* 1991-2013 RVWC */}
                <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8">
                  <h3 className="font-serif text-xl font-semibold text-[#143A28] mb-5">
                    {FOUNDING_GROUPS.unofficialRvwc.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {FOUNDING_GROUPS.unofficialRvwc.members.map((m) => (
                      <div key={m.name} className="flex items-center gap-4 bg-[#F9F6EF] p-4 rounded-sm border border-[#EAE2D0]">
                        <img
                          src={m.photo}
                          alt={m.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-20 object-cover object-top rounded-sm border border-[#C8BC9F] shrink-0"
                        />
                        <div>
                          <p className="font-serif text-base font-semibold text-[#143A28]">{m.name}</p>
                          <p className="text-xs text-[#5A6058] mt-1">{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2000 Youth + 2013 Official RWS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8 space-y-5">
                    <h3 className="font-serif text-xl font-semibold text-[#143A28]">
                      {FOUNDING_GROUPS.youthAssociation2000.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {FOUNDING_GROUPS.youthAssociation2000.members.map((m) => (
                        <div key={m.name} className="flex items-center gap-3.5 bg-[#F9F6EF] p-3.5 rounded-sm border border-[#EAE2D0]">
                          <img
                            src={m.photo}
                            alt={m.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-18 object-cover object-top rounded-sm border border-[#C8BC9F] shrink-0"
                          />
                          <div>
                            <p className="font-serif text-sm font-semibold text-[#143A28]">{m.name}</p>
                            <p className="text-xs text-[#5A6058] mt-0.5">{m.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[#4A504B] leading-relaxed pt-2 border-t border-[#ECE5D5]">
                      {FOUNDING_GROUPS.youthAssociation2000.rywa2013Note}
                    </p>
                  </div>

                  <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8 space-y-5">
                    <h3 className="font-serif text-xl font-semibold text-[#143A28]">
                      {FOUNDING_GROUPS.officialRws2013.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {FOUNDING_GROUPS.officialRws2013.members.map((m) => (
                        <div key={m.name} className="flex items-center gap-3.5 bg-[#F9F6EF] p-3.5 rounded-sm border border-[#EAE2D0]">
                          <img
                            src={m.photo}
                            alt={m.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-18 object-cover object-top rounded-sm border border-[#C8BC9F] shrink-0"
                          />
                          <div>
                            <p className="font-serif text-sm font-semibold text-[#143A28]">{m.name}</p>
                            <p className="text-xs text-[#5A6058] mt-0.5">{m.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[#4A504B] leading-relaxed pt-2 border-t border-[#ECE5D5]">
                      {FOUNDING_GROUPS.officialRws2013.womenWingNote}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {mode === 'firsts' && (
          <div className="space-y-14 max-w-5xl mx-auto">
            {/* Opening Essay */}
            <section className="space-y-4 font-serif text-lg leading-[1.82] text-[#262B27]">
              {FIRSTS_NARRATIVE.intro.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'editorial-dropcap' : ''}>
                  {p}
                </p>
              ))}
            </section>

            {/* The First Settlers Table */}
            <section className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-semibold text-[#143A28]">
                The First Settlers — Nine Founding Clans
              </h2>
              <p className="text-sm text-[#4A504B] mt-2 leading-relaxed">
                The oldest page in the village register—naming the first households settled under each
                of the nine colours that make up Rang today.
              </p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#F2ECE0] border-b border-[#E2D9C4] text-xs uppercase tracking-wider text-[#5A6058]">
                      <th className="py-3 px-4 font-semibold">Clan</th>
                      <th className="py-3 px-4 font-semibold">Founding Ancestors</th>
                      <th className="py-3 px-4 font-semibold">Origin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8D8]">
                    {NINE_CLANS.map((c) => (
                      <tr key={c.slug} className="hover:bg-[#F9F6EF]">
                        <td className="py-3 px-4 font-serif font-semibold text-[#143A28]">
                          <Link to={`/rang/clans/${c.slug}`} className="hover:underline">
                            {c.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-[#2E3430]">{c.foundingAncestors}</td>
                        <td className="py-3 px-4 text-[#5A6058]">{c.originVillage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Narrative Pioneer Categories */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FIRSTS_NARRATIVE.categories.map((cat) => (
                <article
                  key={cat.title}
                  className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 space-y-2.5"
                >
                  <h3 className="font-serif text-xl font-semibold text-[#143A28]">{cat.title}</h3>
                  <p className="text-sm text-[#363C37] leading-relaxed">{cat.narrative}</p>
                </article>
              ))}
            </section>

            {/* Searchable Roll of Honour */}
            <section className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#ECE5D5]">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Complete Reference Table</span>
                  </p>
                  <h2 className="font-serif text-2xl font-semibold text-[#143A28] mt-1">
                    Roll of Honour: Rang’s Firsts at a Glance
                  </h2>
                </div>
                <input
                  type="search"
                  value={honourSearch}
                  onChange={(e) => setHonourSearch(e.target.value)}
                  placeholder="Search milestone or pioneer name..."
                  className="px-3.5 py-2 bg-[#F9F6EF] border border-[#D4CBB4] rounded-sm text-sm text-[#1F2421] focus:outline-none focus:border-[#143A28] w-full sm:w-64"
                />
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#F2ECE0] border-b border-[#E2D9C4] text-xs uppercase tracking-wider text-[#5A6058]">
                      <th className="py-3 px-4 font-semibold">Milestone</th>
                      <th className="py-3 px-4 font-semibold">Recorded Pioneers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8D8]">
                    {filteredHonour.map((row) => (
                      <tr key={row.milestone} className="hover:bg-[#F9F6EF]">
                        <td className="py-3.5 px-4 font-medium text-[#143A28] sm:w-1/3">
                          {row.milestone}
                        </td>
                        <td className="py-3.5 px-4 text-[#363C37] leading-relaxed">{row.pioneers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Standing on Their Shoulders */}
            <section className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-7 sm:p-9 space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-[#143A28]">
                Standing on Their Shoulders
              </h2>
              {FIRSTS_NARRATIVE.closing.map((p, idx) => (
                <p key={idx} className="font-serif text-base sm:text-lg text-[#2E3430] leading-[1.8]">
                  {p}
                </p>
              ))}
            </section>
          </div>
        )}

        {mode === 'two-pillars' && (
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Memorial Dedication Intro */}
            <section className="bg-[#143A28] text-[#F9F6EF] rounded-sm p-7 sm:p-10 border border-[#B88A3E]/40 space-y-4">
              <div className="flex items-center gap-2 text-[#E3C17A] text-xs uppercase tracking-[0.18em] font-semibold">
                <Heart className="w-4 h-4" />
                <span>Silver Jubilee Cultural Night Dedication</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                A Cultural Night in Their Honour
              </h2>
              {TWO_PILLARS.intro.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[#E2DAC7] leading-relaxed">
                  {p}
                </p>
              ))}
            </section>

            {/* Equal-Weight Dual Commemorative Profiles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[TWO_PILLARS.mamaKocho, TWO_PILLARS.tadoTamar].map((pillar) => (
                <article
                  key={pillar.name}
                  className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8 flex flex-col space-y-6"
                >
                  <div className="flex items-start gap-5 pb-5 border-b border-[#ECE5D5]">
                    <img
                      src={pillar.photo}
                      alt={pillar.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-28 object-cover object-top rounded-sm border-2 border-[#B88A3E]/60 shrink-0"
                    />
                    <div>
                      <p className="font-mono text-xs text-[#B88A3E] font-semibold tabular-nums">
                        {pillar.born} — {pillar.passedAway}
                      </p>
                      <h3 className="font-serif text-2xl font-semibold text-[#143A28] mt-1">
                        {pillar.name}
                      </h3>
                      <dl className="mt-2 space-y-1 text-xs text-[#4A504B]">
                        <div>
                          <span className="font-semibold text-[#143A28]">Parents:</span> {pillar.parents}
                        </div>
                        <div>
                          <span className="font-semibold text-[#143A28]">Spouse:</span> {pillar.spouse}
                        </div>
                        <div>
                          <span className="font-semibold text-[#143A28]">Children:</span> {pillar.children}
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold">
                      The Person
                    </h4>
                    <p className="mt-2 text-sm text-[#2E3430] leading-relaxed">{pillar.thePerson}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold mb-2.5">
                      His Service
                    </h4>
                    <ul className="space-y-2.5">
                      {pillar.service.map((s) => (
                        <li
                          key={s.label}
                          className="text-sm text-[#363C37] bg-[#F9F6EF] border border-[#EAE2D0] rounded-sm p-3.5 leading-relaxed"
                        >
                          <strong className="text-[#143A28]">{s.label}:</strong> {s.detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[#ECE5D5]">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold">
                      Recognition & Legacy
                    </p>
                    <p className="mt-1.5 text-sm text-[#2E3430] leading-relaxed">
                      {pillar.recognition}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Shared Journey in Brief */}
            <section className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[#7A6434] text-xs uppercase tracking-[0.16em] font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                <span>Their Journey in Brief</span>
              </div>
              <div className="divide-y divide-[#EFE8D8]">
                {TWO_PILLARS.journeyInBrief.map((item) => (
                  <div key={item.year + item.milestone} className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <span className="sm:col-span-2 font-mono text-sm font-semibold text-[#B88A3E] tabular-nums">
                      {item.year}
                    </span>
                    <span className="sm:col-span-10 text-sm text-[#2E3430] leading-relaxed">
                      {item.milestone}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 pt-5 border-t border-[#ECE5D5] font-serif text-base sm:text-lg text-[#143A28] leading-relaxed">
                {TWO_PILLARS.closing}
              </p>
            </section>
          </div>
        )}
      </div>

      <Lightbox
        items={CUSTOMARY_GROUP_PHOTOS}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
