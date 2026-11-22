import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Compass,
  BookOpen,
  Users,
  Landmark,
  Sparkles,
  FileText,
  Calendar,
  Pause,
  Play,
} from 'lucide-react';
import { ASSETS } from '../data/assets';
import { NINE_CLANS } from '../data/rangEncyclopedia';
import { RWS_SERVICE_PERIODS, UNIFIED_TIMELINE } from '../data/heritageData';
import { VOICE_ARTICLES } from '../data/communityVoicesData';
import { SHG_PROFILES, VISION_2047, STATIC_NEWS_ARTICLES } from '../data/communityAndVisionData';
import { OFFICIAL_MESSAGES, SOCIETY_CONTACT } from '../data/societyData';
import { EditorialImage, OrnamentalDivider } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';
import {
  subscribePublishedAnnouncements,
  type AnnouncementDoc,
} from '../services/cmsService';

const HERO_VIDEOS = [
  {
    id: 'rang-village-aerial',
    src: ASSETS.videos.heroRangVillage,
    poster: ASSETS.landscapes.heroPosterRang,
    label: 'Rang Village & Seppa Valley · Aerial View',
  },
  {
    id: 'kameng-river-aerial',
    src: ASSETS.videos.heroKamengRiver,
    poster: ASSETS.landscapes.heroPosterKameng,
    label: 'Kameng River & Terraced Hills · Aerial View',
  },
] as const;

