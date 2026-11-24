import { ASSETS } from './assets';
import type { TimelineItem } from '../utils/archiveLogic';

export interface RwsPeriodActivity {
  slNo: string;
  title: string;
  detail: string;
  category: TimelineItem['category'];
}

export interface RwsServicePeriod {
  id: string;
  range: string;
  title: string;
  leaders: string;
  summary: string;
  intro: string;
  landmarkHeading: string;
  landmarkBody: string;
  activities: RwsPeriodActivity[];
  photos: { url: string; caption: string }[];
}

export const RWS_SERVICE_PERIODS: RwsServicePeriod[] = [
  {
    id: '1991-2013',
    range: '1991–2013',
    title: 'RVWC 1991–2013: The Roots',
    leaders: 'Sh. Rafe Dawe Rang, Lt. Mama Kocho and Lt. Tado Tamar Rang',
    summary: 'A welfare committee, a pact with Loffa, and a youth force that enforced the bans.',
    intro:
      'In the late 1980s and early 1990s, as Seppa grew into the district headquarters, the forests and streams around Rang were heavily exploited. Forest produce ran short, animals and birds were shot, and fish were killed with dynamite. Rang chose to act. Its first committee was formed in 1993 at the Rang Saam footbridge, and the river of this section begins there.',
    landmarkHeading: 'The Formation and Growth, 1991–2013',
    landmarkBody:
      'The Rang Village Welfare Committee was formed in 1993 under Chairman Rafe Dawe Rang, banning jungle cutting, hunting and forest-produce collection, and Lungte-Dapo with Loffa Village. Reconstituted in 1997 with welfare duties, it gained a youth enforcement force in 2000. Formal record-keeping began in 2001, its official functioning year.',
    activities: [
      {
        slNo: '1993',
        title: 'Formation of Rang Village Welfare Committee (RVWC)',
        detail:
          'Formed with Sh. Rafe Dawe Rang as Chairman and the late Tado Tamar Rang as Secretary, sealed by the Sori-Langdi ritual and the sacrifice of a Mithun. It banned jungle cutting, hunting and poaching, and the collection of forest produce, vegetables and firewood within Rang territory.',
        category: 'Environment',
      },
      {
        slNo: '1993',
        title: 'Lungte-Dapo Pact with Neighboring Loffa Village',
        detail:
          'A promise to respect each other’s territory, settle disputes amicably and protect shared resources. Eight Mithuns were exchanged, four from each village.',
        category: 'Governance',
      },
      {
        slNo: '1997',
        title: 'Committee Reconstituted for Community Welfare',
        detail:
          'Reconstituted under the late Mama Kocho and widened its work to welfare: helping the sick reach hospital, taking children to school and securing admission, and helping villagers obtain ration cards and ST certificates.',
        category: 'Social Welfare',
      },
      {
        slNo: '2000',
        title: 'All Rang Youth Welfare Society Formed',
        detail:
          'The youth force was formed with Sh. Kaya Rang as President and Sh. Longpa Kocho Rang as Secretary. It enforced the bans: offenders were sent to jail, and seized forest produce and carcasses were taken back.',
        category: 'Community Participation',
      },
      {
        slNo: '2001',
        title: 'Formal Record-Keeping Begins',
        detail:
          'Record-keeping began. The Society recognizes 2001 as its official year of functioning.',
        category: 'Governance',
      },
    ],
    photos: [
      { url: ASSETS.leaders.rafeDawe, caption: 'Sh. Rafe Dawe Rang — Founding Chairman, RVWC (1993)' },
      { url: ASSETS.leaders.tadoTamar, caption: 'Lt. Tado Tamar — Founding Secretary, RVWC (1993/94)' },
      { url: ASSETS.leaders.mamaKocho, caption: 'Lt. Mama Kocho — Reconstituted Chairman, RVWC (1997)' },
    ],
  },
  {
    id: '2013-2016',
    range: '2013–2016',
    title: 'RWS 2013–2016: Laying the Foundations',
    leaders: 'Sh. Pai Dawe Rang (Chairman) & Sh. Sacha Pimong Rang (Secretary)',
    summary: 'Written bye-laws, a society fund, a village road, and an ASM selected without election route.',
    intro:
      'These years took Rang from custom to constitution. Under Sh. Pai Dawe, the village’s first graduate and engineer, the Committee became the Rang Welfare Society, with written bye-laws, a regular fund, protected resources and the groundwork for roads that would link Rang to the wider world.',
    landmarkHeading: 'From Custom to Constitution · The First Written Bye-Laws',
    landmarkBody:
      'In 2013, on the initiative of Sh. Pai Dawe, the Rang Village Welfare Committee was renamed the Rang Welfare Society and given written bye-laws for the first time. The bye-laws set out nine aims, among them fraternity and a sense of belonging, awareness of changing development, preventing division by religion, region, sect, clan or creed, scholarships, preserving and documenting the village’s cultural heritage, and humanitarian service to the needy.',
    activities: [
      {
        slNo: '01',
        title: 'Rang Welfare Society (RWS) Stamped',
        detail:
          'The erstwhile Rang Village Welfare Committee was constituted as the forward-looking Rang Welfare Society with written Bye-laws and defined aims & objectives.',
        category: 'Governance',
      },
      {
        slNo: '02',
        title: 'Consensus Over Contest: Langpa Kocho’s Legacy of Unity and Service',
        detail:
          'Under Anchal Samiti Member Langpa Kocho, the village began choosing Panchayat members by consensus, fostering unity; he was named East Kameng’s Best Performing ASM in 2018.',
        category: 'Governance',
      },
      {
        slNo: '03',
        title: 'A Society Fund',
        detail:
          '0.5% of every Government project carried out in Rang village was set aside as a society fund.',
        category: 'Governance',
      },
      {
        slNo: '04',
        title: 'The Pacha Morang Road',
        detail:
          'An approach road to the Pacha Morang quarry was built in collaboration with the Pacha Morang Development Committee.',
        category: 'Infrastructure',
      },
      {
        slNo: '05',
        title: 'Protecting Rang’s Resources',
        detail:
          'Commercial timber felling was banned and rental-basis cultivation by outsiders was stopped. Fishing rights on the Kameng River were tendered for ₹10,000.',
        category: 'Environment',
      },
      {
        slNo: '06',
        title: 'A Community Code',
        detail:
          'A community code on marriage within the village was adopted. It discouraged matrimonial relationships within the members to foster brotherhood amongst the villagers.',
        category: 'Social Welfare',
      },
      {
        slNo: '07',
        title: 'Celebrating Our Own',
        detail:
          'Academic toppers and other achievers were felicitated, and the RWS flag song was written and composed.',
        category: 'Education',
      },
      {
        slNo: '08',
        title: 'A Youth Wing (RYWA)',
        detail:
          'The youth force was renamed the Rang Youth Welfare Association, with Sh. Apung Pimong as President and Sh. Biman Dawe Rang as Secretary, as the Society’s enforcing arm.',
        category: 'Community Participation',
      },
    ],
    photos: [
      { url: ASSETS.periods.conf2013A, caption: '1st General Conference of Rang Welfare Society, October 2013 — Felicitation' },
      { url: ASSETS.periods.conf2013B, caption: '1st General Conference of RWS at Rang Village, October 2013' },
      { url: ASSETS.periods.conf2013C, caption: 'Cultural Programme during the 1st General Conference of RWS, October 2013' },
    ],
  },
  {
    id: '2016-2020',
    range: '2016–2020',
    title: 'RWS 2016–2020: Building Systems',
    leaders: 'Er. Mara Kocho Rang (Chairman) & Sh. Kaya Rang (Secretary)',
    summary: 'Land demarcated, quality committees formed, coaching begun.',
    intro:
      'This term turned good intentions into systems: land marked on the ground, quality watched by committees, and young Rang students backed with coaching for competitive examinations.',
    landmarkHeading: 'Demarcating Community Land & Quality Monitoring',
    landmarkBody:
      'The Society initiated and carried out the demarcation of Rang’s community (village) land. It was the first step in a process that reached its completion with the official mapping of the whole village in 2023–26. Work quality monitoring was established for the PMGSY Road and CMAGY Model Village.',
    activities: [
      {
        slNo: '01',
        title: 'Demarcation of Community Land',
        detail:
          'Successfully initiated and carried out the demarcation of community (village) land, thereby preventing disputes amongst the villagers.',
        category: 'Governance',
      },
      {
        slNo: '02',
        title: 'Backing the Young',
        detail:
          'APSSB coaching provided to Rang students for competitive examinations, and CBSE toppers and achievers were felicitated every year.',
        category: 'Education',
      },
      {
        slNo: '03',
        title: 'Quality Monitoring Committee for Rang PMGSY Road',
        detail:
          'Constituted a Quality Monitoring Committee to ensure proper implementation and maintenance of quality standards in the Rang PMGSY Road project. The road was later completed as a model PMGSY Road in East Kameng.',
        category: 'Infrastructure',
      },
      {
        slNo: '04',
        title: 'Quality Monitoring Committee for Rang Model Village',
        detail:
          'Constituted a Quality Monitoring Committee to ensure the proper and quality implementation of the Rang Model Village project under CMAGY.',
        category: 'Infrastructure',
      },
      {
        slNo: '05',
        title: 'Construction Levy for Society Fund',
        detail:
          '1% levy on construction works by RWS members and 3% on works by outsiders was introduced for contractual work carried out in the village area to fund the society.',
        category: 'Governance',
      },
      {
        slNo: '06',
        title: 'One Rang, One Family — Clan-Wise Activities',
        detail:
          'Encouraged and organised clan-wise activities, such as picnics, hiking and other recreational programmes, to promote unity, cooperation and a sense of brotherhood among clan members.',
        category: 'Community Participation',
      },
    ],
    photos: [
      { url: ASSETS.periods.work2016Excavator, caption: 'PMGSY Road earthwork reaching Rang Village' },
      { url: ASSETS.periods.work2016Road, caption: 'Completed model PMGSY Road connecting Rang to Seppa' },
      { url: ASSETS.periods.work2016RiverClean, caption: 'Rang Welfare Society participating in River Cleaning Mission Seppa' },
      { url: ASSETS.periods.work2016FieldSurvey, caption: 'Community land demarcation and field inspection (2016–2020)' },
      { url: ASSETS.periods.work2016Hall, caption: 'Rang Community Hall overlooking Seppa valley and East Kameng hills' },
    ],
  },
  {
    id: '2020-2023',
    range: '2020–2023',
    title: 'RWS 2020–2023: Steady Hands',
    leaders: 'Sh. Rakesh Dawe Rang (Chairman) & Sh. Gorbe Rang (Secretary)',
    summary: 'Coaching for Classes X and XII, cleaner public spaces, Quota for Rang Children in NNY.',
    intro:
      'A term of practical, steady work: preparing students for their examinations, keeping public spaces clean, and keeping the door open for Rang children at NNY Rang.',
    landmarkHeading: 'Coaching for Classes X and XII',
    landmarkBody:
      'The Society started coaching programmes for Class X and Class XII students of the Rang community, to support their academic performance and prepare them for their examinations.',
    activities: [
      {
        slNo: '01',
        title: 'A Yearly Request to NNY',
        detail:
          'An annual memorandum was submitted to Nyubu Nyvgam Yerko (NNY), requesting admission opportunities for Rang students at NNY Rang.',
        category: 'Education',
      },
      {
        slNo: '02',
        title: 'A Cleaner Village',
        detail:
          'Large metal dustbins were installed at Rang Viewpoint, Nyele Langpa and Government Primary School, Rang, for solid waste management.',
        category: 'Environment',
      },
      {
        slNo: '03',
        title: 'A Hygienic Piggery',
        detail:
          'Village pigs were shifted to a designated piggery, for better management and hygiene.',
        category: 'Social Welfare',
      },
      {
        slNo: '04',
        title: 'Where the Dustbins Went',
        detail:
          'Three key public sites were covered in the village cleanliness drive: Rang Viewpoint, Nyele Langpa, and Government Primary School, Rang.',
        category: 'Environment',
      },
    ],
    photos: [
      { url: ASSETS.periods.work2020RoadService, caption: 'Community road maintenance and social work (2020–2023)' },
      { url: ASSETS.periods.work2020WelcomeGate, caption: 'Welcome to Rang gateway with community members' },
      { url: ASSETS.periods.work2020EldersGroup, caption: 'Village elders and leadership gathering at Rang' },
      { url: ASSETS.periods.work2020CommunityMeet, caption: 'RWS community meeting and collective deliberation' },
    ],
  },
  {
    id: '2023-2026',
    range: '2023–2026',
    title: 'RWS 2023–2026: Securing Rang’s Future',
    leaders: 'Er. Logo Rang (Chairman) & Sh. Longpa Kocho (Secretary)',
    summary: 'The village mapped, every household registered, boundaries and forests protected.',
    intro:
      'The Silver Jubilee term gave Rang its clearest identity on paper: a village mapped, counted and protected, with its customary leadership strengthened for the next generation.',
    landmarkHeading: 'The Official Mapping of Rang Village',
    landmarkBody:
      'The Society registered every village household to build an updated registry, and defended Rang’s traditional boundaries in the Kapuk/Lalampu Modi area. It banned hunting and destructive fishing, set a two-month deadline for removing outsider mithuns, felicitated student achievers, selected customary leaders unanimously, and ran a transparent Anganwadi selection.',
    activities: [
      {
        slNo: '01',
        title: 'Every Household Counted',
        detail:
          'A door-to-door drive registered all resident households, creating an updated registry for village administration and social planning.',
        category: 'Governance',
      },
      {
        slNo: '02',
        title: 'Safeguarding Boundaries',
        detail:
          'The Society firmly defended Rang’s traditional boundaries and rights in the Kapuk/Lalampu Modi area.',
        category: 'Governance',
      },
      {
        slNo: '03',
        title: 'Hunting and Destructive Fishing Stopped',
        detail:
          'Notices to colony chairmen and secretaries, neighboring welfare bodies and individuals called for a complete stop to hunting and destructive fishing.',
        category: 'Environment',
      },
      {
        slNo: '04',
        title: 'Protecting Our Pastures',
        detail:
          'RWS Bye-Laws gave non-resident owners a two-month window to remove outsider Mithuns, protecting local flora, fauna and grazing land.',
        category: 'Environment',
      },
      {
        slNo: '05',
        title: 'Honoring Students',
        detail:
          'Toppers and achievers were felicitated every year, and annual applications went to NNY Rang for student support.',
        category: 'Education',
      },
      {
        slNo: '06',
        title: 'Customary Leadership',
        detail:
          'Shri Tawa Kocho Rang was unanimously selected Second Head Gaon Burah, with Smt. Migung Kocho Rang and Smt. Meku Tamar Rang as Gaon Buris.',
        category: 'Governance',
      },
      {
        slNo: '07',
        title: 'A Transparent Selection',
        detail:
          'A Search Committee oversaw the selection for the vacant village Anganwadi post; Smt. Wari Lichi Rang was selected.',
        category: 'Social Welfare',
      },
    ],
    photos: [
      { url: ASSETS.periods.work2023Volleyball, caption: 'Rang youth team — Champion 2025 Volleyball tournament' },
      { url: ASSETS.periods.work2023Felicitation, caption: 'Annual academic achievers felicitation ceremony (2023–2026)' },
      { url: ASSETS.periods.work2023Procession, caption: 'Community traditional attire procession and gathering' },
      { url: ASSETS.periods.work2023Gathering, caption: 'RWS collective community assembly at Rang Village' },
      { url: ASSETS.periods.work2023CommunityHall, caption: 'Rang Welfare Society Community Hall gathering' },
    ],
  },
];

