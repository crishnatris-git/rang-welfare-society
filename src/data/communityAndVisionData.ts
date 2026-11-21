import { ASSETS } from './assets';

export interface ShgProfile {
  id: string;
  name: string;
  attireColour: string;
  photo: string;
  formedDate?: string;
  membersCount?: string;
  president?: string;
  affiliation: string;
  livelihoodActivities: string[];
  description: string;
}

export interface VisionMission {
  id: string;
  name: string;
  focus: string;
  flagship: string;
  pillar: 'Yuva' | 'Mahilayen' | 'Annadata' | 'Garib & All Households';
}

export interface StaticGalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category:
    | 'Rang Village Landscapes'
    | 'Historical Leadership'
    | '1st General Conference (2013)'
    | 'Infrastructure & Development (2016–2020)'
    | 'Community Services & Social Work (2020–2023)'
    | 'Youth, Sports & Cultural Life (2023–2026)'
    | 'Gaon Burahs & Panchayat Leadership'
    | 'Self-Help Groups'
    | 'Rang Helping Hand'
    | 'Silver Jubilee Monolith & Symbols';
  period: string;
  url: string;
}

export const SHG_ARTICLE = {
  title: 'Threads of Strength, Bonds of Trust',
  subtitle: 'How the Self-Help Groups of Rang Village are writing a quiet story of women’s empowerment',
  intro: [
    'Every village has a story it tells about itself. In Rang Village, in East Kameng District of Arunachal Pradesh, one such story is told each week in a modest room, around a notebook, a small cash box and a circle of women. It is the story of four Self-Help Groups (SHGs): Dawe Danne, Fodang Yarlo, Rang Danne and Sangpine. Each is made up entirely of women, and together they show how far Rang’s women have travelled towards confidence, independence and progress.',
    'Look at the photographs that accompany this article. The women stand shoulder to shoulder, in matching skirts and beads of red, blue, green and black-and-white. The dress is a reminder that these groups grow out of a living culture. The unity of the line is a reminder of what makes them work.',
  ],
  sections: [
    {
      heading: 'A simple idea with a powerful effect',
      paragraphs: [
        'The four SHGs work in the same way, and the Rang Danne SHG is a good example of all of them. The group has 13 women who meet regularly and pool their savings. It operates under the Arunachal State Livelihood Mission (ArSLM) and its Primary Level Federation (PLF). The guiding principle is “saving first, credit later”. Each member contributes a small, fixed amount every week, and the money is deposited in a bank account in the name of the SHG as a common fund.',
        'From this fund, members take small, flexible, collateral-free loans from one another. The loans pay for production, meet an emergency or set up a small business. The group itself decides the rate of interest and the rules of repayment. For a woman who may never have had a bank loan, this is where financial decision-making begins. She saves, she borrows, she repays, and she has a voice in how it is all done.',
      ],
    },
    {
      heading: 'From savings to enterprise',
      paragraphs: [
        'Savings are only the foundation. Rang Danne SHG, formed on 19 November 2018, has turned its collective strength into livelihoods, with mushroom cultivation and organic vegetable farming, bamboo shoot pickles and dry meat pickles, and handicrafts such as bamboo mugs. Each activity draws on what the village already has: its land, its forests, its bamboo and its inherited skills. This is the kind of enterprise that keeps value, and income, within the community.',
        'The group is led by its President, Smti Tina Mein Reng. Today, 19 November 2026, the group completes eight years of continuous activity. Eight years of weekly meetings, of savings deposited and loans repaid, is a record of discipline and trust that no outside scheme can create on its own.',
      ],
    },
    {
      heading: 'What empowerment looks like',
      paragraphs: [
        'Empowerment is often spoken of in large words, but in Rang it appears in small, concrete changes. A woman has her own savings. A family can face a medical bill or a school fee without a desperate search for a moneylender. A member who began by making pickles now thinks about markets, packaging and price. Women who once spoke little in public now chair meetings, keep accounts and negotiate with banks and government departments. Because the same model is followed in all four groups, these gains are shared across the village, and the confidence of one group spreads to the next.',
      ],
    },
    {
      heading: 'The road ahead',
      paragraphs: [
        'The next chapter lies in turning good produce into good brands, and good groups into strong enterprises. Better quality standards and packaging, wider market linkages, training in accounts and digital tools, and links between the four SHGs would help every member earn more from what she already does well. Bamboo products, organic produce and traditional food preparations from Rang have a natural appeal, and with the right support they can reach customers far beyond East Kameng.',
        'As we mark this Silver Jubilee, the women of Rang offer an encouraging lesson. Development does not always arrive through large buildings and big announcements. Sometimes it arrives as a woman who saves a little every week, and lends to her neighbour, and trusts her sisters. The Self-Help Groups of Rang Village have shown that when women are given a platform and the freedom to decide, they build not only their own futures but that of their community.',
      ],
    },
  ],
};

