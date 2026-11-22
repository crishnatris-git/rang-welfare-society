import type { SearchDocument } from '../utils/archiveLogic';
import {
  NINE_CLANS,
  RESPECTED_FIGURES_EARLIER_TIMES,
  LANDSCAPE_GAZETTEER,
  HISTORICAL_AGREEMENTS,
} from './rangEncyclopedia';
import {
  UNIFIED_TIMELINE,
  ROLL_OF_HONOUR,
  TWO_PILLARS,
  PEOPLE_IN_SERVICE,
} from './heritageData';
import {
  VOICE_ARTICLES,
  VOICE_POEMS,
  NYOKUM_YULLO_FOLKTALE,
  NYISHI_RIDDLES,
} from './communityVoicesData';
import {
  SHG_PROFILES,
  VISION_2047,
  OFFICIAL_PUBLICATIONS,
  STATIC_NEWS_ARTICLES,
} from './communityAndVisionData';
import { ASM_GPC_BOARD, OFFICIAL_MESSAGES } from './societyData';

export function buildStaticSearchIndex(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  for (const clan of NINE_CLANS) {
    docs.push({
      id: `clan-${clan.slug}`,
      title: `${clan.name} Clan — ${clan.symbolTitle}`,
      subtitle: `Settled from ${clan.originVillage} · Ancestors: ${clan.foundingAncestors}`,
      excerpt: `${clan.symbolDescription} ${clan.monolithMeaning}`,
      category: 'Clans',
      route: `/rang/clans/${clan.slug}`,
      keywords: [
        clan.name,
        clan.alternateSpelling || '',
        clan.foundingAncestors,
        clan.originVillage,
        clan.symbolTitle,
        ...clan.notableReferences,
      ],
    });
  }

  for (const article of VOICE_ARTICLES) {
    docs.push({
      id: `article-${article.slug}`,
      title: article.title,
      subtitle: `By ${article.author}${article.authorCredential ? ` · ${article.authorCredential}` : ''}`,
      excerpt: article.excerpt,
      category: 'Articles',
      route: `/voices/${article.slug}`,
      keywords: [article.author, article.category, article.title],
    });
  }

  for (const poem of VOICE_POEMS) {
    docs.push({
      id: `poem-${poem.slug}`,
      title: poem.subtitle ? `${poem.title}: ${poem.subtitle}` : poem.title,
      subtitle: `Poem by ${poem.author}`,
      excerpt: poem.stanzas[0]?.join(' ') || '',
      category: 'Poems',
      route: '/voices/poems',
      keywords: [poem.author, poem.title, 'poem', 'poetry'],
    });
  }

  docs.push({
    id: 'folktale-nyokum-yullo',
    title: `${NYOKUM_YULLO_FOLKTALE.title} — ${NYOKUM_YULLO_FOLKTALE.subtitle}`,
    subtitle: NYOKUM_YULLO_FOLKTALE.author,
    excerpt: NYOKUM_YULLO_FOLKTALE.paragraphs[0],
    category: 'Folktales',
    route: '/voices/folktales',
    keywords: ['Ane Donyi', 'Abo Tani', 'Nyokum Yullo', 'Jadu Dawe', 'Myoba', 'Myori', 'Hamma Tadda'],
  });

  docs.push({
    id: 'creativity-riddles',
    title: 'Niitam / Nyishi Riddles & Breath Holding Reciting Competition',
    subtitle: 'Compiled by Longpa Kocho · 13 Traditional Riddles & Balung-Balung Recitation',
    excerpt: NYISHI_RIDDLES.slice(0, 3)
      .map((r) => `${r.nyishi} (${r.englishAnswer})`)
      .join(' · '),
    category: 'Folktales',
    route: '/voices/creativity',
    keywords: ['Niitam', 'riddles', 'Longpa Kocho', 'Balung-Balung', 'breath holding', 'Nyishi'],
  });

  for (const item of UNIFIED_TIMELINE) {
    docs.push({
      id: item.id,
      title: item.title,
      subtitle: `${item.year} · ${item.period} · ${item.category}`,
      excerpt: item.description,
      category: 'Historical Milestones',
      route: '/heritage/25-years',
      year: item.year,
      keywords: [item.year, item.period, item.category, item.leadership || ''],
    });
  }

  for (const ag of HISTORICAL_AGREEMENTS) {
    docs.push({
      id: ag.id,
      title: ag.title,
      subtitle: `${ag.period} · ${ag.subtitle}`,
      excerpt: ag.paragraphs[0],
      category: 'Historical Milestones',
      route: '/heritage/agreements',
      year: ag.period,
      keywords: ['Lungte-Dapo', 'Myora', 'Loffa', 'Kapuk Myodi', 'Sange tree', 'Mithun'],
    });
  }

  docs.push({
    id: 'two-pillars-mama-tado',
    title: `${TWO_PILLARS.title}: Lt. Mama Kocho & Lt. Tado Tamar`,
    subtitle: 'Silver Jubilee Sports & Cultural Dedication',
    excerpt: TWO_PILLARS.intro[0],
    category: 'People & Pioneers',
    route: '/people/two-pillars',
    keywords: ['Mama Kocho', 'Tado Tamar', 'RVWC', 'RLWA', 'Sports', 'Volleyball', 'Cultural Programme', 'Paka Kocho', 'Fedang Tamar'],
  });

  docs.push({
    id: 'people-in-service-55',
    title: PEOPLE_IN_SERVICE.heading,
    subtitle: PEOPLE_IN_SERVICE.navSubtitle,
    excerpt: PEOPLE_IN_SERVICE.intro,
    category: 'People & Pioneers',
    route: '/people/in-service',
    keywords: ['public service', 'government service', 'CCS Rules', 'Group A', 'Group B', 'Group C', 'Group D', '55 members', 'NEHHDC', 'women'],
  });

  for (const entry of ROLL_OF_HONOUR) {
    docs.push({
      id: `first-${entry.milestone.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: `First in Rang: ${entry.milestone}`,
      subtitle: entry.pioneers,
      excerpt: `Recorded in the Rang Silver Jubilee Roll of Honour: ${entry.pioneers}.`,
      category: 'People & Pioneers',
      route: '/people/firsts',
      keywords: [entry.milestone, entry.pioneers, 'first', 'pioneer'],
    });
  }

  for (const asm of ASM_GPC_BOARD) {
    docs.push({
      id: `asm-${asm.slNo}`,
      title: asm.name,
      subtitle: `${asm.role} (${asm.from}–${asm.to})`,
      excerpt: asm.note || `Served Rang Village as ${asm.role} from ${asm.from} to ${asm.to}.`,
      category: 'People & Pioneers',
      route: '/people',
      year: `${asm.from}–${asm.to}`,
      keywords: [asm.name, asm.role, asm.from, asm.to, 'ASM', 'GPC', 'Panchayat'],
    });
  }

  docs.push({
    id: 'elders-20-respected',
    title: '20 Respected Figures of Earlier Times',
    subtitle: 'Village Register of Revered Ancestral Elders',
    excerpt: RESPECTED_FIGURES_EARLIER_TIMES.map((e) => e.name).join(', '),
    category: 'People & Pioneers',
    route: '/rang',
    keywords: RESPECTED_FIGURES_EARLIER_TIMES.map((e) => e.name),
  });

  for (const msg of OFFICIAL_MESSAGES) {
    docs.push({
      id: `msg-${msg.id}`,
      title: `Official Message — ${msg.senderName}`,
      subtitle: `${msg.designation} · ${msg.constituencyOrOffice}`,
      excerpt: msg.paragraphs[0] || '',
      category: 'News & Publications',
      route: '/society/messages',
      keywords: [msg.senderName, msg.designation, 'message', 'Silver Jubilee'],
    });
  }

  docs.push({
    id: 'landscape-kameng',
    title: 'Places Along the Kameng River (18 Named Sites)',
    subtitle: 'South to North Traditional Geographic Register',
    excerpt: LANDSCAPE_GAZETTEER.kamengRiverPlaces.join(', '),
    category: 'Landscape & Sites',
    route: '/rang/landscape',
    keywords: LANDSCAPE_GAZETTEER.kamengRiverPlaces,
  });

  docs.push({
    id: 'landscape-streams',
    title: 'Streams of Rang Village (15 Named Streams)',
    subtitle: 'Traditional Hydrological Gazetteer',
    excerpt: LANDSCAPE_GAZETTEER.streams.join(', '),
    category: 'Landscape & Sites',
    route: '/rang/landscape',
    keywords: LANDSCAPE_GAZETTEER.streams,
  });

  docs.push({
    id: 'landscape-myoko',
    title: 'Important Places & Myoko Sites (37 Sites)',
    subtitle: 'Sacred & Cultural Geography of Rang',
    excerpt: LANDSCAPE_GAZETTEER.myokoSites.join(', '),
    category: 'Landscape & Sites',
    route: '/rang/landscape',
    keywords: LANDSCAPE_GAZETTEER.myokoSites,
  });

  docs.push({
    id: 'landscape-myodi',
    title: 'Places Towards the Mountain — Myodi (11 Sites)',
    subtitle: 'Highland Geography of Rang Village',
    excerpt: LANDSCAPE_GAZETTEER.mountainPlaces.join(', '),
    category: 'Landscape & Sites',
    route: '/rang/landscape',
    keywords: LANDSCAPE_GAZETTEER.mountainPlaces,
  });

  for (const mission of VISION_2047.missions) {
    docs.push({
      id: `vision-${mission.id}`,
      title: `Vision 2047 Mission: ${mission.name}`,
      subtitle: `${mission.focus} · Pillar: ${mission.pillar}`,
      excerpt: mission.flagship,
      category: 'Vision 2047',
      route: '/vision-2047',
      year: '2026–2047',
      keywords: [mission.name, mission.focus, mission.flagship, 'Vision 2047', 'Viksit Bharat'],
    });
  }

  for (const shg of SHG_PROFILES) {
    docs.push({
      id: `shg-${shg.id}`,
      title: shg.name,
      subtitle: `${shg.attireColour} · ${shg.affiliation}`,
      excerpt: shg.description,
      category: 'Community Institutions',
      route: '/community/shg',
      keywords: [shg.name, shg.president || '', 'SHG', 'ArSLM', 'PLF', ...shg.livelihoodActivities],
    });
  }

  docs.push({
    id: 'inst-helping-hand',
    title: 'Rang Helping Hand: First to Arrive, Last to Claim Credit',
    subtitle: 'Seppa-Based Young Professionals Standing with Rang in Crisis',
    excerpt:
      'Educated, career-building friends from Rang based at Seppa who step in immediately whenever emergency or distress touches any family of Rang Village.',
    category: 'Community Institutions',
    route: '/community/helping-hand',
    keywords: ['Rang Helping Hand', 'Seppa', 'emergency', 'professionals', 'youth'],
  });

  for (const pub of OFFICIAL_PUBLICATIONS.filter((p) => p.id !== 'pub-master-manuscript')) {
    docs.push({
      id: pub.id,
      title: pub.title,
      subtitle: `${pub.year} · ${pub.pages}`,
      excerpt: pub.description,
      category: 'News & Publications',
      route: '/media/publications',
      year: pub.year,
      keywords: [pub.title, pub.category, 'PDF', 'souvenir', 'download'],
    });
  }

  for (const news of STATIC_NEWS_ARTICLES) {
    docs.push({
      id: news.id,
      title: news.title,
      subtitle: `${news.category}${news.location ? ` · ${news.location}` : ''}`,
      excerpt: news.summary,
      category: 'News & Publications',
      route: `/media/newsroom/${news.slug}`,
      keywords: [news.title, news.category, news.location || '', 'news', 'volleyball', 'WAYO', 'Watte'],
    });
  }

  return docs;
}