export const UNIFIED_TIMELINE: TimelineItem[] = [
  {
    id: 'tl-1983',
    year: '1983',
    sortYear: 1983,
    title: 'Rang Primary School Established',
    description:
      'Founded through the efforts of late Larta Dawe Rang and first ASM Jardang Dawe Rang on donated land; shaped generations of Rang scholars.',
    period: '1991–2013',
    category: 'Education',
    leadership: 'Larta Dawe Rang & Jardang Dawe Rang',
  },
  {
    id: 'tl-1989',
    year: '1989–1992',
    sortYear: 1989,
    title: 'Heavy Exploitation of Forests & Streams Around Rang',
    description:
      'Rapid growth of Seppa Township brought intense pressure on Rang’s forests, wildlife, and streams through timber cutting, hunting, and dynamite fishing.',
    period: '1991–2013',
    category: 'Environment',
  },
  {
    id: 'tl-1991',
    year: '1991',
    sortYear: 1991,
    title: 'Oral Memory of Society’s Earliest Conception',
    description:
      'Oral community memory traces the earliest collective conception of the Rang Village Welfare Committee to 1991.',
    period: '1991–2013',
    category: 'Governance',
    leadership: 'Sh. Rafe Dawe Rang, Lt. Tado Tamar, Lt. Mama Kocho',
  },
  {
    id: 'tl-1993',
    year: '1993',
    sortYear: 1993,
    title: 'Rang Village Welfare Committee Formed at Rang Saam',
    description:
      'Formed at the Rang Saam hanging footbridge (now Tari Bridge) with Sh. Rafe Dawe Rang (Chairman) and Lt. Tado Tamar Rang (Secretary), sealed by Sori-Langdi ritual and Mithun sacrifice.',
    period: '1991–2013',
    category: 'Environment',
    leadership: 'Sh. Rafe Dawe Rang & Lt. Tado Tamar',
  },
  {
    id: 'tl-1995',
    year: '1993 / 1994–1995',
    sortYear: 1995,
    title: 'Lungte-Dapo Pact with Neighboring Loffa Village',
    description:
      'Conference between Rang and Loffa sealed by exchange of eight Mithuns (four from each village) to respect boundaries, settle disputes amicably, and protect shared natural resources.',
    period: '1991–2013',
    category: 'Governance',
    leadership: 'Sh. Rafe Dawe Rang, Lt. Tado Tamar & Village Elders',
  },
  {
    id: 'tl-1997',
    year: '1997',
    sortYear: 1997,
    title: 'Committee Reconstituted for Day-to-Day Welfare',
    description:
      'Reconstituted under Chairman Lt. Mama Kocho with Secretary Lt. Tado Tamar; widened mission to hospital access, school admissions, ration cards, and ST certificates.',
    period: '1991–2013',
    category: 'Social Welfare',
    leadership: 'Lt. Mama Kocho & Lt. Tado Tamar',
  },
  {
    id: 'tl-2000',
    year: '2000',
    sortYear: 2000,
    title: 'All Rang Youth Welfare Society (ARYWS) Formed',
    description:
      'Redirected by elders into an environmental enforcement force led by Sh. Kaya Rang (President) and Sh. Longpa Kocho Rang (Secretary), stopping dynamite fishing and illegal sand/forest extraction.',
    period: '1991–2013',
    category: 'Community Participation',
    leadership: 'Sh. Kaya Rang & Sh. Longpa Kocho Rang',
  },
  {
    id: 'tl-2001',
    year: '2001',
    sortYear: 2001,
    title: 'Formal Record-Keeping Begins — Official Functioning Year',
    description:
      'RVWC and ARYWS began systematic written record-keeping and carried out extensive social service; recognized as RWS’s official functioning year for the 2026 Silver Jubilee.',
    period: '1991–2013',
    category: 'Governance',
  },
  {
    id: 'tl-2004',
    year: '2004',
    sortYear: 2004,
    title: 'RWS Registration Noted under Pai Dawe Rang',
    description:
      'Chapter 4 (§7.2) records official registration of Rang Welfare Society in 2004 under the chairmanship of Pai Dawe Rang.',
    period: '1991–2013',
    category: 'Governance',
    leadership: 'Er. Pai Dawe Rang',
  },
  {
    id: 'tl-2013',
    year: 'October 2013',
    sortYear: 2013,
    title: 'Renamed Rang Welfare Society with First Written Bye-Laws',
    description:
      '1st General Conference at Rang adopted nine written constitutional objectives, 0.5% Society Fund, RWS Flag Song, Community Marriage Code, Women Wing, and renamed RYWA.',
    period: '2013–2016',
    category: 'Governance',
    leadership: 'Er. Pai Dawe Rang & Sh. Sacha Pimong Rang',
  },
  {
    id: 'tl-2014',
    year: '2013–2016',
    sortYear: 2014,
    title: 'Pacha Morang Quarry Approach Road & Resource Tender',
    description:
      'Built Pacha Morang approach road, banned commercial timber felling and outsider rental cultivation, and tendered Kameng fishing rights for ₹10,000.',
    period: '2013–2016',
    category: 'Infrastructure',
    leadership: 'Er. Pai Dawe Rang & Sh. Sacha Pimong Rang',
  },
  {
    id: 'tl-2017',
    year: '23 May – 31 Aug 2017',
    sortYear: 2017,
    title: 'PMGSY Road Reaches Rang — First Vehicle Arrives',
    description:
      'After 70 years of isolation since Independence, PMGSY road construction began on 23 May 2017 and the first vehicle reached Rang on 31 August 2017, monitored by RWS Quality Monitoring Committee.',
    period: '2016–2020',
    category: 'Infrastructure',
    leadership: 'Er. Mara Kocho & Sh. Kaya Rang',
  },
  {
    id: 'tl-2018',
    year: '2018',
    sortYear: 2018,
    title: 'Best Performing ASM Award & Rang Danne SHG Formed',
    description:
      'Sh. Langpa Kocho awarded Best Performing ASM of East Kameng for consensus-based Panchayat leadership; Rang Danne SHG established on 19 November 2018.',
    period: '2016–2020',
    category: 'Governance',
    leadership: 'Sh. Langpa Kocho · Smti. Tina Mein Reng',
  },
  {
    id: 'tl-2019',
    year: '2016–2020',
    sortYear: 2019,
    title: 'Community Land Demarcation, APSSB Coaching & Construction Levy',
    description:
      'Demarcated village land to prevent disputes, launched APSSB competitive exam coaching, constituted CMAGY Model Village QMC, introduced 1%/3% construction levy, and organized clan-wise unity activities.',
    period: '2016–2020',
    category: 'Community Participation',
    leadership: 'Er. Mara Kocho & Sh. Kaya Rang',
  },
  {
    id: 'tl-2020',
    year: '2020 / 20 Mar 2021',
    sortYear: 2020,
    title: 'Nyubu Nyvgam Yerko (Gurukul) Established at Rang',
    description:
      'Arunachal Pradesh’s first indigenous Gurukul established on land donated free of cost by Er. Pai Dawe; inaugurated by CM Shri Pema Khandu on 20 March 2021.',
    period: '2020–2023',
    category: 'Education',
    leadership: 'Er. Pai Dawe & RWS Community',
  },
  {
    id: 'tl-2021',
    year: '2020–2023',
    sortYear: 2021,
    title: 'Classes X & XII Coaching, Cleanliness & Hygienic Piggery',
    description:
      'Launched Class X & XII board coaching, submitted annual NNY admission memoranda, installed metal dustbins at 3 key village sites, and shifted village pigs to a designated piggery.',
    period: '2020–2023',
    category: 'Social Welfare',
    leadership: 'Sh. Rakesh Dawe Rang & Sh. Gorbe Rang',
  },
  {
    id: 'tl-2024',
    year: '2023–2026',
    sortYear: 2024,
    title: 'Official Village Mapping, Household Registry & Boundary Defence',
    description:
      'Completed official village mapping and door-to-door household registry, defended Kapuk/Lalampu Modi boundaries, enforced hunting/fishing bans & outsider Mithun removal, and conducted transparent Anganwadi selection.',
    period: '2023–2026',
    category: 'Governance',
    leadership: 'Er. Logo Rang & Sh. Longpa Kocho',
  },
  {
    id: 'tl-2025',
    year: '2025',
    sortYear: 2025,
    title: 'Best GPC Award & National Institutional Leadership',
    description:
      'Sri Garbe Lichi Rang awarded Best Gram Panchayat Chairperson of East Kameng District; Er. Mara Kocho serves as Managing Director, NEHHDC (Ministry of DoNER).',
    period: '2023–2026',
    category: 'Governance',
    leadership: 'Sri Garbe Lichi Rang · Er. Mara Kocho',
  },
  {
    id: 'tl-2026',
    year: '18–19 November 2026',
    sortYear: 2026,
    title: 'RWS Silver Jubilee Celebration, Monolith & Rang Vision 2047',
    description:
      'Commemorating 25 years of official service with the nine-faced Silver Jubilee Monolith, Souvenir "Rang — The 9 Colours", Sports & Cultural Dedication for Two Pillars, and adoption of Rang Vision 2047.',
    period: '2023–2026',
    category: 'Community Participation',
    leadership: 'Er. Logo Rang & Sh. Pacha Kocho (Organizing Chairman)',
  },
];

