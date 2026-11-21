import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { MONOLITH_ESSAY, NINE_CLANS } from '../data/rangEncyclopedia';
import { PageHeader, OrnamentalDivider } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';

export function MonolithPage() {
  usePageSeo({
    title: 'The Silver Jubilee Monolith — One Stone, Nine Faces',
    description:
      'Explore the Silver Jubilee Monolith of Rang Village: nine granite faces for the nine clans, twenty-five golden bands, tapering shaft, and rotating two-sided crown.',
  });

  const [activeClanSlug, setActiveClanSlug] = useState(NINE_CLANS[0].slug);
  const activeClan = NINE_CLANS.find((c) => c.slug === activeClanSlug) || NINE_CLANS[0];

  return (
    <div>
      <PageHeader
        kicker="Rang Welfare Society · Silver Jubilee 2026 Signature Monument"
        title="The Monolith"
        subtitle={MONOLITH_ESSAY.title}
        breadcrumbs={[
          { label: 'Rang — The 9 Colours', to: '/rang' },
          { label: 'Silver Jubilee Monolith' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">
        {/* Opening Exhibition Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-[#FDFBF6] border border-[#DED4BD] p-4 rounded-sm shadow-sm w-full max-w-md">
              <img
                src={ASSETS.monolith.render3D}
                alt="3D rendering of the Silver Jubilee Monolith of Rang Village"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] sm:h-[520px] object-contain bg-[#F6F1E6] rounded-sm"
              />
              <p className="mt-3 text-xs text-center text-[#5A6058]">
                The Silver Jubilee Monolith of Rang — Polished Dark Granite, 9 Clan Faces, 25 Golden Bands & Two-Sided Crown
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
                One Stone, Nine Faces
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#143A28] mt-1.5">
                What Do We Want to Be Remembered For?
              </h2>
            </div>
            <p className="font-serif text-lg text-[#262B27] leading-[1.8]">
              {MONOLITH_ESSAY.opening}
            </p>
            <div className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-6">
              <h3 className="font-serif text-lg font-semibold text-[#143A28]">
                No Clan Stands in Front of Another
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#363C37] leading-relaxed">
                {MONOLITH_ESSAY.oneStoneNineFaces}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Nine Faces Symbol Explorer */}
        <section className="bg-[#143A28] text-[#F9F6EF] rounded-sm p-6 sm:p-10 border border-[#B88A3E]/40">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E3C17A] font-semibold">
              Interactive Nine-Face Inspector
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold mt-1.5">
              The Nine Clans and Their Carved Symbols
            </h2>
            <p className="text-sm text-[#D6CEBC] mt-2 leading-relaxed">
              {MONOLITH_ESSAY.symbolsIntro} Select any clan emblem below to inspect its face on the monolith.
            </p>
          </div>

          {/* 9 Emblem Selector Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5 mb-8">
            {NINE_CLANS.map((clan) => {
              const selected = clan.slug === activeClan.slug;
              return (
                <button
                  key={clan.slug}
                  type="button"
                  onClick={() => setActiveClanSlug(clan.slug)}
                  className={`p-2.5 rounded-sm border text-center transition-all cursor-pointer flex flex-col items-center ${
                    selected
                      ? 'bg-[#B88A3E]/20 border-[#E3C17A] ring-1 ring-[#E3C17A]'
                      : 'bg-white/5 border-white/15 hover:bg-white/10'
                  }`}
                >
                  <img
                    src={clan.symbolImage}
                    alt={clan.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-sm"
                  />
                  <span className="mt-2 text-[11px] font-medium text-[#F9F6EF] whitespace-nowrap">
                    {clan.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Face Detail Panel */}
          <div className="bg-[#0F2C1E] border border-[#B88A3E]/35 rounded-sm p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3 flex justify-center">
              <img
                src={activeClan.symbolImage}
                alt={`${activeClan.name} — ${activeClan.symbolTitle}`}
                referrerPolicy="no-referrer"
                className="w-36 h-36 object-cover rounded-sm border-2 border-[#E3C17A]/70 shadow-lg"
              />
            </div>
            <div className="md:col-span-9 space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#E3C17A]">
                Face 0{activeClan.order} of 09 · Order of Settlement
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F9F6EF]">
                {activeClan.name} — {activeClan.symbolTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#D8B268]">
                Founding Settlers: {activeClan.foundingAncestors} · Origin: {activeClan.originVillage}
              </p>
              <p className="text-sm sm:text-base text-[#E6E0D0] leading-relaxed">
                {activeClan.symbolDescription}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                <p className="text-xs text-[#CFC7B5]">
                  Charge for the next 25 years:{' '}
                  <strong className="text-[#F9F6EF]">{activeClan.chargeForFuture}</strong>
                </p>
                <Link
                  to={`/rang/clans/${activeClan.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E3C17A] hover:text-white whitespace-nowrap"
                >
                  <span>Full {activeClan.name.split(' ')[0]} Clan Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Architectural Symbolism Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#B88A3E] font-semibold">
              Lower Shaft · 25 Fine Lines
            </p>
            <h3 className="font-serif text-2xl font-semibold text-[#143A28]">
              The Twenty-Five Golden Bands
            </h3>
            <p className="text-sm sm:text-base text-[#363C37] leading-relaxed">
              {MONOLITH_ESSAY.twentyFiveBands}
            </p>
          </article>

          <article className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#B88A3E] font-semibold">
              Stepped Granite Base to Skyward Shaft
            </p>
            <h3 className="font-serif text-2xl font-semibold text-[#143A28]">
              A Column That Tapers Upward
            </h3>
            <p className="text-sm sm:text-base text-[#363C37] leading-relaxed">
              {MONOLITH_ESSAY.tapersUpward}
            </p>
          </article>
        </section>

        {/* The Two-Sided Rotating Crown */}
        <section className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-7 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex items-center justify-center gap-5">
              <div className="text-center">
                <img
                  src={ASSETS.logos.silverJubilee}
                  alt="Silver Jubilee 25 Crown Emblem"
                  className="w-28 h-28 sm:w-32 sm:h-32 object-contain mx-auto"
                />
                <p className="mt-2 text-xs font-medium text-[#143A28]">Face I: 25 Years</p>
              </div>
              <div className="text-center">
                <img
                  src={ASSETS.logos.rwsOfficial}
                  alt="Rang Welfare Society Official Crown Emblem"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#B88A3E]/60 mx-auto"
                />
                <p className="mt-2 text-xs font-medium text-[#143A28]">Face II: RWS Identity</p>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                The Summit · Two-Sided Rotating Medallion
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28]">
                The Crown
              </h3>
              {MONOLITH_ESSAY.theCrown.map((para, i) => (
                <p key={i} className="text-sm sm:text-base text-[#2E3430] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        <OrnamentalDivider />

        {/* Beyond the Stone */}
        <section className="max-w-4xl mx-auto text-center space-y-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
            A Charge for the Next Twenty-Five Years
          </p>
          <h2 className="font-serif text-3xl font-semibold text-[#143A28]">Beyond the Stone</h2>
          <p className="font-serif text-lg text-[#2E3430] leading-[1.85] text-left sm:text-center">
            {MONOLITH_ESSAY.beyondTheStone}
          </p>
          <div className="pt-4">
            <Link
              to="/vision-2047"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#143A28] text-[#F9F6EF] text-sm font-medium rounded-sm hover:bg-[#1B4332]"
            >
              <span>Read the Nine Sankalps & Rang Vision 2047</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
