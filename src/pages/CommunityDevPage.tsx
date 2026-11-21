import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Users, Building2, CheckCircle2 } from 'lucide-react';
import { SHG_ARTICLE, SHG_PROFILES, RANG_HELPING_HAND } from '../data/communityAndVisionData';
import { INFRASTRUCTURE_MILESTONES } from '../data/rangEncyclopedia';
import { ASSETS } from '../data/assets';
import { PageHeader, OrnamentalDivider, EditorialImage } from '../components/EditorialUI';
import { usePageSeo } from '../utils/seo';

type CommunityMode = 'shg' | 'helping-hand' | 'development';

export function CommunityDevPage({ mode = 'shg' }: { mode?: CommunityMode }) {
  const meta: Record<CommunityMode, { title: string; kicker: string; subtitle: string; crumb: string }> = {
    shg: {
      title: 'Rang Self-Help Groups',
      kicker: 'Community & Development · Women’s Empowerment',
      subtitle: SHG_ARTICLE.subtitle,
      crumb: 'Self-Help Groups',
    },
    'helping-hand': {
      title: 'Rang Helping Hand',
      kicker: 'Community & Development · Emergency Solidarity',
      subtitle: RANG_HELPING_HAND.subtitle,
      crumb: 'Rang Helping Hand',
    },
    development: {
      title: 'Community Development & Institutions',
      kicker: 'Community & Development · Collective Progress',
      subtitle:
        'From Rang Primary School (1983) and PMGSY road connectivity (2017) to Nyubu Nyvgam Yerko (2020), student coaching, and village cleanliness.',
      crumb: 'Development Initiatives',
    },
  };

  const current = meta[mode];
  usePageSeo({ title: current.title, description: current.subtitle });

  const tabs: { key: CommunityMode; label: string; to: string }[] = [
    { key: 'shg', label: 'Self-Help Groups (4)', to: '/community/shg' },
    { key: 'helping-hand', label: 'Rang Helping Hand', to: '/community/helping-hand' },
    { key: 'development', label: 'Village Development', to: '/community/development' },
  ];

  return (
    <div>
      <PageHeader
        kicker={current.kicker}
        title={current.title}
        subtitle={current.subtitle}
        breadcrumbs={[{ label: 'Community & Development', to: '/community/shg' }, { label: current.crumb }]}
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
        {mode === 'shg' && (
          <div className="space-y-14">
            {/* 4 SHG Cards */}
            <section>
              <div className="max-w-3xl mb-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Four All-Women Collectives · ArSLM & PLF</span>
                </p>
                <h2 className="font-serif text-3xl font-semibold text-[#143A28] mt-1">
                  {SHG_ARTICLE.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SHG_PROFILES.map((shg) => (
                  <article
                    key={shg.id}
                    className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm overflow-hidden flex flex-col"
                  >
                    <EditorialImage
                      src={shg.photo}
                      alt={`${shg.name} — ${shg.attireColour}`}
                      imgClassName="w-full h-64 object-cover"
                    />
                    <div className="p-6 space-y-3 flex-1 flex flex-col">
                      <div>
                        <p className="text-xs font-mono text-[#B88A3E] font-semibold">
                          {shg.attireColour}
                        </p>
                        <h3 className="font-serif text-2xl font-semibold text-[#143A28] mt-0.5">
                          {shg.name}
                        </h3>
                      </div>

                      <p className="text-sm text-[#363C37] leading-relaxed">{shg.description}</p>

                      {(shg.formedDate || shg.membersCount || shg.president) && (
                        <dl className="bg-[#F2ECE0] p-4 rounded-sm space-y-1.5 text-xs">
                          {shg.president && (
                            <div>
                              <span className="font-semibold text-[#143A28]">President: </span>
                              <span className="text-[#363C37]">{shg.president}</span>
                            </div>
                          )}
                          {shg.formedDate && (
                            <div>
                              <span className="font-semibold text-[#143A28]">Formed: </span>
                              <span className="text-[#363C37]">{shg.formedDate}</span>
                            </div>
                          )}
                          {shg.membersCount && (
                            <div>
                              <span className="font-semibold text-[#143A28]">Strength: </span>
                              <span className="text-[#363C37]">{shg.membersCount}</span>
                            </div>
                          )}
                        </dl>
                      )}

                      <div className="pt-2 mt-auto">
                        <p className="text-[11px] uppercase tracking-wider text-[#646B62] font-semibold mb-1.5">
                          Recorded Activities
                        </p>
                        <ul className="space-y-1">
                          {shg.livelihoodActivities.map((act) => (
                            <li
                              key={act}
                              className="text-xs text-[#2E3430] flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <OrnamentalDivider />

            {/* Full Verbatim Essay */}
            <article className="max-w-4xl mx-auto bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 sm:p-12 space-y-8">
              <div className="space-y-4 font-serif text-[16.5px] leading-[1.85] text-[#262B27]">
                {SHG_ARTICLE.intro.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? 'editorial-dropcap' : ''}>
                    {p}
                  </p>
                ))}
              </div>

              {SHG_ARTICLE.sections.map((sec) => (
                <section key={sec.heading} className="space-y-3.5">
                  <h3 className="font-serif text-2xl font-semibold text-[#143A28]">{sec.heading}</h3>
                  <div className="space-y-4 font-serif text-[16.5px] leading-[1.85] text-[#262B27]">
                    {sec.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          </div>
        )}

        {mode === 'helping-hand' && (
          <div className="max-w-4xl mx-auto space-y-10">
            <EditorialImage
              src={RANG_HELPING_HAND.photo}
              alt={RANG_HELPING_HAND.photoCaption}
              imgClassName="w-full max-h-[480px] object-cover rounded-sm border border-[#DED4BD]"
              caption={RANG_HELPING_HAND.photoCaption}
            />

            <article className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-7 sm:p-12 space-y-8">
              <div className="flex items-center gap-2 text-[#7A6434] text-xs uppercase tracking-[0.16em] font-semibold">
                <HeartHandshake className="w-4 h-4" />
                <span>Tribute · Silver Jubilee Souvenir</span>
              </div>

              <div className="space-y-4 font-serif text-[17px] leading-[1.85] text-[#262B27]">
                {RANG_HELPING_HAND.opening.map((p, i) => (
                  <p key={i} className={i === 0 ? 'editorial-dropcap' : ''}>
                    {p}
                  </p>
                ))}
              </div>

              {RANG_HELPING_HAND.sections.map((sec) => (
                <section key={sec.heading} className="space-y-3">
                  <h2 className="font-serif text-2xl font-semibold text-[#143A28]">{sec.heading}</h2>
                  <p className="font-serif text-[16.5px] leading-[1.85] text-[#262B27]">
                    {sec.body}
                  </p>
                </section>
              ))}
            </article>
          </div>
        )}

        {mode === 'development' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#7A6434] font-semibold flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>Education, Roads, Sanitation & Land Stewardship</span>
                </p>
                <h2 className="font-serif text-3xl font-semibold text-[#143A28]">
                  Community-Monitored Development in East Kameng
                </h2>
                <p className="text-sm sm:text-base text-[#363C37] leading-relaxed">
                  Rather than waiting passively for external schemes, Rang Welfare Society created
                  Quality Monitoring Committees for the PMGSY road and CMAGY Model Village project,
                  established student coaching for APSSB and Classes X & XII, demarcated village lands,
                  donated land for Nyubu Nyvgam Yerko (Arunachal’s first indigenous Gurukul), and
                  introduced hygienic community sanitation and piggery management.
                </p>
              </div>
              <div className="lg:col-span-6">
                <EditorialImage
                  src={ASSETS.landscapes.communityHallOverlook}
                  alt="Rang Community Hall overlooking Seppa Township"
                  imgClassName="w-full h-72 object-cover rounded-sm border border-[#DED4BD]"
                  caption="Rang Community Hall overlooking Seppa Township and the East Kameng hills."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {INFRASTRUCTURE_MILESTONES.map((item) => (
                <div
                  key={item.year + item.title}
                  className="bg-[#FDFBF6] border border-[#E2D9C4] rounded-sm p-6 space-y-2"
                >
                  <p className="font-mono text-xs font-semibold text-[#B88A3E] tabular-nums">
                    {item.year}
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#143A28]">{item.title}</h3>
                  <p className="text-sm text-[#414742] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