export const SHG_PROFILES: ShgProfile[] = [
  {
    id: 'dawe-danne',
    name: 'Dawe Danne SHG',
    attireColour: 'Red traditional skirts & beads',
    photo: ASSETS.shg.daweDanne,
    affiliation: 'Arunachal State Livelihood Mission (ArSLM) & Primary Level Federation (PLF)',
    livelihoodActivities: ['Weekly pooled savings & internal collateral-free credit', 'Local produce & traditional enterprise'],
    description:
      'All-women Self-Help Group of Rang Village following the “saving first, credit later” discipline to build financial self-reliance and household resilience.',
  },
  {
    id: 'fodang-yarlo',
    name: 'Fodang Yarlo SHG',
    attireColour: 'Blue traditional skirts & beads',
    photo: ASSETS.shg.fodangYarlo,
    affiliation: 'Arunachal State Livelihood Mission (ArSLM) & Primary Level Federation (PLF)',
    livelihoodActivities: ['Weekly pooled savings & credit management', 'Women-led community enterprise'],
    description:
      'All-women Self-Help Group uniting village women in financial literacy, mutual lending, and grassroots decision-making.',
  },
  {
    id: 'rang-danne',
    name: 'Rang Danne SHG',
    attireColour: 'Green traditional skirts & beads',
    photo: ASSETS.shg.rangDanne,
    formedDate: '19 November 2018 (8 years completed on 19 November 2026)',
    membersCount: '13 Women Members',
    president: 'Smti. Tina Mein Reng',
    affiliation: 'Arunachal State Livelihood Mission (ArSLM) & Primary Level Federation (PLF)',
    livelihoodActivities: [
      'Mushroom cultivation',
      'Organic vegetable farming',
      'Bamboo shoot pickles & dry meat pickles',
      'Handicrafts including bamboo mugs',
    ],
    description:
      'Led by President Smti. Tina Mein Reng, Rang Danne SHG models how eight years of uninterrupted weekly savings, mutual credit, and village-rooted livelihood enterprise keep income within the community.',
  },
  {
    id: 'sangpine',
    name: 'Sangpine SHG',
    attireColour: 'Black-and-white traditional skirts & beads',
    photo: ASSETS.shg.sangpine,
    affiliation: 'Arunachal State Livelihood Mission (ArSLM) & Primary Level Federation (PLF)',
    livelihoodActivities: ['Weekly pooled savings & mutual lending', 'Traditional crafts & local food production'],
    description:
      'All-women Self-Help Group carrying the name of present-day Rang (Sangpine), fostering leadership, savings discipline, and collective trust.',
  },
];