export const GENESIS_SECTIONS = [
  {
    heading: 'A village that learned to protect itself',
    paragraphs: [
      'Every institution has a founding story it tells at celebrations, and another, quieter one that explains why it was needed. The Rang Welfare Society, which marks its Silver Jubilee in 2026, has both. The first is about a village and its people finding a common purpose. The second is about a river valley, a changing district and a simple, stubborn idea: that what the land gives must be protected if it is to keep giving.',
      'In the old Nyishi world, villages were rivals as often as neighbours. Territorial claims, kidnapping and raids were part of the inter-village conflicts of the time, and captives taken in such wars were held as hostages, giving rise to the institutions of Slave System (Nyara and Pahne), which bear comparison with untouchability and slavery elsewhere in India. Rang was no exception. It suffered abductions more than once and was drawn into wars with other villages.',
      'Protection demanded organisation. Every village kept a council, the Nyele, which met at the Nyele-Langpa (General Meeting Place). The need to safeguard its people gave Rang something larger than a defence arrangement: the beginnings of a society, a way of deciding and acting together. As government institutions arrived and modernisation spread, raiding and kidnapping faded away. The habit of collective responsibility did not.',
    ],
  },
  {
    heading: 'A new threat arrives with the town',
    paragraphs: [
      'The next challenge came not from a rival village but from change. With Seppa established as the headquarters of East Kameng, people from rural areas moved into the town, in large numbers through the late 1980s and early 1990s. Villages near the headquarters felt the pressure first. Between 1989 and 1992, the natural resources around Rang were heavily exploited. Forest produce that had once been enough for the village ran short. Animals and birds were shot, and fish were killed by blasting with dynamite and by using bleaching powder and other means.',
      'By the early 1990s the villagers could see the shortage for themselves. The question was whether to watch the forests and streams empty out, or to act.',
    ],
  },
  {
    heading: '1993: Rang Village Welfare Committee',
    paragraphs: [
      'Rang chose to act. In 1993 the first committee in the village’s history, the Rang Village Welfare Committee, was formed at the foundation site of the hanging bridge known as Rang Saam (the Saam-Thong), now the site of the Tari Bridge, which was then the only footbridge between Seppa and New Seppa. It was a fitting place to begin: a crossing point between the old village and the new town.',
      'Sh. Rafe Dawe Rang was appointed as founding Chairman and the late Tado Tamar Rang founding Secretary. The appointment was sealed in the traditional way, through the ritual of Sori-Langdi, with the sacrifice of a Mithun, the Nyishi act that marks the start of a new mission.',
      'The Committee’s orders were firm. It banned the collection of forest produce, vegetables and firewood, the cutting of jungle, and all hunting and poaching within Rang territory. The prohibitions, by the account of the time, were enough to slow the destruction without the involvement of neighbouring villages.',
    ],
  },
  {
    heading: 'Lungte-Dapo: a promise between neighbors',
    paragraphs: [
      'Nature does not stop at a village boundary, and Rang understood this. In 1993 the Committee invited Loffa, its immediate neighbour, to join in banning the exploitation of natural resources. A conference between the two villages followed that year, sealed by the traditional pact of Lungte-Dapo: a promise to settle differences and disputes amicably, to respect each other’s territory, and to live together in peace and harmony.',
      'The pact was marked by an exchange of eight Mithuns, four from each village, first at Loffa and then at Rang, under the chairmanship of Sh. Rafe Dawe with the strong support of the then village stalwarts like Lt. Norbo Kocho, Fedang Tamar, Kadang Dawe, Taping Lichi, Misa Tamar, etc. Few moments in the Society’s history say as much about its character. Two villages that might once have measured themselves against each other chose to share the care of a common inheritance.',
    ],
  },
  {
    heading: 'Widening the circle',
    paragraphs: [
      'In 1997 the Committee was reconstituted, with the late Mama Kocho as Chairman and the late Tado Tamar Rang continuing as Secretary. Under this leadership the Committee’s purpose widened beyond the protection of resources to the day-to-day welfare of villagers. It helped the sick reach hospital and receive treatment, took children to school and secured their admission, and helped villagers obtain ration cards, ST certificates and other government documents from the offices that issue them. It continued to guard the natural resources that Rang and Loffa shared.',
      'This was the quiet work of a society: unglamorous, personal and often decisive in a family’s life. For many villagers, first-generation learners and first-time visitors to government offices among them, it meant someone to walk beside them.',
    ],
  },
  {
    heading: 'The Rang Youth',
    paragraphs: [
      'In 2000, Sh. Longpa Kocho Rang proposed a youth association with Sh. Kaya Rang. However, their idea of forming youth association was to take revenge collectively in the physical altercation with other village youth or clan rather than on any social cause as the Rang youth on many occasions had suffered from the blows of other youth without any retaliation. When they reached out to elders like Rafe Dawe Rang, Lt. Mama Kocho, Lt. Tado Tamar with the idea, they appreciated the idea of formation of Youth Force but not for physical altercations with other youths or clans rather for enforcing the bans and prohibition orders of the Committee as the Committee’s bans needed enforcing. The Committee welcomed the idea of a youth force to carry out its orders. Sh. Rafe Dawe Rang and the late Tado Tamar Rang personally appreciated it and encouraged them to form the group at once.',
      'The youth force was formally named the All Rang Youth Welfare Society (ARYWS), with Sh. Kaya Rang as founding President and Sh. Longpa Kocho Rang as Founding Secretary. During their tenure they enforced the bans with real effect. Offenders were sent to jail, among them people who killed fish in large numbers with dynamite, and those who took away sand and gravel. Firewood, forest produce, vegetables and hunted animal & bird carcasses taken in violation of the orders were seized and taken back. The village’s resources were protected, and the village noticed.',
    ],
  },
  {
    heading: 'Why 2001 is the year we count from',
    paragraphs: [
      'Visitors to the Silver Jubilee may ask why a Society whose roots go back to the early 1990s celebrates twenty-five years in 2026. The answer is honest and instructive. Oral memory places the Society’s establishment in 1991, but for most of that time both bodies worked without written bye-laws or records of their actions, a result of limited formal education in the village. It was in 2001 that the Rang Village Welfare Committee and the All Rang Youth Welfare Society began keeping records and did their most extensive social work. The Society therefore recognises 2001 as its official year of functioning, choosing the written record over the remembered one.',
    ],
  },
  {
    heading: '2013: RWS from custom to constitution',
    paragraphs: [
      'The next milestone came in 2013, under the initiative and leadership of Sh. Pai Dawe, the first graduate and engineer from the village. The Rang Village Welfare Committee was renamed the Rang Welfare Society (RWS) and, for the first time, given written bye-laws. Sh. Pai Dawe became Chairman and Sh. Sacha Pimong Rang Secretary of the reformed Society, serving from 2013 to 2016.',
      'In the same way, the All Rang Youth Welfare Society which represented the youth force of Rang was renamed to Rang Youth Welfare Association (RYWA) with Sh. Apung Pimong as President and Sh. Biman Dawe Rang as Secretary. They became the enforcing agent for the Rang Welfare Society.',
    ],
  },
  {
    heading: 'Looking forward',
    paragraphs: [
      'From a ritual at a footbridge to a written constitution, from enforcing bans to preserving songs and awarding merit, the Society’s journey has been long. Its constant has been a belief that a village prospers when its people, its land and its traditions are cared for together.',
      'Rang today is a village of nine clans, and its Silver Jubilee is a moment for all nine to take stock. The founders gave us a village that chose to protect its forests, its rivers and its neighbours. The task of this generation is to carry that inheritance into the decades ahead, with the same unity, the same discipline and a wider vision. Twenty-five years on, the work that began on the bank of the Rang Saam is still unfinished, and it still belongs to all of us.',
    ],
  },
];

