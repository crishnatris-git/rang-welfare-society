import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck2, Scale, Award, Info } from 'lucide-react';
import { ASSETS } from '../data/assets';
import {
  OFFICIAL_MESSAGES,
  RWS_BYELAW_OBJECTIVES,
  EDITORIAL_DISCREPANCIES,
  SOCIETY_CONTACT,
} from '../data/societyData';
import { RWS_SERVICE_PERIODS } from '../data/heritageData';
import { PageHeader, OrnamentalDivider } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';

type SocietySection = 'about' | 'messages' | 'governance' | 'jubilee';

export function SocietyPage({ section = 'about' }: { section?: SocietySection }) {
  const metaMap: Record<SocietySection, { title: string; kicker: string; subtitle: string; crumb: string }> = {
    about: {
      title: 'About Rang Welfare Society',
      kicker: 'The Society · Institutional Profile',
      subtitle:
        'Uniting nine ancestral clans of Village Rang in East Kameng District for community welfare, environmental stewardship, education, and cultural continuity.',
      crumb: 'About RWS',
    },
    messages: {
      title: 'Official Silver Jubilee Messages',
      kicker: 'The Society · Commemorative Messages',
      subtitle:
        'Verbatim greetings and commendations from Hon’ble Members of Legislative Assembly, Deputy Commissioner East Kameng, RWS Chairman, and the Silver Jubilee Organising Chairman.',
      crumb: 'Official Messages',
    },
    governance: {
      title: 'Leadership, Bye-Laws & Governance',
      kicker: 'The Society · Constitution & Administration',
      subtitle:
        'From custom to constitution: the nine constitutional objectives adopted in 2013, leadership terms from 1991 to 2026, and consensus governance.',
      crumb: 'Governance & Bye-Laws',
    },
    jubilee: {
      title: 'Silver Jubilee Celebration (2001–2026)',
      kicker: 'The Society · 25 Years of Service',
      subtitle:
        'Honouring twenty-five years of official community record-keeping, installing the nine-faced Granite Monolith, dedicating a Cultural Night to Two Pillars, and adopting Rang Vision 2047.',
      crumb: 'Silver Jubilee',
    },
  };

  const current = metaMap[section];
  usePageSeo({ title: current.title, description: current.subtitle });

  const tabs: { key: SocietySection; label: string; to: string }[] = [
    { key: 'about', label: 'About RWS', to: '/society' },
    { key: 'messages', label: 'Official Messages', to: '/society/messages' },
    { key: 'governance', label: 'Governance & Bye-Laws', to: '/society/governance' },
    { key: 'jubilee', label: 'Silver Jubilee', to: '/society/silver-jubilee' },
  ];

  return (
    <div>
      <PageHeader
        kicker={current.kicker}
        title={current.title}
        subtitle={current.subtitle}
        breadcrumbs={[{ label: 'The Society', to: '/society' }, { label: current.crumb }]}
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              to={tab.to}
              className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                section === tab.key
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
        {section === 'about' && (
          <div className="space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-5 text-[#2E3430] leading-relaxed">
                <h2 className="font-serif text-3xl font-semibold text-[#143A28]">
                  One Village. One Family. One Future.
                </h2>
                <p>
                  The <strong>Rang Welfare Society (RWS)</strong> is the apex community welfare and cultural
                  institution of Rang Village, situated approximately 4 km from Seppa—the district
                  headquarters of East Kameng, Arunachal Pradesh. Rooted in the traditional village council
                  (<em>Nyele</em>) and first organised as the Rang Village Welfare Committee in 1993 at the
                  Rang Saam hanging footbridge, the Society began formal written record-keeping in 2001 and
                  adopted its written constitutional bye-laws in October 2013.
                </p>
                <p>
                  Uniquely among villages in Arunachal Pradesh, Rang brings together <strong>nine distinct
                  Nyishi clans</strong>—Tamar, Tabang, Doda, Takung, Lichi, Kocho, Dawe, Ribu, and Pimong
                  (Pimung)—under one shared roof, one Society, and a long-standing tradition of selecting
                  Panchayat leaders by consensus rather than divisive contest.
                </p>
                <p>
                  Over twenty-five years of official functioning, RWS has protected village forests and rivers,
                  forged inter-village peace pacts, monitored the PMGSY model road and CMAGY Model Village
                  works, supported competitive examination coaching and Nyubu Nyvgam Yerko (Arunachal’s first
                  indigenous Gurukul), mapped village land, and registered every resident household.
                </p>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    to="/heritage/genesis"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#143A28] text-[#F9F6EF] text-sm font-medium rounded-sm hover:bg-[#1B4332]"
                  >
                    <span>Read the Full Genesis of RWS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/society/messages"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C8BC9F] text-[#143A28] text-sm font-medium rounded-sm hover:bg-[#F2ECE0]"
                  >
                    <span>Read Official Messages</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 sm:p-8 space-y-6">
                <div className="flex flex-col items-center justify-center py-2 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B88A3E]/60 bg-[#143A28] shadow-sm">
                    <img
                      src={ASSETS.logos.rwsOfficial}
                      alt="Official Rang Welfare Society Logo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#7A6434] font-semibold">
                    Official Emblem · Estb. 1991 · Hq: New Seppa
                  </p>
                </div>
                <dl className="divide-y divide-[#ECE5D5] text-sm">
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#646B62]">Headquarters</dt>
                    <dd className="text-[#143A28] font-medium text-right">Community Hall, Village Rang</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#646B62]">Circle & District</dt>
                    <dd className="text-[#143A28] font-medium text-right">Seppa Circle, East Kameng</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#646B62]">Official Functioning Year</dt>
                    <dd className="text-[#143A28] font-mono font-medium text-right">2001 (Silver Jubilee 2026)</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#646B62]">Written Bye-Laws Adopted</dt>
                    <dd className="text-[#143A28] font-mono font-medium text-right">October 2013</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#646B62]">Current Leadership (2023–26)</dt>
                    <dd className="text-[#143A28] font-medium text-right">Er. Logo Rang & Sh. Longpa Kocho</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#646B62]">Official Email</dt>
                    <dd className="text-[#143A28] font-medium text-right">{SOCIETY_CONTACT.email}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {section === 'messages' && (
          <div className="space-y-10 max-w-5xl mx-auto">
            {OFFICIAL_MESSAGES.map((msg) => (
              <article
                key={msg.id}
                className={`bg-[#FDFBF6] border rounded-sm p-6 sm:p-10 ${
                  msg.isPending ? 'border-dashed border-[#C8BC9F]' : 'border-[#E2D9C4]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-[#ECE5D5]">
                  {msg.portrait && (
                    <img
                      src={msg.portrait}
                      alt={msg.senderName}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top border-2 border-[#B88A3E]/70 shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                      Official Silver Jubilee Message
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28] mt-1">
                      {msg.senderName}
                    </h2>
                    <p className="text-sm font-medium text-[#2D6A4F] mt-0.5">{msg.designation}</p>
                    <p className="text-xs text-[#5A6058] mt-0.5">{msg.constituencyOrOffice}</p>
                    {msg.date && <p className="text-xs font-mono text-[#7A6434] mt-1">{msg.date}</p>}
                  </div>
                </div>

                {msg.isPending ? (
                  <div className="mt-6 bg-[#F2ECE0] p-5 rounded-sm flex items-start gap-3 text-sm text-[#4A504B]">
                    <Info className="w-5 h-5 text-[#B88A3E] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{msg.editorialNote}</p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4 font-serif text-[16px] sm:text-[17px] leading-[1.82] text-[#262B27]">
                    {msg.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                    <p className="pt-4 font-sans text-sm font-semibold text-[#143A28]">
                      {msg.signOff}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {section === 'governance' && (
          <div className="space-y-14">
            {/* 9 Written Bye-Law Aims */}
            <section>
              <div className="flex items-center gap-2.5 text-[#7A6434] text-xs uppercase tracking-[0.16em] font-semibold mb-2">
                <Scale className="w-4 h-4" />
                <span>Adopted October 2013 · Written Constitution</span>
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#143A28]">
                Nine Constitutional Objectives of Rang Welfare Society
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#4A504B] max-w-3xl leading-relaxed">
                Drafted under the initiative of Er. Pai Dawe Rang (first graduate and engineer of Rang)
                during the 1st General Conference in October 2013, the RWS bye-laws read like a charter
                for a modern village:
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {RWS_BYELAW_OBJECTIVES.map((aim, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-5 flex items-start gap-3.5"
                  >
                    <span className="font-mono text-sm font-semibold text-[#B88A3E] tabular-nums shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-sm text-[#2E3430] leading-relaxed">{aim}</p>
                  </div>
                ))}
              </div>
            </section>

            <OrnamentalDivider />

            {/* Leadership Terms Summary */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold">
                    Successive Office Bearers (1991–2026)
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#143A28] mt-1">
                    RWS Leadership Terms
                  </h2>
                </div>
                <Link
                  to="/people"
                  className="text-sm font-medium text-[#143A28] hover:text-[#2D6A4F]"
                >
                  View Full Panchayat & Founders Register →
                </Link>
              </div>

              <div className="overflow-x-auto bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#F2ECE0] border-b border-[#E2D9C4] text-xs uppercase tracking-wider text-[#5A6058]">
                      <th className="py-3.5 px-5 font-semibold">Term</th>
                      <th className="py-3.5 px-5 font-semibold">Chapter / Theme</th>
                      <th className="py-3.5 px-5 font-semibold">Leadership</th>
                      <th className="py-3.5 px-5 font-semibold">Defining Legacy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8D8]">
                    {RWS_SERVICE_PERIODS.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F9F6EF]">
                        <td className="py-4 px-5 font-mono text-xs font-semibold text-[#B88A3E] whitespace-nowrap tabular-nums">
                          {p.range}
                        </td>
                        <td className="py-4 px-5 font-serif font-semibold text-[#143A28]">
                          {p.title}
                        </td>
                        <td className="py-4 px-5 text-[#363C37]">{p.leaders}</td>
                        <td className="py-4 px-5 text-[#4A504B]">{p.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Archival Transparency & Editorial Discrepancies */}
            <section className="bg-[#F2ECE0] border border-[#E2D9C4] rounded-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[#7A6434] text-xs uppercase tracking-[0.16em] font-semibold mb-2">
                <FileCheck2 className="w-4 h-4" />
                <span>Archival Integrity Note</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#143A28]">
                Editorial Verification & Source-Text Transparency
              </h3>
              <p className="text-sm text-[#4A504B] mt-2 leading-relaxed max-w-3xl">
                In preserving the authoritative Silver Jubilee manuscript verbatim, the following
                spelling and date variations across original contributors and documents have been
                retained faithfully and documented transparently for RWS Editorial Committee review:
              </p>
              <div className="mt-5 space-y-3">
                {EDITORIAL_DISCREPANCIES.map((item) => (
                  <div key={item.id} className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-4">
                    <p className="text-sm font-semibold text-[#143A28]">{item.topic}</p>
                    <p className="text-xs font-mono text-[#6B341C] mt-1">{item.variants}</p>
                    <p className="text-xs text-[#5A6058] mt-1.5 leading-relaxed">{item.context}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {section === 'jubilee' && (
          <div className="space-y-12 max-w-5xl mx-auto">
            <div className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-8 sm:p-10 text-center">
              <img
                src={ASSETS.logos.silverJubilee}
                alt="Rang Welfare Society Silver Jubilee 25 Emblem"
                className="w-32 h-32 mx-auto object-contain mb-5"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-[#7A6434] font-semibold">
                {SOCIETY_CONTACT.jubileeDate} · Village Rang
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#143A28] mt-2">
                25 Years of Service, Compassion & Unity
              </h2>
              <p className="mt-4 text-base text-[#4A504B] leading-relaxed max-w-2xl mx-auto">
                While oral memory traces the Society’s earliest origins to 1991 and the first committee at
                Rang Saam footbridge to 1993, Rang Welfare Society formally recognises 2001—the year
                written record-keeping began—as its official year of functioning, celebrating its Silver
                Jubilee in November 2026 under Organising Chairman Sh. Pacha Kocho and RWS Chairman Er. Logo Rang.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/rang/monolith"
                className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm p-6 transition-colors"
              >
                <Award className="w-6 h-6 text-[#B88A3E] mb-3" />
                <h3 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F]">
                  Installation of the Silver Jubilee Monolith
                </h3>
                <p className="text-sm text-[#4A504B] mt-2 leading-relaxed">
                  One granite column carved with nine faces for the nine clans, twenty-five golden bands,
                  and a two-sided rotating crown.
                </p>
              </Link>

              <Link
                to="/people/two-pillars"
                className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm p-6 transition-colors"
              >
                <Award className="w-6 h-6 text-[#B88A3E] mb-3" />
                <h3 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F]">
                  Cultural Night for Two Pillars of Rang
                </h3>
                <p className="text-sm text-[#4A504B] mt-2 leading-relaxed">
                  Dedicated to Lt. Mama Kocho and Lt. Tado Tamar with modern and folk songs and dance
                  competitions honouring their selfless service.
                </p>
              </Link>

              <Link
                to="/media/publications"
                className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm p-6 transition-colors"
              >
                <Award className="w-6 h-6 text-[#B88A3E] mb-3" />
                <h3 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F]">
                  Souvenir Publication: “Rang — The 9 Colours”
                </h3>
                <p className="text-sm text-[#4A504B] mt-2 leading-relaxed">
                  Full digital archive and downloadable PDF editions documenting Rang’s history, landscape,
                  pioneers, community voices, and SHGs.
                </p>
              </Link>

              <Link
                to="/vision-2047"
                className="group bg-[#FDFBF6] border border-[#E2D9C4] hover:border-[#B88A3E] rounded-sm p-6 transition-colors"
              >
                <Award className="w-6 h-6 text-[#B88A3E] mb-3" />
                <h3 className="font-serif text-xl font-semibold text-[#143A28] group-hover:text-[#2D6A4F]">
                  Adoption of Rang Vision 2047 & Nine Sankalps
                </h3>
                <p className="text-sm text-[#4A504B] mt-2 leading-relaxed">
                  A 21-year roadmap in step with Viksit Bharat @ 2047 built around ten flagship missions,
                  three phases, and a permanent Rang Development Corpus.
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