export const RANG_HELPING_HAND = {
  title: 'Rang Helping Hand: First to Arrive, Last to Claim Credit',
  subtitle: 'A tribute to the young professionals who stand by Rang Village in its hour of need',
  photo: ASSETS.groups.helpingHand,
  photoCaption: 'Members of Rang Helping Hand — young professionals from Rang Village based at Seppa',
  opening: [
    'When trouble comes to a village, the first question is always the same: who will reach us first? For the people of Rang Village, in East Kameng District of Arunachal Pradesh, the answer has increasingly been the same too: Rang Helping Hand.',
    'Rang Helping Hand is a group of friends from Rang Village. They are educated, they have built careers, and they are all based at Seppa. Every one of them is also a member of the Rang Welfare Society (RWS). Within the larger society they act on their own, as a quiet, informal circle of friends who step in the moment urgency or emergency demands.',
  ],
  sections: [
    {
      heading: 'Close at hand when it counts',
      body: 'Their strength lies in where they live. Because all the members are stationed at Seppa, they are the nearest to react when anything happens to any member of Rang Village. A sudden illness, an accident or a family in distress does not have to wait for formal approvals or a long journey for help. A phone call is often enough, and a friend is already on the way. In remote hill districts, those first hours can decide how a crisis ends.',
    },
    {
      heading: 'Service without show',
      body: 'What sets the group apart is its spirit. They help the needy villagers without fanfare or demand for recognition, because they see the village as their own family. Their uniform track jackets in the photograph speak of a team that moves together, and the way they stand reflects a close bond among friends. It also shows what educated, employed young people can do for the place they come from. They have not left it behind. They have taken it with them and kept it close.',
    },
    {
      heading: 'A debt of gratitude',
      body: 'The Rang Welfare Society will never forget the services of Rang Helping Hand. As we celebrate this Silver Jubilee, it is only right that we say so in print. They deserve the praise of every one of us, and more than that, our support and encouragement so that their work can continue and grow. Their example offers a lesson for every village and every generation: welfare is not only a matter of institutions and funds. It is also a matter of people who answer the call. In Rang, those people have a name, and we are proud to call them our own.',
    },
  ],
};