export const GENESIS_MILESTONES_GLANCE = [
  { year: '1989–92', event: 'Heavy exploitation of natural resources around Rang' },
  {
    year: '1993',
    event: 'Rang Village Welfare Committee formed at Rang Saam; Rafe Dawe Rang (Chairman), Tado Tamar Rang (Secretary)',
  },
  { year: '1995', event: 'Lungte-Dapo pact with Loffa; eight Mithuns exchanged' },
  { year: '1997', event: 'Committee reconstituted under Mama Kocho; welfare services begin' },
  {
    year: '2000',
    event: 'Youth force formed as All Rang Youth Welfare Society; Kaya Rang (President), Longpa Kocho Rang (Secretary)',
  },
  { year: '2001', event: 'Record-keeping begins; recognised as the Society’s official year of functioning' },
  {
    year: '2013',
    event: 'Renamed Rang Welfare Society with written bye-laws; Pai Dawe (Chairman), Sacha Pimong Rang (Secretary) and Youth force as Rang Youth Welfare Association',
  },
  { year: '2026', event: 'Silver Jubilee' },
];

export const FIRSTS_NARRATIVE = {
  subtitle: 'Nine clans, many firsts, and the pioneers who made Rang what it is',
  intro: [
    'Every village begins as a footprint. Someone arrives first, clears a patch of ground, lights a hearth. Someone else is first to carry a slate to school, first to wear the badge of a Gaon Burah, first to stand up in a public meeting and speak for everyone. As the Rang Welfare Society completes twenty-five years, this magazine pauses to do something a community too rarely does: to name, with gratitude, the people who were first.',
    'The record that follows has been compiled by the Society’s Founders and Pioneers In-charge. It is short, and each line in it is a door into a life. Read together, the lines tell the story of a village that moved, within living memory, from the founding of its first households to a roster of graduates, gazetted officers and elected representatives.',
  ],
  categories: [
    {
      title: 'The First Priests',
      narrative:
        'Two roles anchored the early community: the one who speaks to the unseen and the one who keeps the peace among neighbors. The record honours Late Tade Doda Rang as the first male priest of Rang and Late Yatar Doda Rang as the first female priest, both from the Doda family. That Rang’s first spiritual guides included a woman, standing beside a man, says something about the community’s balance from the very beginning.',
    },
    {
      title: 'The First Gaon Burah / Buri',
      narrative:
        'The same pairing appears in the village’s first system of customary authority. Late Lalo Kocho Rang served as the first male Gaon Burah, the village headman who is the link between the community and the administration. Smti Mekap Dawe Rang is remembered as the first female Gaon Burah.',
    },
    {
      title: 'The First to School',
      narrative:
        'Then came the classroom, and with it a different kind of pioneering. Shri Gayo Kocho Rang, Smti Pacha Dawe Taku, Smti Mefe Dawe Natung and Smti Yadang Dawe Singhi are recorded as the first from Rang to attend school. Three of the four were girls, a fact worth pausing over.',
    },
    {
      title: 'The First to Pass Class X',
      narrative:
        'Each step up the ladder has its own names. Lt. Chabu Dawe Rang, Sh. Sacha Pimong Rang and Smt. Mefe Dawe Natung were the first to pass Class X.',
    },
    {
      title: 'The First to Pass Class XII & First Graduates',
      narrative:
        'Sh. Pai Dawe Rang, Sh. Mahara Rang and Smti Meram Dawe Gyadi were the first to pass Class XII. Sh. Pai Dawe Rang and Smt Meram Dawe Gyadi went on to become Rang’s first graduates.',
    },
    {
      title: 'The First Postgraduates',
      narrative: 'Sh. Rajesh Dawe Rang and Miss Sonia Dawe Rang became Rang’s first post-graduates.',
    },
    {
      title: 'The First Government Employees',
      narrative:
        'Education opened the road to public service. Late Nadang Pimong Rang and Smti Mefe Dawe Natung are recorded as the first from Rang to secure a government job.',
    },
    {
      title: 'The First to Attend SSB Training (Haflong)',
      narrative:
        'The village’s first brush with the uniformed services came through SSB training at Haflong, undertaken by five of its sons: Lt. Tage Dawe Rang, Lt. Dacho Dawe Rang, Lt. Tade Takung Rang, Sh. Fedang Tamar Rang and Lt. Ratung Doda Rang.',
    },
    {
      title: 'The First Gazetted Officers',
      narrative:
        'The ranks of gazetted officers were first entered by Er. Pai Dawe Rang and Smti Yakar Dawe Riang. Er. Pai Dawe Rang’s name will be familiar to every reader of these pages: he is also among the first from Rang to pass Class XII, one of its first two graduates, and the first Chairman of the Rang Welfare Society.',
    },
    {
      title: 'The First Gram Panchayat Leaders',
      narrative:
        'A village that educates its children will soon govern itself. Late Nadang Pimong Rang, already the village’s first government employee, became its first Gram member, serving during the period of Lt. Gamsang Rimo. Shri Jardang Dawe Rang and Smti Mechori Dawe Rang became the first Anchal Samity Members. Shri Sangkam Tamar Rang and Smti Padak Tamar Rang were Rang’s first Gram Chairpersons.',
    },
    {
      title: 'The First Anganwadi Pioneers',
      narrative:
        'Closer to the hearth, public service also took the form of care. Late Menam Dawe Lingfa was Rang’s first Anganwadi Worker, and Smti Paka Kocho Rang its first Anganwadi Helper, the first to take up the village’s work of caring for its youngest children.',
    },
    {
      title: 'The First Welfare Society, Youth Force & Documented RWS (1991–2013)',
      narrative:
        'Conceived in 1991 and operationalized in 1993 under Sh. Rafe Dawe, Lt. Tado Tamar, and later Mama Kocho, the Rang Village Welfare Committee arose to halt forest and river exploitation around Seppa. In 2000, the All Rang Youth Welfare Society (Kaya Rang, President; Longpa Kocho Rang, Secretary) enforced its bans. When the documented Rang Welfare Society was formed in 2013, Er. Pai Dawe Rang became its first Chairman, Shri Sacha Rang its first General Secretary, Smti Sueli Dawe Rang and Smti Sima Rang led the Women Wing, and Shri Kaya Rang and Shri Longpa Kocho Rang are honoured as first President and Secretary of the Rang Youth Welfare Association.',
    },
  ],
  closing: [
    'Twenty-five years on, it is easy to see the Society as the beginning. This record reminds us that it is also a culmination. Before there was a Society there were priests and Gaon Burahs; before there were officers there were the first children who walked to school; before there were elected leaders there were nine families who chose this ground. Each generation of firsts made the next generation’s ordinary possible.',
    'The Silver Jubilee is a moment to say thank you, and many of those named here are no longer with us. To them, and to every unnamed hand that built Rang, this page is offered with respect. For the young readers of this souvenir, it carries a quieter challenge: somewhere in Rang’s future there are still firsts waiting to be written. Whose names will they be?',
  ],
};

