import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  FileText,
  Clock,
} from 'lucide-react';
import { VISION_2047 } from '../data/communityAndVisionData';
import { ASSETS } from '../data/assets';
import { PageHeader, OrnamentalDivider } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';
import { subscribeVisionUpdates, type VisionUpdateDoc } from '../services/cmsService';

export function Vision2047Page() {
  usePageSeo({
    title: 'Rang Vision 2047 — Nine Clans, One Rang',
    description:
      'Rang Vision 2047 by Advisor Mara Kocho: 10 Flagship Missions, 3-Phase Roadmap (Rang Nirman, Rang Vistar, Rang Shikhar), Nine Sankalps, and General Conference Resolution.',
  });

  const [updates, setUpdates] = useState<VisionUpdateDoc[]>([]);
  const [selectedMissionId, setSelectedMissionId] = useState<string>(VISION_2047.missions[0].id);

  useEffect(() => {
    const unsub = subscribeVisionUpdates(setUpdates);
    return () => unsub();
  }, []);

  const selectedMission =
    VISION_2047.missions.find((m) => m.id === selectedMissionId) || VISION_2047.missions[0];

  const updatesByMission = (missionId: string) =>
    updates.filter((u) => u.missionId === missionId);

  return (
    <div>
      <PageHeader
        kicker={`Viksit Bharat @ 2047 · By ${VISION_2047.author}`}
        title={VISION_2047.title}
        subtitle={VISION_2047.subtitle}
        breadcrumbs={[{ label: 'Rang Vision 2047' }]}
        backgroundImage={ASSETS.landscapes.valleyKamengSunrise}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">
        {/* Opening & Vision Statement */}
        <section className="max-w-4xl mx-auto space-y-6">
          <p className="font-serif text-[17px] leading-[1.85] text-[#262B27] editorial-dropcap">
            {VISION_2047.intro}
          </p>
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-[#143A28]">
              Why a Vision, and Why Now
            </h2>
            <p className="font-serif text-[16.5px] leading-[1.82] text-[#363C37]">
              {VISION_2047.whyNow}
            </p>
          </div>

          {/* Highlighted Vision Statement */}
          <blockquote className="bg-[#143A28] text-[#F9F6EF] border border-[#B88A3E]/50 rounded-sm p-7 sm:p-10 text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E3C17A] font-semibold">
              Where We Want To Be · Vision 2047
            </p>
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-[#F9F6EF]">
              “{VISION_2047.statement}”
            </p>
          </blockquote>
        </section>

        {/* Ten Flagship Missions Explorer */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
              Ten Missions · Each with a Flagship Project
            </p>
            <h2 className="font-serif text-3xl font-semibold text-[#143A28] mt-1">
              The Ten Missions of Rang Vision 2047
            </h2>
            <p className="text-sm text-[#4A504B] mt-2">
              Select any mission below to inspect its flagship mandate and verified RWS progress records.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {VISION_2047.missions.map((mission, idx) => {
              const active = mission.id === selectedMission.id;
              const count = updatesByMission(mission.id).length;
              return (
                <button
                  key={mission.id}
                  type="button"
                  onClick={() => setSelectedMissionId(mission.id)}
                  className={`p-3.5 rounded-sm border text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#143A28] text-[#F9F6EF] border-[#143A28]'
                      : 'bg-[#FDFBF6] text-[#143A28] border-[#E2D9C4] hover:border-[#B88A3E]'
                  }`}
                >
                  <p
                    className={`font-mono text-[11px] font-semibold tabular-nums ${
                      active ? 'text-[#E3C17A]' : 'text-[#B88A3E]'
                    }`}
                  >
                    Mission {String(idx + 1).padStart(2, '0')}
                  </p>
                  <p className="font-serif text-base font-semibold mt-0.5">{mission.name}</p>
                  <p
                    className={`text-[11px] mt-1 ${
                      active ? 'text-[#D6CEBC]' : 'text-[#646B62]'
                    }`}
                  >
                    {count > 0 ? `${count} update${count > 1 ? 's' : ''}` : 'Not yet published'}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Mission Detail + Live Firestore Updates */}
          <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold">
                Pillar: {selectedMission.pillar}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28]">
                {selectedMission.name}
              </h3>
              <p className="text-sm font-medium text-[#2D6A4F]">{selectedMission.focus}</p>
              <p className="text-base text-[#2E3430] leading-relaxed pt-1">
                <strong>Flagship Mandate:</strong> {selectedMission.flagship}
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.14em] text-[#7A6434] font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Verified Mission Progress Updates</span>
                </p>
                <Link to="/admin" className="text-xs text-[#143A28] hover:underline">
                  Admin Update →
                </Link>
              </div>

              {updatesByMission(selectedMission.id).length === 0 ? (
                <div className="py-4 text-sm text-[#5A6058] space-y-1.5">
                  <p className="font-medium text-[#143A28]">
                    Progress information not yet published.
                  </p>
                  <p className="text-xs leading-relaxed">
                    Baseline indicators and implementation figures for {selectedMission.name} will
                    appear here once RWS completes the household baseline survey and publishes verified
                    updates through the RWS Admin Portal.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {updatesByMission(selectedMission.id).map((u) => (
                    <div key={u.id} className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-4">
                      <p className="text-xs font-mono text-[#B88A3E] font-semibold">
                        {u.reportedDate} · {u.progressStatus} · {u.phase}
                      </p>
                      <h4 className="font-serif text-base font-semibold text-[#143A28] mt-1">
                        {u.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3E4540] mt-1 leading-relaxed">
                        {u.summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Reform From Within & Institutional Architecture */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Persuasion & Consent, Never Compulsion</span>
            </p>
            <h3 className="font-serif text-2xl font-semibold text-[#143A28]">Reform from Within</h3>
            <p className="text-sm sm:text-base text-[#363C37] leading-relaxed">
              {VISION_2047.reformFromWithin}
            </p>
          </article>

          <article className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Governance & Rang Development Corpus</span>
            </p>
            <h3 className="font-serif text-2xl font-semibold text-[#143A28]">
              An Institution That Outlasts Us
            </h3>
            <p className="text-sm sm:text-base text-[#363C37] leading-relaxed">
              {VISION_2047.institution}
            </p>
          </article>
        </section>

        {/* Three-Phase Roadmap */}
        <section className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
              The Road to 2047 · Three Phases
            </p>
            <h2 className="font-serif text-3xl font-semibold text-[#143A28] mt-1">
              21-Year Phased Implementation Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VISION_2047.phases.map((p, idx) => (
              <div
                key={p.phase}
                className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-xs text-[#B88A3E] font-semibold tabular-nums">
                    Phase 0{idx + 1} · {p.years}
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#143A28] mt-1.5">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#3E4540] mt-3 leading-relaxed">{p.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <OrnamentalDivider />

        {/* The Nine Sankalps */}
        <section className="bg-[#143A28] text-[#F9F6EF] rounded-sm p-7 sm:p-12 border border-[#B88A3E]/40">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E3C17A] font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Matching the Nine Clans in Number</span>
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-2">
              The Nine Sankalps
            </h2>
            <p className="text-sm text-[#D6CEBC] mt-2 leading-relaxed">
              Placed beside the Silver Jubilee Monolith to be read aloud together and adopted by the
              General Conference — the Vision in a single breath.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VISION_2047.nineSankalps.map((s) => (
              <div
                key={s.num}
                className="bg-[#0F2C1E] border border-[#B88A3E]/35 rounded-sm p-5 text-center"
              >
                <p className="font-mono text-xs text-[#E3C17A] font-semibold tabular-nums">
                  Sankalp 0{s.num}
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#F9F6EF] mt-1">{s.title}</h3>
                <p className="text-sm text-[#DCD4C2] mt-1">{s.pledge}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proposed General Conference Resolution */}
        <section className="max-w-4xl mx-auto bg-[#FDFBF6] border-2 border-[#B88A3E]/50 rounded-sm p-7 sm:p-11 space-y-6">
          <div className="text-center">
            <FileText className="w-6 h-6 text-[#B88A3E] mx-auto mb-2" />
            <p className="text-xs uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
              Silver Jubilee General Conference
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28] mt-1">
              Proposed Resolution for Adoption by the General Conference
            </h2>
          </div>

          <p className="font-serif text-base text-[#2E3430] leading-relaxed">
            The General Conference of the Rang Welfare Society, assembled on the occasion of its
            Silver Jubilee, resolves to:
          </p>

          <ul className="space-y-3">
            {VISION_2047.resolutionClauses.map((clause, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#262B27] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-1" />
                <span>{clause}</span>
              </li>
            ))}
          </ul>

          <p className="pt-5 border-t border-[#ECE5D5] font-serif text-lg font-medium text-[#143A28] text-center leading-relaxed">
            {VISION_2047.closing}
          </p>
        </section>
      </div>
    </div>
  );
}