export const VISION_2047 = {
  title: 'Rang Vision 2047',
  subtitle: 'Nine clans, one Rang: a community roadmap in step with Viksit Bharat @ 2047',
  author: 'Mara Kocho, Advisor, Rang Welfare Society',
  intro:
    'Twenty-five years ago the people of Rang chose to organise themselves for one another’s welfare. A society is not a certificate or a signboard. It is the daily decisions of ordinary families: to settle a dispute with dignity, to send a child to school, to stand beside a neighbour in grief, and to keep faith with the land that carried our ancestors. Our Silver Jubilee is therefore a moment of gratitude and of accountability. We thank those who built the Society. We also ask what the next twenty-one years must demand of us.',
  whyNow:
    'India has resolved to become a developed nation by 2047, the centenary of its Independence. That goal will be reached village by village. Its human core rests on four pillars: Yuva (youth), Garib (the poor), Mahilayen (women) and Annadata (farmers). A community with a clear plan draws in schemes, partners and investment; one without remains a beneficiary of other people’s priorities. Our young people study and work far from home, our elders who carry oral history and craft are ageing, and a Society that has grown must now become a lasting institution. The moment calls for a plan.',
  statement:
    'By 2047, Rang will be a peaceful, healthy, educated, self-reliant and culturally confident community: where every household is free from want, every child learns and every woman leads, every young person finds opportunity at home, every elder is cared for with dignity, and the Nyishi identity of Rang flourishes within a Viksit Bharat.',
  missions: [
    {
      id: 'rang-yuva',
      name: 'Rang Yuva',
      focus: 'Education, skills and enterprise',
      flagship: 'A Rang Education Fund and a network of mentors.',
      pillar: 'Yuva',
    },
    {
      id: 'rang-mahila',
      name: 'Rang Mahila',
      focus: 'Women as leaders and earners',
      flagship: 'SHG federations and a common Rang brand.',
      pillar: 'Mahilayen',
    },
    {
      id: 'rang-krishi',
      name: 'Rang Krishi',
      focus: 'Farmers’ collective & sustainable agriculture',
      flagship: 'Organic produce, processing and storage.',
      pillar: 'Annadata',
    },
    {
      id: 'rang-swasthya',
      name: 'Rang Swasthya',
      focus: 'Universal health protection & emergency care',
      flagship: 'Health insurance for all, health volunteers, nutrition and emergency transport.',
      pillar: 'Garib & All Households',
    },
    {
      id: 'rang-samriddhi',
      name: 'Rang Samriddhi',
      focus: 'Local craft, tourism & rural enterprise',
      flagship: 'Craft, GI-protected products, homestays and a community enterprise hub.',
      pillar: 'Annadata',
    },
    {
      id: 'rang-sanskriti',
      name: 'Rang Sanskriti',
      focus: 'Language, oral history & indigenous heritage',
      flagship: 'A Heritage Archive of our elders, Nyishi language in schools, a Cultural Centre.',
      pillar: 'Garib & All Households',
    },
    {
      id: 'rang-prakriti',
      name: 'Rang Prakriti',
      focus: 'Ecological stewardship & clean energy',
      flagship: 'Forests, water, clean energy and disaster readiness.',
      pillar: 'Annadata',
    },
    {
      id: 'rang-setu',
      name: 'Rang Setu',
      focus: 'Physical & digital infrastructure',
      flagship: 'Roads, tap water, housing and a digital hub with internet.',
      pillar: 'Yuva',
    },
    {
      id: 'rang-ekta',
      name: 'Rang Ekta',
      focus: 'Nine-clan harmony & transparent governance',
      flagship: 'Land records, a mediation council of all nine clans and transparent governance.',
      pillar: 'Garib & All Households',
    },
    {
      id: 'rang-seva',
      name: 'Rang Seva',
      focus: 'Social security & dignity for elders',
      flagship: 'A Welfare Corpus and social security for elders and the vulnerable.',
      pillar: 'Garib & All Households',
    },
  ] as VisionMission[],
  reformFromWithin:
    'Development is more than roads and income. A community changes when its habits and institutions change. The Vision therefore proposes, by persuasion and consent and never by compulsion, a drug-free Rang; equal voice and safety for women; simple, debt-free ceremonies; every child in school up to Class 12; healthy and clean living; respect for elders; and honest, published accounts. Custom is honoured within the Constitution of India and the law. Where a practice harms the dignity or safety of any person, the community should have the courage to reform it, led by its elders and its women.',
  phases: [
    {
      phase: 'Phase I: 2026-2030 (Rang Nirman)',
      years: '2026–2030',
      title: 'Rang Nirman — Building the Foundation',
      summary:
        'Builds the foundation: a household baseline survey, committees and systems, the Welfare Corpus and Education Fund, and quick wins such as the digital hub and a land records cell.',
    },
    {
      phase: 'Phase II: 2031-2036 (Rang Vistar)',
      years: '2031–2036',
      title: 'Rang Vistar — Scaling What Works',
      summary: 'Scales what works across all ten missions and holds a comprehensive mid-term review.',
    },
    {
      phase: 'Phase III: 2037-2047 (Rang Shikhar)',
      years: '2037–2047',
      title: 'Rang Shikhar — Self-Sustaining Institutions',
      summary:
        'Makes our institutions self-sustaining and writes the next vision. Indicative aims for 2047 include full school completion, every young person skill-certified, every household insured and connected, two or more income sources in every home, women at parity in leadership, and a drug-free youth. These figures will be fixed only after the baseline survey tells us where Rang stands today.',
    },
  ],
  institution:
    'A vision this broad needs a lasting institution. We propose an Executive Council with one representative from each of the nine clans, mission committees with at least one-third women and youth, a Council of Elders, a Mediation Council and an independent Audit and Ethics Committee. Office-bearers will serve fixed terms, declare any personal interest, and report to the General Conference every year on a public scorecard. Resources will come from households, the Rang diaspora, government schemes, banks, CSR partners and a permanent Rang Development Corpus whose principal is never spent.',
  nineSankalps: [
    { num: 1, title: 'Ekta', pledge: 'Stay one Rang' },
    { num: 2, title: 'Shiksha', pledge: 'Every child learns' },
    { num: 3, title: 'Swasthya', pledge: 'Every family healthy' },
    { num: 4, title: 'Nari Shakti', pledge: 'Women lead, free from fear' },
    { num: 5, title: 'Yuva Shakti', pledge: 'Youth skilled and drug-free' },
    { num: 6, title: 'Samriddhi', pledge: 'Dignified livelihoods' },
    { num: 7, title: 'Sanskriti', pledge: 'Language and heritage' },
    { num: 8, title: 'Prakriti', pledge: 'Greener than we found it' },
    { num: 9, title: 'Satya and Seva', pledge: 'Honest service' },
  ],
  resolutionClauses: [
    'Adopt Rang Vision 2047 as the guiding framework of the Society for the years 2026 to 2047.',
    'Constitute a Vision Implementation Committee and ten Mission Committees, with equal representation of all nine clans and with women and youth.',
    'Launch the Rang Welfare Corpus and the Rang Education Fund, and commission a household baseline survey.',
    'Adopt the Nine Sankalps, install the Silver Jubilee Monolith as the permanent emblem of the unity of the nine clans, and observe an annual Rang Vision Day to report progress to the people.',
  ],
  closing:
    'Let each household give what it can: time, skill, savings or voice. Let each elder bless, each woman lead and each young person step forward. Nine clans. One Rang. One Viksit Bharat.',
};