export const ROLL_OF_HONOUR = [
  { milestone: 'First priests', pioneers: 'Late Tade Doda Rang (male); Late Yatar Doda Rang (female)' },
  { milestone: 'First Gaon Burah', pioneers: 'Late Lalo Kocho Rang (male); Smti Mekap Dawe Rang (female)' },
  {
    milestone: 'First to attend school',
    pioneers: 'Shri Gayo Kocho Rang; Smti Pacha Dawe Taku; Smti Mefe Dawe Natung; Smti Yadang Dawe Singhi',
  },
  { milestone: 'First Class X pass', pioneers: 'Lt. Chabu Dawe Rang; Sh. Sacha Pimong Rang; Smt. Mefe Dawe Natung' },
  { milestone: 'First Class XII pass', pioneers: 'Sh. Pai Dawe Rang; Sh. Mahara Rang; Smti Meram Dawe Gyadi' },
  { milestone: 'First graduates', pioneers: 'Sh. Pai Dawe Rang; Smt Meram Dawe Gyadi' },
  { milestone: 'First post-graduates', pioneers: 'Sh. Rajesh Dawe Rang; Miss Sonia Dawe Rang' },
  { milestone: 'First government job', pioneers: 'Late Nadang Pimong Rang; Smti Mefe Dawe Natung' },
  {
    milestone: 'First SSB training, Haflong',
    pioneers: 'Lt. Tage Dawe Rang; Lt. Dacho Dawe Rang; Lt. Tade Takung Rang; Sh. Fedang Tamar Rang; Lt. Ratung Doda Rang',
  },
  { milestone: 'First gazetted officers', pioneers: 'Er. Pai Dawe Rang; Smti Yakar Dawe Riang' },
  { milestone: 'First Gram member', pioneers: 'Lt. Nadang Pimong Rang, in the period of Lt. Gamsang Rimo' },
  { milestone: 'First Anchal Samity Members', pioneers: 'Shri Jardang Dawe Rang; Smti Mechori Dawe Rang' },
  { milestone: 'First Gram Chairpersons', pioneers: 'Shri Sangkam Tamar Rang; Smti Padak Tamar Rang' },
  { milestone: 'First Anganwadi Worker / Helper', pioneers: 'Lt. Menam Dawe Lingfa / Smti Paka Kocho Rang' },
  { milestone: 'First RWS Chairman & General Secretary', pioneers: 'Er. Pai Dawe Rang; Shri Sacha Rang' },
  { milestone: 'First RWS Women Wing President & Secretary', pioneers: 'Smti Sueli Dawe Rang; Smti Sima Rang' },
  {
    milestone: 'First President & Secretary, Rang Youth Welfare Association',
    pioneers: 'Shri Kaya Rang; Shri Longpa Kocho Rang',
  },
];