export function HomePage() {
  usePageSeo({
    title: 'Home',
    description:
      'Official Digital Heritage & Institutional Website of Rang Welfare Society (RWS) — Rang: The 9 Colours. Nine clans, one village, one family, one future in East Kameng, Arunachal Pradesh.',
  });

  const prefersReducedMotion = useReducedMotion();
  const [announcements, setAnnouncements] = useState<AnnouncementDoc[]>([]);
  const [selectedTimelineId, setSelectedTimelineId] = useState(UNIFIED_TIMELINE[3].id);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const unsub = subscribePublishedAnnouncements(setAnnouncements);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroPaused(true);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === heroIndex && !heroPaused) {
        if (vid.ended) {
          vid.currentTime = 0;
        }
        const playPromise = vid.play();
        if (playPromise) {
          playPromise.catch(() => {
            // Autoplay fallback handled gracefully via crisp HD poster frame
          });
        }
      } else {
        vid.pause();
      }
    });
  }, [heroIndex, heroPaused]);

  const activeReel = HERO_VIDEOS[heroIndex];

  const handleSelectReel = (idx: number) => {
    const target = videoRefs.current[idx];
    if (target) {
      target.currentTime = 0;
    }
    setHeroIndex(idx);
  };

  const handleReelEnded = (idx: number) => {
    if (idx !== heroIndex || heroPaused) return;
    const nextIdx = (idx + 1) % HERO_VIDEOS.length;
    const nextVid = videoRefs.current[nextIdx];
    if (nextVid) {
      nextVid.currentTime = 0;
    }
    setHeroIndex(nextIdx);
  };

  const chairmanMsg = OFFICIAL_MESSAGES[0];
  const featuredTimeline = [
    UNIFIED_TIMELINE.find((t) => t.id === 'tl-1983')!,
    UNIFIED_TIMELINE.find((t) => t.id === 'tl-1993')!,
    UNIFIED_TIMELINE.find((t) => t.id === 'tl-2001')!,
    UNIFIED_TIMELINE.find((t) => t.id === 'tl-2013')!,
    UNIFIED_TIMELINE.find((t) => t.id === 'tl-2017')!,
    UNIFIED_TIMELINE.find((t) => t.id === 'tl-2020')!,
    UNIFIED_TIMELINE.find((t) => t.id === 'tl-2026')!,
  ].filter(Boolean);

  const activeMilestone =
    featuredTimeline.find((m) => m.id === selectedTimelineId) || featuredTimeline[0];

  return (
    <div>
      {/* 1. Contained Centered HD Aerial Drone Video Hero */}
      <div className="bg-[#F9F6EF] px-3 sm:px-5 lg:px-8 pt-3 sm:pt-5 lg:pt-6">
        <section
          data-testid="homepage-hero"
          className="relative max-w-[1360px] mx-auto min-h-[78vh] lg:min-h-[84vh] flex items-center bg-[#0F2C1E] text-[#F9F6EF] overflow-hidden rounded-sm border border-[#D8CEB8]/70 shadow-sm"
        >
        <div className="absolute inset-0 overflow-hidden bg-[#0D2618]">
          {HERO_VIDEOS.map((reel, idx) => {
            const isActive = idx === heroIndex;
            return (
              <video
                key={reel.id}
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={reel.src}
                poster={reel.poster}
                muted
                playsInline
                autoPlay={idx === 0 && !prefersReducedMotion}
                preload="auto"
                onEnded={() => handleReelEnded(idx)}
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full object-cover object-center scale-[1.16] transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
                }`}
              />
            );
          })}
          <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0B2216]/90 via-[#0E2A1C]/68 to-[#0E291C]/28 pointer-events-none" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0B2216]/88 via-transparent to-[#0B2216]/32 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={ASSETS.logos.silverJubilee}
                alt="Rang Welfare Society Silver Jubilee 25 Emblem"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg shrink-0"
              />
              <div className="border-l border-[#D8B268]/50 pl-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#E3C17A] font-medium">
                  Rang Welfare Society · Silver Jubilee Edition
                </p>
                <p className="text-xs sm:text-sm text-[#DDD5C2] mt-1">
                  Village Rang · Seppa Circle · East Kameng · Arunachal Pradesh
                </p>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F9F6EF] leading-[1.08]">
              Rang — The 9 Colours
            </h1>

            <p className="mt-4 font-serif italic text-lg sm:text-xl text-[#E3C17A] tracking-wide">
              {SOCIETY_CONTACT.tagline}
            </p>

            <p className="mt-5 text-base sm:text-lg text-[#E6E0D0] leading-relaxed max-w-2xl">
              Nine ancestral clans inhabiting one hillside settlement overlooking the Kameng River—chronicling
              twenty-five years of organised community service (2001–2026), living Nyishi traditions,
              and a shared roadmap toward Rang Vision 2047.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/rang"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B88A3E] hover:bg-[#C99B4E] text-[#0E2418] font-semibold text-sm rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore Rang & the 9 Clans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/rang/monolith"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#E3C17A]/60 text-[#F9F6EF] hover:bg-white/10 font-medium text-sm rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Silver Jubilee Monolith</span>
              </Link>
              <Link
                to="/vision-2047"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/25 text-[#EFE9D8] hover:bg-white/10 font-medium text-sm rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Vision 2047</span>
              </Link>
            </div>

            {/* Quiet Institutional Facts Strip — zero pills */}
            <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#E3C17A] tabular-nums">9</p>
                <p className="text-xs text-[#D6CEBC] mt-1">Founding Clans, One Soul</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#E3C17A] tabular-nums">25</p>
                <p className="text-xs text-[#D6CEBC] mt-1">Years of Official Service</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#E3C17A] tabular-nums">4 km</p>
                <p className="text-xs text-[#D6CEBC] mt-1">Above Seppa Township</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#E3C17A] tabular-nums">2047</p>
                <p className="text-xs text-[#D6CEBC] mt-1">10 Missions · 9 Sankalps</p>
              </div>
            </div>

            {/* Quiet Hero Aerial Reel Indicator & Pause/Play Control */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2.5" role="group" aria-label="Aerial hero videos">
                {HERO_VIDEOS.map((reel, idx) => (
                  <button
                    key={reel.id}
                    type="button"
                    onClick={() => handleSelectReel(idx)}
                    aria-label={`Play aerial reel ${idx + 1}: ${reel.label}`}
                    aria-pressed={idx === heroIndex}
                    className={`h-1.5 rounded-xs transition-all cursor-pointer ${
                      idx === heroIndex
                        ? 'w-10 bg-[#E3C17A]'
                        : 'w-5 bg-white/35 hover:bg-white/60'
                    }`}
                  />
                ))}
                <span className="ml-2 text-[11px] uppercase tracking-[0.14em] text-[#DDD5C2] tabular-nums">
                  0{heroIndex + 1} / 0{HERO_VIDEOS.length} · {activeReel.label}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setHeroPaused((p) => !p)}
                aria-label={heroPaused ? 'Resume hero video playback' : 'Pause hero video playback'}
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#DDD5C2] hover:text-[#F9F6EF] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {heroPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{heroPaused ? 'Play' : 'Pause'}</span>
              </button>
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* 2. A Society Built on Unity — Chairman Message Intro */}
      <section className="py-16 sm:py-24 bg-[#F9F6EF] border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
                A Society Built on Unity
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#143A28] leading-tight">
                “A village grows stronger when its people care for one another.”
              </h2>
              <p className="text-base text-[#363C37] leading-relaxed">
                {chairmanMsg.paragraphs[0]}
              </p>
              <p className="text-base text-[#4A504B] leading-relaxed">
                From the first welfare committee formed at the Rang Saam hanging footbridge in 1993 and
                formal record-keeping begun in 2001, to written bye-laws in 2013, road connectivity in 2017,
                and the State’s first indigenous Gurukul—Nyubu Nyvgam Yerko—Rang Welfare Society stands
                as a living model of consensus governance and collective stewardship.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <img
                    src={ASSETS.dignitaries.logoRang}
                    alt="Er. Logo Rang, Chairman, Rang Welfare Society"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover object-[50%_18%] border-2 border-[#B88A3E]/70 shadow-xs shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#143A28]">{chairmanMsg.senderName}</p>
                    <p className="text-xs text-[#646B62]">{chairmanMsg.designation}</p>
                  </div>
                </div>
                <Link
                  to="/society/messages"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#143A28] hover:text-[#2D6A4F] underline underline-offset-4"
                >
                  <span>Read All Official Jubilee Messages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <EditorialImage
                src={ASSETS.groups.fullCommunity}
                alt="Rang Village community gathered together in traditional Nyishi attire"
                className="rounded-sm"
                imgClassName="w-full h-[320px] sm:h-[360px] object-cover rounded-sm border border-[#DED4BD]"
                caption="Members of Rang Welfare Society gathered at Village Rang — nine clans united under one shared heritage."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Nine Clans, One Rang */}
      <section className="py-16 sm:py-24 bg-[#F2ECE0] border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
                Rang — The 9 Colours
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#143A28] mt-2">
                The Nine Clans and Their Symbols
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#4A504B] max-w-2xl leading-relaxed">
                Each face carries the emblem of one clan, shown here in the order of settlement. Together
                they form the vocabulary of a good society: foundation, growth, continuity, warmth,
                balance, vision, connection, grace and unity.
              </p>
            </div>
            <Link
              to="/rang"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#143A28] hover:text-[#2D6A4F] whitespace-nowrap shrink-0"
            >
              <span>Explore Full Village Encyclopedia</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NINE_CLANS.map((clan) => (
              <Link
                key={clan.slug}
                to={`/rang/clans/${clan.slug}`}
                className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm p-5 transition-all flex items-start gap-4"
              >
                <img
                  src={clan.symbolImage}
                  alt={`${clan.name} Clan emblem — ${clan.symbolTitle}`}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-sm object-cover shrink-0 border border-[#C8BC9F]"
                />
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-semibold text-[#143A28] group-hover:text-[#2D6A4F] leading-snug">
                    {clan.name}
                  </h3>
                  <p className="text-xs font-medium text-[#7A6434] mt-0.5">{clan.symbolTitle}</p>
                  <p className="text-[11px] text-[#5A6058] mt-1.5 leading-snug">
                    <span className="font-semibold text-[#143A28]">{clan.settlerLabel}:</span>{' '}
                    {clan.foundingAncestors}
                  </p>
                  <p className="text-xs text-[#4A504B] mt-2 leading-relaxed">
                    {clan.symbolDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Journey Timeline + 5 Historical Periods */}
      <section className="py-16 sm:py-24 bg-[#F9F6EF] border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
                The Kameng Flows On
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#143A28] mt-2">
                25 Years of Service: Five Bends of the River
              </h2>
            </div>
            <Link
              to="/heritage/25-years"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#143A28] hover:text-[#2D6A4F] whitespace-nowrap shrink-0"
            >
              <span>Open Complete Achievement Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Milestone Selector */}
          <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8 mb-10">
            <div className="flex flex-wrap items-center gap-2 pb-5 border-b border-[#ECE5D5]">
              {featuredTimeline.map((item) => {
                const active = item.id === activeMilestone.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedTimelineId(item.id)}
                    className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#143A28] text-[#F9F6EF]'
                        : 'bg-[#F2ECE0] text-[#3B423D] hover:bg-[#E7DFCE]'
                    }`}
                  >
                    {item.year}
                  </button>
                );
              })}
            </div>
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-3">
                <p className="font-mono text-2xl font-semibold text-[#B88A3E] tabular-nums">
                  {activeMilestone.year}
                </p>
                <p className="text-xs text-[#646B62] mt-1">
                  {activeMilestone.category} · Term {activeMilestone.period}
                </p>
              </div>
              <div className="lg:col-span-9">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#143A28]">
                  {activeMilestone.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-[#3E4540] leading-relaxed">
                  {activeMilestone.description}
                </p>
                {activeMilestone.leadership && (
                  <p className="mt-3 text-xs text-[#6B5A38] font-medium">
                    Leadership: {activeMilestone.leadership}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 5 Leadership Periods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {RWS_SERVICE_PERIODS.map((period) => (
              <Link
                key={period.id}
                to="/heritage/25-years"
                className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#143A28] rounded-sm p-5 flex flex-col justify-between transition-colors"
              >
                <div>
                  <p className="font-mono text-xs text-[#B88A3E] font-semibold tabular-nums">
                    {period.range}
                  </p>
                  <h3 className="font-serif text-base font-semibold text-[#143A28] group-hover:text-[#2D6A4F] mt-1.5">
                    {period.title.replace(/^RVWC |^RWS /, '')}
                  </h3>
                  <p className="text-xs text-[#646B62] mt-2 leading-relaxed">{period.leaders}</p>
                </div>
                <p className="text-xs text-[#3E4540] mt-4 pt-3 border-t border-[#EFE8D8] leading-relaxed">
                  {period.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Silver Jubilee Monolith Spotlight */}
      <section className="py-16 sm:py-24 bg-[#143A28] text-[#F9F6EF] border-b border-[#B88A3E]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-[#FDFBF6] p-3 rounded-sm shadow-xl max-w-sm w-full border border-[#B88A3E]/50">
                <img
                  src={ASSETS.monolith.render3D}
                  alt="Silver Jubilee Monolith of Rang Village — nine faces of granite banded with 25 golden rings"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[430px] object-contain bg-[#F6F1E6] rounded-sm"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#E3C17A] font-semibold">
                Signature Monument · 2026
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight">
                One Stone, Nine Faces, Twenty-Five Golden Bands
              </h2>
              <p className="text-base text-[#E2DAC7] leading-relaxed">
                Carved from a single column of polished dark granite, the Silver Jubilee Monolith bears
                nine equal faces—one for each clan that settled Rang—bound together by twenty-five fine
                bands of gold marking each year of RWS service, and crowned by the rotating Silver Jubilee
                and Society emblems.
              </p>
              <p className="text-sm text-[#CFC7B5] leading-relaxed">
                “No clan stands in front of another; walk around it and there is no ‘main side’. Wherever
                you stand, you face someone’s symbol, and it faces you.”
              </p>
              <div className="pt-2">
                <Link
                  to="/rang/monolith"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B88A3E] hover:bg-[#C99B4E] text-[#0E2418] font-semibold text-sm rounded-sm transition-colors"
                >
                  <Landmark className="w-4 h-4" />
                  <span>Explore the Monolith & All 9 Symbols</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Community at Work — SHGs, Helping Hand & Two Pillars */}
      <section className="py-16 sm:py-24 bg-[#F9F6EF] border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
              Community Institutions & Remembrance
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#143A28] mt-2">
              Service Rooted in Solidarity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/community/shg"
              className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm overflow-hidden flex flex-col transition-colors"
            >
              <EditorialImage
                src={SHG_PROFILES[2].photo}
                alt="Rang Danne Self-Help Group women members in green traditional skirts"
                imgClassName="w-full h-52 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-medium">
                  Women’s Empowerment · 4 SHGs
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F] mt-1.5">
                  Threads of Strength, Bonds of Trust
                </h3>
                <p className="text-sm text-[#4A504B] mt-2.5 leading-relaxed flex-1">
                  Dawe Danne, Fodang Yarlo, Rang Danne, and Sangpine SHGs—turning weekly savings under ArSLM/PLF
                  into mushroom cultivation, organic farming, pickles, and bamboo craft.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143A28]">
                  Read SHG Stories <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            <Link
              to="/community/helping-hand"
              className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm overflow-hidden flex flex-col transition-colors"
            >
              <EditorialImage
                src={ASSETS.groups.helpingHand}
                alt="Members of Rang Helping Hand based at Seppa"
                imgClassName="w-full h-52 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-medium">
                  Seppa Professionals Collective
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F] mt-1.5">
                  Rang Helping Hand
                </h3>
                <p className="text-sm text-[#4A504B] mt-2.5 leading-relaxed flex-1">
                  First to arrive, last to claim credit—a circle of educated young professionals from Rang
                  stationed in Seppa who answer emergencies without fanfare.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143A28]">
                  Read Tribute <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            <Link
              to="/people/two-pillars"
              className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm overflow-hidden flex flex-col transition-colors"
            >
              <div className="grid grid-cols-2 h-52 bg-[#EAE3D2]">
                <img
                  src={ASSETS.leaders.mamaKocho}
                  alt="Lt. Mama Kocho"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top border-r border-[#F9F6EF]"
                />
                <img
                  src={ASSETS.leaders.tadoTamar}
                  alt="Lt. Tado Tamar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-medium">
                  Silver Jubilee Sports & Cultural Tribute
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F] mt-1.5">
                  Remembering Two Pillars of Rang
                </h3>
                <p className="text-sm text-[#4A504B] mt-2.5 leading-relaxed flex-1">
                  Honouring Lt. Mama Kocho (1975–2002) through the Sports Events and Lt. Tado Tamar
                  (1974–2008) through the Cultural Programme for their selfless service to Rang.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143A28]">
                  Read Memorial <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Community Voices Preview */}
      <section className="py-16 sm:py-24 bg-[#F2ECE0] border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
                Literary & Oral Heritage Library
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#143A28] mt-2">
                Community Voices
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[#4A504B] max-w-2xl">
                Full verbatim essays, childhood memoirs, youth reflections, poems, the Legend of Nyokum Yullo,
                and 13 traditional Nyishi riddles preserved for coming generations.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/voices"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
              >
                <BookOpen className="w-4 h-4" />
                <span>All Articles</span>
              </Link>
              <span className="text-[#C8BC9F]">·</span>
              <Link
                to="/voices/poems"
                className="text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
              >
                Poems
              </Link>
              <span className="text-[#C8BC9F]">·</span>
              <Link
                to="/voices/folktales"
                className="text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
              >
                Folktales
              </Link>
              <span className="text-[#C8BC9F]">·</span>
              <Link
                to="/voices/creativity"
                className="text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
              >
                Nyishi Riddles
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VOICE_ARTICLES.slice(0, 6).map((article) => (
              <Link
                key={article.slug}
                to={`/voices/${article.slug}`}
                className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <p className="text-xs text-[#7A6434] font-medium">
                    {article.category} · {article.readingMinutes} min read
                  </p>
                  <h3 className="font-serif text-lg font-semibold text-[#143A28] group-hover:text-[#2D6A4F] mt-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#4A504B] mt-2.5 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <p className="mt-5 pt-3 border-t border-[#EFE8D8] text-xs font-medium text-[#143A28]">
                  By {article.author}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Vision 2047 Panoramic Banner */}
      <section className="relative py-20 sm:py-28 bg-[#0F2C1E] text-[#F9F6EF] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={ASSETS.landscapes.valleyKamengSunrise}
            alt="Sunrise over the Kameng River valley and Rang mountains"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D271A]/95 via-[#123323]/78 to-[#0D271A]/85" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[#E3C17A] font-semibold">
            Viksit Bharat @ 2047 · Nine Clans, One Rang
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mt-3 leading-tight">
            Rang Vision 2047
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#E6E0D0] leading-relaxed max-w-3xl mx-auto">
            {VISION_2047.statement}
          </p>
          <OrnamentalDivider dark className="my-7" />
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 max-w-4xl mx-auto text-center mb-9">
            {VISION_2047.nineSankalps.map((s) => (
              <div key={s.num} className="bg-white/8 border border-white/15 rounded-sm px-2 py-2.5">
                <p className="font-mono text-[10px] text-[#E3C17A]">0{s.num}</p>
                <p className="font-serif text-xs font-medium text-[#F9F6EF] mt-0.5">{s.title}</p>
              </div>
            ))}
          </div>
          <Link
            to="/vision-2047"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#B88A3E] hover:bg-[#C99B4E] text-[#0E2418] font-semibold text-sm rounded-sm transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Read Full Vision 2047, 10 Missions & Progress Tracker</span>
          </Link>
        </div>
      </section>

      {/* 9. Official Newsroom & Announcements (Strictly Empty State Until Published via CMS) */}
      <section className="py-16 sm:py-20 bg-[#F9F6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
                Official Notices & Institutional Updates
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28] mt-1.5">
                RWS Newsroom
              </h2>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/media/newsroom" className="font-medium text-[#143A28] hover:text-[#2D6A4F]">
                View Newsroom →
              </Link>
              <Link to="/contribute" className="font-medium text-[#7A6434] hover:text-[#143A28]">
                Contribute to Archive →
              </Link>
            </div>
          </div>

          {(() => {
            const combinedHomeNews = [
              ...STATIC_NEWS_ARTICLES.map((a) => ({
                id: a.id,
                slug: a.slug,
                title: a.title,
                category: a.category,
                meta: a.publishDate || a.location || '',
                summary: a.summary,
                imageUrl: a.imageUrl,
                imageAlt: a.imageAlt,
              })),
              ...announcements.map((a) => ({
                id: a.id,
                slug: a.id,
                title: a.title,
                category: a.category,
                meta: a.publishDate,
                summary: a.summary,
                imageUrl: undefined as string | undefined,
                imageAlt: a.title,
              })),
            ];

            if (combinedHomeNews.length === 0) {
              return (
                <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <p className="text-sm font-medium text-[#143A28]">
                      No official notices or announcements have been published yet.
                    </p>
                    <p className="text-sm text-[#5A6058] mt-1.5 leading-relaxed">
                      To preserve institutional accuracy, this newsroom displays only verified notices,
                      general conference announcements, and public statements published directly by Rang
                      Welfare Society administrators.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 shrink-0">
                    <Link
                      to="/media/publications"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-medium rounded-sm hover:bg-[#1B4332] whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Souvenir PDF</span>
                    </Link>
                    <Link
                      to="/admin"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#C8BC9F] text-[#143A28] text-xs font-medium rounded-sm hover:bg-[#F2ECE0] whitespace-nowrap"
                    >
                      <span>Admin Publish Portal</span>
                    </Link>
                  </div>
                </div>
              );
            }

            if (combinedHomeNews.length === 1) {
              const latest = combinedHomeNews[0];
              return (
                <article className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm overflow-hidden transition-colors shadow-xs">
                  <Link
                    to={`/media/newsroom/${latest.slug}`}
                    className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
                  >
                    {latest.imageUrl && (
                      <div className="lg:col-span-6 bg-[#F2ECE0] border-b lg:border-b-0 lg:border-r border-[#E5DEC9] flex items-center justify-center">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={latest.imageUrl}
                            alt={latest.imageAlt}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain object-center"
                          />
                        </div>
                      </div>
                    )}
                    <div className={`${latest.imageUrl ? 'lg:col-span-6' : 'lg:col-span-12'} p-6 sm:p-8 flex flex-col justify-between`}>
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {latest.category}
                            {latest.meta ? ` · ${latest.meta}` : ''}
                          </span>
                        </p>
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F] mt-2.5 leading-snug transition-colors">
                          {latest.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[#4A504B] mt-3 leading-relaxed">
                          {latest.summary}
                        </p>
                      </div>
                      <span className="mt-6 pt-4 border-t border-[#EFE8D8] inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#143A28] group-hover:text-[#8E6520] transition-colors">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {combinedHomeNews.slice(0, 3).map((item) => (
                  <article
                    key={item.id}
                    className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm overflow-hidden flex flex-col justify-between transition-colors"
                  >
                    <Link to={`/media/newsroom/${item.slug}`} className="flex flex-col flex-1">
                      {item.imageUrl && (
                        <div className="aspect-video w-full bg-[#F2ECE0] border-b border-[#EFE8D8] overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.imageAlt}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain object-center"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-[#7A6434] font-medium flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {item.category}
                              {item.meta ? ` · ${item.meta}` : ''}
                            </span>
                          </p>
                          <h3 className="font-serif text-lg font-semibold text-[#143A28] group-hover:text-[#2D6A4F] mt-2 leading-snug transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[#4A504B] mt-2 leading-relaxed">{item.summary}</p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#143A28] group-hover:text-[#8E6520]">
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            );
          })()}

          {/* Quick Institutional Navigation Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#E5DEC9]">
            <Link
              to="/rang/landscape"
              className="flex items-start gap-3 p-4 bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm transition-colors"
            >
              <Compass className="w-5 h-5 text-[#B88A3E] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif text-base font-semibold text-[#143A28]">Landscape Gazetteer</p>
                <p className="text-xs text-[#5A6058] mt-0.5">
                  81 named river sites, streams, Myoko & Myodi mountain places.
                </p>
              </div>
            </Link>
            <Link
              to="/people/firsts"
              className="flex items-start gap-3 p-4 bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm transition-colors"
            >
              <Users className="w-5 h-5 text-[#B88A3E] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif text-base font-semibold text-[#143A28]">The First in Rang</p>
                <p className="text-xs text-[#5A6058] mt-0.5">
                  Priests, Gaon Burahs, graduates, officers & Roll of Honour.
                </p>
              </div>
            </Link>
            <Link
              to="/media/gallery"
              className="flex items-start gap-3 p-4 bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm transition-colors"
            >
              <BookOpen className="w-5 h-5 text-[#B88A3E] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif text-base font-semibold text-[#143A28]">Historical Photo Gallery</p>
                <p className="text-xs text-[#5A6058] mt-0.5">
                  2013 Conference, PMGSY Road, SHGs, Sports & Community life.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