export const STATIC_GALLERY_PHOTOS: StaticGalleryPhoto[] = [
  {
    id: 'gal-hills',
    title: 'Rang Village & Winding PMGSY Road',
    caption: 'Aerial panorama of Rang Village nestled in green East Kameng hills with the PMGSY model road winding up from Seppa.',
    category: 'Rang Village Landscapes',
    period: 'Present Day',
    url: ASSETS.landscapes.heroRangHills,
  },
  {
    id: 'gal-sunrise',
    title: 'Kameng River Valley & Seppa at Sunrise',
    caption: 'View across the green hills of Rang overlooking the Kameng River bending around Seppa Township.',
    category: 'Rang Village Landscapes',
    period: 'Present Day',
    url: ASSETS.landscapes.valleyKamengSunrise,
  },
  {
    id: 'gal-nyangpo',
    title: 'Nyangpo Soh Stream',
    caption: 'The quiet, forested stream running through the heart of Rang Village, immortalised in ancestral folklore.',
    category: 'Rang Village Landscapes',
    period: 'Heritage Landscape',
    url: ASSETS.landscapes.nyangpoSohStream,
  },
  {
    id: 'gal-community-full',
    title: 'Nine Clans, One Family — Rang Community Gathering',
    caption: 'Full community assembly of Rang Village members in traditional attire at the Silver Jubilee period.',
    category: 'Youth, Sports & Cultural Life (2023–2026)',
    period: '2023–2026',
    url: ASSETS.groups.fullCommunity,
  },
  {
    id: 'gal-monolith',
    title: 'Silver Jubilee Monolith (3D Rendering)',
    caption: 'Nine-faced polished granite monolith banded with 25 golden rings and crowned by the Silver Jubilee & RWS emblems.',
    category: 'Silver Jubilee Monolith & Symbols',
    period: '2026',
    url: ASSETS.monolith.render3D,
  },
  {
    id: 'gal-gb-men',
    title: 'Gaon Burahs of Rang Village',
    caption: 'Customary elders and Gaon Burahs of Rang Village in official red ceremonial coats.',
    category: 'Gaon Burahs & Panchayat Leadership',
    period: 'Customary Governance',
    url: ASSETS.groups.gaonBurahs,
  },
  {
    id: 'gal-gb-all',
    title: 'Gaon Burahs and Gaon Buris of Rang',
    caption: 'Customary male and female village leaders standing together in stewardship of Rang.',
    category: 'Gaon Burahs & Panchayat Leadership',
    period: 'Customary Governance',
    url: ASSETS.groups.gaonBurahsAndBuri,
  },
  {
    id: 'gal-panchayat',
    title: 'Rang Panchayat Team',
    caption: 'Consensus-selected Gram Panchayat leadership representing Rang Village.',
    category: 'Gaon Burahs & Panchayat Leadership',
    period: 'Grassroots Governance',
    url: ASSETS.groups.panchayatTeam,
  },
  {
    id: 'gal-conf-1',
    title: '1st General Conference Felicitation (October 2013)',
    caption: 'Honouring community contributors during the 1st General Conference of renamed Rang Welfare Society.',
    category: '1st General Conference (2013)',
    period: '2013–2016',
    url: ASSETS.periods.conf2013A,
  },
  {
    id: 'gal-conf-2',
    title: '1st General Conference Leadership (October 2013)',
    caption: 'Office bearers and members assembled at Rang Village in October 2013.',
    category: '1st General Conference (2013)',
    period: '2013–2016',
    url: ASSETS.periods.conf2013B,
  },
  {
    id: 'gal-conf-3',
    title: '1st General Conference Cultural Evening (October 2013)',
    caption: 'Traditional cultural celebration marking the adoption of RWS written bye-laws.',
    category: '1st General Conference (2013)',
    period: '2013–2016',
    url: ASSETS.periods.conf2013C,
  },
  {
    id: 'gal-excavator',
    title: 'PMGSY Road Construction Begins (2017)',
    caption: 'Heavy machinery cutting the historic road alignment connecting Rang Village after 70 years.',
    category: 'Infrastructure & Development (2016–2020)',
    period: '2016–2020',
    url: ASSETS.periods.work2016Excavator,
  },
  {
    id: 'gal-pmgsy-road',
    title: 'Model PMGSY Road of East Kameng',
    caption: 'Completed road corridor monitored by the RWS Quality Monitoring Committee.',
    category: 'Infrastructure & Development (2016–2020)',
    period: '2016–2020',
    url: ASSETS.periods.work2016Road,
  },
  {
    id: 'gal-river-clean',
    title: 'River Cleaning Mission Seppa',
    caption: 'Rang Welfare Society volunteers participating in the River Cleaning Mission along the Kameng.',
    category: 'Infrastructure & Development (2016–2020)',
    period: '2016–2020',
    url: ASSETS.periods.work2016RiverClean,
  },
  {
    id: 'gal-survey',
    title: 'Community Land Demarcation Drive',
    caption: 'Villagers and RWS members conducting ground demarcation of Rang’s community lands.',
    category: 'Infrastructure & Development (2016–2020)',
    period: '2016–2020',
    url: ASSETS.periods.work2016FieldSurvey,
  },
  {
    id: 'gal-hall',
    title: 'Rang Community Hall Overlooking Seppa',
    caption: 'The RWS Community Hall perched on the hilltop overlooking Seppa Township below.',
    category: 'Infrastructure & Development (2016–2020)',
    period: '2016–2020',
    url: ASSETS.periods.work2016Hall,
  },
  {
    id: 'gal-social-road',
    title: 'Voluntary Road Maintenance Social Work',
    caption: 'Community members repairing and maintaining village road access during the 2020–2023 term.',
    category: 'Community Services & Social Work (2020–2023)',
    period: '2020–2023',
    url: ASSETS.periods.work2020RoadService,
  },
  {
    id: 'gal-welcome-gate',
    title: 'Welcome to Rang Gateway',
    caption: 'Community members gathered beneath the Welcome to Rang village gate.',
    category: 'Community Services & Social Work (2020–2023)',
    period: '2020–2023',
    url: ASSETS.periods.work2020WelcomeGate,
  },
  {
    id: 'gal-elders-meet',
    title: 'Elders & Community Council Gathering',
    caption: 'Village elders and RWS leadership in traditional attire during a community assembly.',
    category: 'Community Services & Social Work (2020–2023)',
    period: '2020–2023',
    url: ASSETS.periods.work2020EldersGroup,
  },
  {
    id: 'gal-volleyball',
    title: 'Volleyball Champions 2025',
    caption: 'Rang youth volleyball team celebrating their 2025 championship victory.',
    category: 'Youth, Sports & Cultural Life (2023–2026)',
    period: '2023–2026',
    url: ASSETS.periods.work2023Volleyball,
  },
  {
    id: 'gal-felicitation',
    title: 'Academic Achievers Felicitation',
    caption: 'Honouring Rang’s student toppers and achievers during the 2023–2026 term.',
    category: 'Youth, Sports & Cultural Life (2023–2026)',
    period: '2023–2026',
    url: ASSETS.periods.work2023Felicitation,
  },
  {
    id: 'gal-procession',
    title: 'Traditional Community Procession',
    caption: 'Women and elders of Rang welcoming guests in traditional Nyishi attire.',
    category: 'Youth, Sports & Cultural Life (2023–2026)',
    period: '2023–2026',
    url: ASSETS.periods.work2023Procession,
  },
  {
    id: 'gal-hall-event',
    title: 'RWS Community Hall Assembly',
    caption: 'Community programme inside the Rang Welfare Society Community Hall.',
    category: 'Youth, Sports & Cultural Life (2023–2026)',
    period: '2023–2026',
    url: ASSETS.periods.work2023CommunityHall,
  },
  {
    id: 'gal-shg-dawe',
    title: 'Dawe Danne Self-Help Group',
    caption: 'Members of Dawe Danne SHG in matching red traditional attire and beads.',
    category: 'Self-Help Groups',
    period: 'Community Institutions',
    url: ASSETS.shg.daweDanne,
  },
  {
    id: 'gal-shg-fodang',
    title: 'Fodang Yarlo Self-Help Group',
    caption: 'Members of Fodang Yarlo SHG in matching blue traditional attire and beads.',
    category: 'Self-Help Groups',
    period: 'Community Institutions',
    url: ASSETS.shg.fodangYarlo,
  },
  {
    id: 'gal-shg-rang',
    title: 'Rang Danne Self-Help Group',
    caption: 'Members of Rang Danne SHG (established 19 Nov 2018) in matching green traditional attire.',
    category: 'Self-Help Groups',
    period: 'Community Institutions',
    url: ASSETS.shg.rangDanne,
  },
  {
    id: 'gal-shg-sangpine',
    title: 'Sangpine Self-Help Group',
    caption: 'Members of Sangpine SHG in matching black-and-white traditional attire.',
    category: 'Self-Help Groups',
    period: 'Community Institutions',
    url: ASSETS.shg.sangpine,
  },
  {
    id: 'gal-helping-hand',
    title: 'Members of Rang Helping Hand',
    caption: 'Young Seppa-based professionals from Rang Village standing ready in emergency solidarity.',
    category: 'Rang Helping Hand',
    period: 'Community Institutions',
    url: ASSETS.groups.helpingHand,
  },
];