export const TWO_PILLARS = {
  title: 'Remembering Two Pillars of Rang',
  subtitle: 'Lt. Mama Kocho & Lt. Tado Tamar — Honouring Two Sons of Rang Through Sports and Culture',
  dedicationLabel: 'Silver Jubilee Sports & Cultural Dedication',
  dedicationHeading: 'Honouring Two Sons of Rang Through Sports and Culture',
  intro: [
    'As part of its Silver Jubilee celebration, the Rang Welfare Society (RWS) has chosen to honour two sons of Rang who gave their youth to the village in the 1990s. The Sports Events, including the Volleyball Competition on 23 November 2026 at Rang Village, are dedicated in loving memory of Lt. Mama Kocho. The Cultural Programme, an evening of modern and folk songs and a dance competition, is dedicated to the memory of Lt. Tado Tamar.',
    'Born within a year of each other, the two men devoted their youth to Rang: protecting its natural resources, standing by its people and working to bring neighbouring villages together. Both passed away prematurely, leaving behind a legacy of selfless service that the village continues to remember with gratitude.',
  ],
  mamaKocho: {
    name: 'Lt. Mama Kocho',
    born: '1975',
    passedAway: '2002',
    parents: 'Lt. Norbo Kocho and Lt. Tai Kocho',
    spouse: 'Paka Kocho',
    children: 'Sh. Alex Kocho, Ms. Rani Kocho and Sh. John Kocho',
    photo: ASSETS.leaders.mamaKocho,
    thePerson:
      'Known for his kindness and empathy, Lt. Mama Kocho placed the needs of his fellow villagers before his own. When the interests of the village were at stake, he stood firm and faced any opposition head-on.',
    service: [
      { label: 'Healthcare', detail: 'He accompanied sick villagers to hospital and saw that they were treated by doctors.' },
      { label: 'Education', detail: 'He took village children to school and got them admitted.' },
      {
        label: 'Access to government services',
        detail: 'He helped villagers obtain official documents such as ration cards, ST certificates and other papers from government offices.',
      },
      {
        label: 'Protecting shared resources',
        detail: 'In 1997, together with Lt. Tado Tamar, he united Rang and Loffa villages for the joint protection of the natural resources of both.',
      },
    ],
    recognition:
      'In recognition of his dedicated social service, the villagers of Rang unanimously selected him as their candidate for Anchal Samity Member (ASM) in 2000. Sadly, he passed away before he could serve in that office.',
  },
  tadoTamar: {
    name: 'Lt. Tado Tamar',
    born: '1974, at Rang village',
    passedAway: '2008',
    parents: 'Sh. Fedang Tamar and Lt. Fei Tamar',
    spouse: 'Lt. Pahne Tamar',
    children: 'Ms. Naya Tamar',
    photo: ASSETS.leaders.tadoTamar,
    thePerson:
      'Lt. Tado Tamar was loved by one and all, and was a dear friend to young and old alike. Polite, honest and a natural entertainer, he was one of the most active social workers of Rang village, and was available to any villager at any time and in any place.',
    service: [
      {
        label: 'Guarding Rang’s resources',
        detail:
          'In 1994, he became the first Secretary of the Rang Village Welfare Committee (RVWC), under the chairmanship of Shri Rafe Dawe, formed to stop outsiders from hunting, poaching, felling and collecting the natural resources of Rang.',
      },
      {
        label: 'Building bridges',
        detail: 'In 1995, as Secretary of the RAC, he initiated the formation of the Rang–Loffa Welfare Association (RLWA).',
      },
      {
        label: 'Joint protection',
        detail: 'In 1997, together with Lt. Mama Kocho, he united Rang and Loffa villages for the joint protection of their natural resources.',
      },
      {
        label: 'A setback',
        detail:
          'The Sori-Langdi of both villages was performed under the banner of the RLWA; however, it could not be sustained because Loffa village raised a dispute over the boundary between the two villages.',
      },
    ],
    recognition:
      'Remembered across generations as one of the earliest architects of organised forest protection and inter-village harmony in East Kameng.',
  },
  journeyInBrief: [
    { year: '1994', milestone: 'Lt. Tado Tamar becomes the first Secretary of the Rang Village Welfare Committee (RVWC).' },
    { year: '1995', milestone: 'As RAC Secretary, he initiates the formation of the Rang–Loffa Welfare Association (RLWA).' },
    { year: '1997', milestone: 'Lt. Mama Kocho and Lt. Tado Tamar unite Rang and Loffa villages for joint protection of natural resources.' },
    { year: '2002', milestone: 'Lt. Mama Kocho passes away prematurely.' },
    { year: '2008', milestone: 'Lt. Tado Tamar passes away prematurely, as did Lt. Mama Kocho.' },
  ],
  closing:
    'Through selfless service, Lt. Mama Kocho and Lt. Tado Tamar showed what it means to serve a community. The RWS Silver Jubilee Sports Events and Cultural Programme are dedicated as a tribute to them, and as an invitation to the next generation of Rang to carry their spirit forward.',
};

export interface PublicServiceGroup {
  group: string;
  count: number;
  category: string;
  description: string;
}

export const PEOPLE_IN_SERVICE = {
  sectionLabel: 'OUR PEOPLE IN SERVICE',
  heading: 'Rang in Public Service: 56 Members, Four Groups of Service',
  navSubtitle: '56 Members Across 15 Government Departments & Organisations',
  intro:
    'In twenty-five years of organised community service, Rang has grown into a village of public servants. Today, 56 sons and daughters of Rang serve the nation across 15 government departments and organisations, from engineers and teachers to police personnel, nurses, clerks and support staff. Twenty-two of them, 39 per cent, are women.',
  totalMembers: 56,
  keyStats: [
    { value: '56', label: 'Members in government service' },
    { value: '15', label: 'Departments & organisations' },
    { value: '22', label: 'Women (39%)' },
    { value: '5', label: 'Group A (gazetted) officers' },
  ],
  groupsHeading: 'Members by Group of Service (as per CCS Rules)',
  groups: [
    {
      group: 'Group A',
      count: 5,
      category: 'Gazetted officers',
      description: 'IES, APPCS, and Engineers (EE, AE)',
    },
    {
      group: 'Group B',
      count: 7,
      category: 'Non-gazetted officers',
      description: 'PGT, SI, Jes, SI, etc.',
    },
    {
      group: 'Group C',
      count: 14,
      category: 'Supervisory & support',
      description: 'PGT, ASIs, UDC, etc.',
    },
    {
      group: 'Group D',
      count: 30,
      category: 'Support staff',
      description: 'Peons, chowkidars, labour and contingency staff',
    },
  ] as PublicServiceGroup[],
  insightHeading: 'What it tells us',
  insightText:
    '12 members (21%) are in Groups A and B. The next step is to mentor more of our Group C and D members upward through competitive exams and coaching.',
  sourceNote:
    'Source: RWS service-holder records, classified by Group (CCS Rules); casual, contingency and defence posts taken as equivalents.',
};