export const OFFICIAL_PUBLICATIONS = [
  {
    id: 'pub-jubilee-digital',
    title: 'Rang — The 9 Colours (Silver Jubilee Souvenir — Digital Print Edition)',
    year: '2026',
    category: 'Silver Jubilee Souvenir',
    pages: '83 Pages · Full Illustrated Layout',
    description:
      'The complete illustrated Silver Jubilee Commemorative Souvenir celebrating 25 years of Rang Welfare Society (2001–2026), featuring official messages, the Nine Clans, Silver Jubilee Monolith, Pioneers, Community Voices, Self-Help Groups, Rang Helping Hand, and Rang Vision 2047.',
    documentUrl: ASSETS.publications.digitalMagazinePdf,
    coverUrl: ASSETS.publications.coverFront,
  },
  {
    id: 'pub-master-manuscript',
    title: 'Rang Welfare Society Silver Jubilee — Authoritative Master Manuscript',
    year: '2026',
    category: 'Archival Source Manuscript',
    pages: '85 Pages · Complete Textual Edition',
    description:
      'The authoritative archival manuscript copy preserving full verbatim historical essays, landscape gazetteers, founders’ registers, community memoirs, poems, folktales, Nyishi riddles, and the Vision 2047 Resolution.',
    documentUrl: ASSETS.publications.masterTextPdf,
    coverUrl: ASSETS.publications.coverBack,
  },
];
