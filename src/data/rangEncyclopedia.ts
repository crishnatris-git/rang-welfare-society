import { ASSETS } from './assets';

export interface ClanProfile {
  order: number;
  slug: string;
  name: string;
  alternateSpelling?: string;
  foundingLineage?: string;
  earlySettlement: string;
  originVillage: string;
  settlerLabel: 'First settlers' | 'Settler' | 'Settlers';
  foundingAncestors: string;
  symbolTitle: string;
  symbolShort: string;
  symbolImage: string;
  symbolDescription: string;
  monolithMeaning: string;
  chargeForFuture: string;
  colourHex: string;
  colourName: string;
  notableReferences: string[];
}

export interface FoundingLineage {
  lineage: string;
  emergedClan: string;
  remarks: string;
}

export interface HistoricalAgreement {
  id: string;
  title: string;
  period: string;
  subtitle: string;
  paragraphs: string[];
}

export const RANG_AT_A_GLANCE = [
  { label: 'Village', value: 'Rang' },
  { label: 'Circle / District', value: 'Seppa Circle, East Kameng District, Arunachal Pradesh' },
  { label: 'Distance from Seppa', value: 'Approximately 4 km' },
  { label: 'Source of Name', value: 'Rangso, a stream flowing through the area (Rangso Haaling)' },
  { label: 'Present Location', value: 'Sangpine (also recorded as Sangphine)' },
  { label: 'Estimated Establishment', value: 'Around 16th to 17th Century' },
  { label: 'Clans of the Village', value: 'Tamar, Tabang, Doda, Lichi, Takung, Kocho, Dawe, Ribu, and Pimung' },
  { label: 'Census of India Profile', value: '478 residents (221 men, 257 women) in 64 Nyishi families · Village Code 262015' },
  { label: 'Road Connectivity', value: 'PMGSY begun 23 May 2017 · First vehicle reached Rang on 31 August 2017' },
  { label: 'Notable Institution', value: 'Nyubu Nyvgam Yerko (Gurukul), established 2020 (inaugurated 20 March 2021)' },
];

export const FOUR_FOUNDING_LINEAGES: FoundingLineage[] = [
  { lineage: 'Taachang', emergedClan: 'Ngechang', remarks: 'Now extinct' },
  { lineage: 'Taabang', emergedClan: 'Ngebang', remarks: 'Later known as Tabang' },
  { lineage: 'Taanmar', emergedClan: 'Tamar', remarks: 'Founding settlement at Namgo Langra (Narangyar)' },
  { lineage: 'Taanda', emergedClan: 'Doda', remarks: 'Founding settlement at Namgo Langra (Narangyar)' },
];

export const NINE_CLANS: ClanProfile[] = [
  {
    order: 1,
    slug: 'tamar',
    name: 'Tamar',
    foundingLineage: 'Taanmar',
    earlySettlement: 'Namgo Langra (prominently known as Narangyar), migrated to present Rang (Sangphine)',
    originVillage: 'Namgo Langra (Narangyar)',
    settlerLabel: 'First settlers',
    foundingAncestors: 'Ato Changrang and Ato Parang',
    symbolTitle: 'The Seal of Cosmic Order',
    symbolShort: 'Astrological Seal',
    symbolImage: ASSETS.clanSymbols.tamar,
    symbolDescription:
      'The first to settle gave the village its shape. A six-pointed star within a radiating wheel speaks of foundations: mapping the land and setting the root order from which a community grows.',
    monolithMeaning: 'Foundational cosmic order, mapping and the root design of the community',
    chargeForFuture: 'Build on sound foundations',
    colourHex: '#B88A3E',
    colourName: 'Foundation Gold',
    notableReferences: [
      'Sh. Fedang Tamar Rang — 1st Head Gaon Burah & SSB Haflong Pioneer',
      'Lt. Tado Tamar — Founding Secretary RVWC (1993/94), RLWA Initiator & Pillar of Rang',
      'Sh. Sangkam Tamar Rang & Smti. Padak Tamar Rang — First Gram Chairpersons',
      'Respected Elders: Beku Tamar, Solung Tamar, Tani Tamar, Sering Tamar, Missa Tamar, Asha Tamar',
    ],
  },
  {
    order: 2,
    slug: 'tabang',
    name: 'Tabang',
    alternateSpelling: 'Ngebang (earlier name)',
    foundingLineage: 'Taabang',
    earlySettlement: 'Serewa, migrated to present Rang (Sangphine)',
    originVillage: 'Serewa',
    settlerLabel: 'Settler',
    foundingAncestors: 'Ato Ata Tabang',
    symbolTitle: 'The Botanical Triangle',
    symbolShort: 'Botanical Triangle Seal',
    symbolImage: ASSETS.clanSymbols.tabang,
    symbolDescription:
      'A sprouting plant rises within an upward triangle. The second lineage brought expansion, the courage to put down a second root and trust the land to feed more than one family.',
    monolithMeaning: 'Early expansion, growth and the flourishing of life',
    chargeForFuture: 'Grow without forgetting our roots',
    colourHex: '#2D6A4F',
    colourName: 'Sprouting Emerald',
    notableReferences: [
      'Ata Tabang Rang — Respected Figure of Earlier Times (No. 1 in village register)',
      'Koda Tabang Rang — Respected Figure of Earlier Times',
    ],
  },
  {
    order: 3,
    slug: 'doda',
    name: 'Doda',
    foundingLineage: 'Taanda',
    earlySettlement: 'Namgo Langra (prominently known as Narangyar), migrated to present Rang (Sangphine)',
    originVillage: 'Namgo Langra (Narangyar)',
    settlerLabel: 'Settlers',
    foundingAncestors: 'Ato Deka and Ato Rajja',
    symbolTitle: 'The Tree of Life',
    symbolShort: 'Cosmic Tree of Life',
    symbolImage: ASSETS.clanSymbols.doda,
    symbolDescription:
      'Deep roots and widespread branches express heritage that deepens each season: strength and steady continuity. A tree reaches as high as its roots reach down.',
    monolithMeaning: 'Deep roots and wide branches: heritage, strength and continuity',
    chargeForFuture: 'Grow with deep roots and continuity',
    colourHex: '#1B4332',
    colourName: 'Deep Forest Green',
    notableReferences: [
      'Late Tade Doda Rang — First Male Priest (Nyubu) of Rang',
      'Late Yatar Doda Rang — First Female Priest of Rang',
      'Lt. Ratung Doda Rang — First SSB Training (Haflong)',
      'Byangne Ragung Doda — Contemporary Priest & Cultural Custodian',
    ],
  },
  {
    order: 4,
    slug: 'lichi',
    name: 'Lichi',
    alternateSpelling: 'Litchi (variant in author byline)',
    earlySettlement: 'Joined Rang through cordial relations and kinship ties',
    originVillage: 'Londa Village',
    settlerLabel: 'Settlers',
    foundingAncestors: 'Abo Daffi and Abo Racho',
    symbolTitle: 'The Solar Mandala',
    symbolShort: 'Solar Mandala',
    symbolImage: ASSETS.clanSymbols.lichi,
    symbolDescription:
      'A radiant, many-petalled form opens around a quiet centre. It stands for vitality, protective warmth and the hearth that draws a community together: light that is shared, not hoarded.',
    monolithMeaning: 'Vitality, protection and community warmth',
    chargeForFuture: 'Show warmth to the vulnerable',
    colourHex: '#C2591A',
    colourName: 'Hearth Amber',
    notableReferences: [
      'Sri Garbe Lichi Rang (Gorbe Rang) — Best Gram Panchayat Chairperson, East Kameng (2025)',
      'Abo Taping Lichi Rang & Karu Lichi Rang — Respected Elders & Priests',
      'Smt. Wari Lichi Rang — Transparently selected Anganwadi Worker (2023–2026)',
      'Community Voices: Kanchak Lichi Rang (memorial tribute), Malo Lichi Rang, Meni Lichi Rang, Melo Litchi Rang',
    ],
  },
  {
    order: 5,
    slug: 'takung',
    name: 'Takung',
    earlySettlement: 'Migrated from Tallang village and joined early clans at the same settlement',
    originVillage: 'Tallang Village',
    settlerLabel: 'Settlers',
    foundingAncestors: 'Ato Tade and Ato Kome',
    symbolTitle: 'The Nonagonal Mandala',
    symbolShort: 'Nonagonal Mandala',
    symbolImage: ASSETS.clanSymbols.takung,
    symbolDescription:
      'A nine-sided frame, matching the nine faces of the monolith, encloses balanced bands and two complementary halves. It speaks of completion and equilibrium: living well with difference.',
    monolithMeaning: 'Completion, equilibrium and harmony; it echoes the nine-sided monolith itself',
    chargeForFuture: 'Balance tradition and change, elders and youth, men and women',
    colourHex: '#2B5B7A',
    colourName: 'Kameng Mountain Blue',
    notableReferences: [
      'Lt. Tade Takung Rang — First SSB Training (Haflong)',
      'Smti. Yagam Takung Rang — Gaon Buri',
      'Tapung Takung Rang & Beti Takung Rang — Respected Figures of Earlier Times',
    ],
  },
  {
    order: 6,
    slug: 'kocho',
    name: 'Kocho',
    earlySettlement: 'Joined Rang through kinship ties, led by three brothers',
    originVillage: 'Tallang Village',
    settlerLabel: 'Settlers',
    foundingAncestors: 'Abo Gappi, Abo Lalo and Abo Fecha',
    symbolTitle: 'The All-Seeing Triangle',
    symbolShort: 'Cosmic Eye in a Triangle',
    symbolImage: ASSETS.clanSymbols.kocho,
    symbolDescription:
      'An open eye within a protective triangle, ringed by rays of vigilance. It stands for historical awareness, far-sighted leadership and guardianship: vision as a form of responsibility.',
    monolithMeaning: 'Historical awareness, leadership vision and guardianship',
    chargeForFuture: 'Keep watch over every family',
    colourHex: '#6B341C',
    colourName: 'Guardian Terracotta',
    notableReferences: [
      'Late Lalo Kocho Rang — First Male Gaon Burah of Rang',
      'Lt. Mama Kocho — Reconstituted RVWC Chairman (1997) & Pillar of Rang',
      'Er. Mara Kocho — First IES Officer from Nyishi community, MD NEHHDC, RWS Chairman (2016–2020) & Author of Vision 2047',
      'Sh. Longpa Kocho Rang — Best Performing ASM (2018), Founding Youth Secretary (2000), RWS Secretary (2023–2026)',
      'Sh. Pacha Kocho — Chairman, RWS Silver Jubilee Organizing Committee',
      'Sh. Tawa Kocho Rang — 2nd Head Gaon Burah; Smti. Paka Kocho Rang — First Anganwadi Helper',
    ],
  },
  {
    order: 7,
    slug: 'dawe',
    name: 'Dawe',
    earlySettlement: 'Joined Rang through kinship ties, led by four brothers',
    originVillage: 'Loffa Village',
    settlerLabel: 'Settlers',
    foundingAncestors: 'Abo Tame, Abo Jelly, Abo Ropo and Abo Tallo',
    symbolTitle: 'The Latticed Celestial Wheel',
    symbolShort: 'Latticed Celestial Wheel',
    symbolImage: ASSETS.clanSymbols.dawe,
    symbolDescription:
      'A lattice of crossing lines, with nodes where they meet. The strength lies in the crossings: the woven fabric of society, collaboration and resilience. A community is a network, not a crowd.',
    monolithMeaning: 'The woven social fabric: collaboration and resilience',
    chargeForFuture: 'Work as a network rather than as camps',
    colourHex: '#4A5D4E',
    colourName: 'Woven Sage',
    notableReferences: [
      'Sh. Rafe Dawe Rang — Founding Chairman RVWC (1993)',
      'Er. Pai Dawe Rang — First Graduate, First Gazetted Officer, First RWS Chairman (2013–2016), Land Donor for Nyubu Nyegam Yerko',
      'Sh. Jardang Dawe Rang — First ASM (1981–1983) & Land Donor for Rang Primary School (1983)',
      'Dr. Yakar Dawe (Smti. Yakar Dawe Riang) — APPSC Circle Officer / EAC & First Female Gazetted Officer',
      'Smti. Mekap Dawe Rang — First Female Gaon Burah; Sh. Rakesh Dawe Rang — ASM (2004–2009) & RWS Chairman (2020–2023)',
      'Byangne Jadu Dawe (Priest), Er. Rajesh Dawe, Smti. Sueli Dawe Rang (First Women Wing President)',
    ],
  },
  {
    order: 8,
    slug: 'ribu',
    name: 'Ribu',
    earlySettlement: 'Joined Rang through cordial relations and kinship ties',
    originVillage: 'Rirang Village',
    settlerLabel: 'Settler',
    foundingAncestors: 'Abo Balang',
    symbolTitle: 'The Lotus',
    symbolShort: 'Lotus Flower',
    symbolImage: ASSETS.clanSymbols.ribu,
    symbolDescription:
      'The lotus rises from dark water and opens clean above it. It stands for perseverance, cultural grace and spiritual steadfastness: patient dignity in an age of haste.',
    monolithMeaning: 'Perseverance, cultural grace and steadfastness',
    chargeForFuture: 'Hold to dignity and perseverance',
    colourHex: '#8E4162',
    colourName: 'Lotus Plum',
    notableReferences: [
      'Integral founding clan represented on the eighth face of the Silver Jubilee Monolith',
      'Represented equally in the nine-clan Executive Council & Mediation Council under Rang Vision 2047',
    ],
  },
  {
    order: 9,
    slug: 'pimung',
    name: 'Pimung',
    alternateSpelling: 'Also recorded as "Pimong" in earlier village registers',
    earlySettlement: 'Ninth and final clan of the founding wave, closing the circle of Rang',
    originVillage: 'Tata Tara Village',
    settlerLabel: 'Settlers',
    foundingAncestors: 'Abo Nikje and Abo Kame',
    symbolTitle: 'The Star Grid',
    symbolShort: 'Star Polygon Within Rings',
    symbolImage: ASSETS.clanSymbols.pimung,
    symbolDescription:
      'A many-pointed star drawn in one continuous line within bounding rings. The ninth and last of the founding wave closes the circle: one unbroken line touching every point, binding all nine clans together.',
    monolithMeaning: 'Closes the founding circle; the unity that binds all nine clans',
    chargeForFuture: 'Keep the circle unbroken',
    colourHex: '#7A5C2E',
    colourName: 'Unbroken Bronze',
    notableReferences: [
      'Late Nadang Pimong Rang — First Government Employee & First Gram Member of Rang',
      'Sh. Sacha Pimong Rang — First General Secretary of RWS (2013–2016) & First Class X Pass',
      'Sh. Apung Pimong — First President of renamed Rang Youth Welfare Association (2013)',
    ],
  },
];

export const RESPECTED_FIGURES_EARLIER_TIMES: { no: number; name: string }[] = [
  { no: 1, name: 'Ata Tabang Rang' },
  { no: 2, name: 'Koda Tabang Rang' },
  { no: 3, name: 'Beku Tamar Rang' },
  { no: 4, name: 'Solung Tamar Rang' },
  { no: 5, name: 'Tani Tamar Rang' },
  { no: 6, name: 'Sering Tamar Rang' },
  { no: 7, name: 'Karu Lichi Rang' },
  { no: 8, name: 'Kepi Kocho Rang' },
  { no: 9, name: 'Lalo Kocho Rang' },
  { no: 10, name: 'Rapo Dawe Rang' },
  { no: 11, name: 'Jeli Dawe Rang' },
  { no: 12, name: 'Missa Tamar Rang' },
  { no: 13, name: 'Asha Tamar Rang' },
  { no: 14, name: 'Taping Lichi Rang' },
  { no: 15, name: 'Tapung Takung Rang' },
  { no: 16, name: 'Beti Takung Rang' },
  { no: 17, name: 'Narbo Kocho Rang' },
  { no: 18, name: 'Kadang Dawe Rang' },
  { no: 19, name: 'Dali Dawe Rang' },
  { no: 20, name: 'Dacho Dawe Rang' },
];

export const LANDSCAPE_GAZETTEER = {
  intro:
    'The land of Rang is described through its named places, streams and sites, recorded here in the traditional order from south to north along the Kameng River. Together they form a living map of the village, carrying the local names by which the community knows its territory.',
  kamengRiverPlaces: [
    'Langdung Langra',
    'Takam Langne',
    'Patap Palap',
    'Rojo Haaling',
    'Sangrik Langta',
    'Sangrik Bemey',
    'Langdo Sele',
    'Miba Anung',
    'Tabam Anung',
    'Satam Damta',
    'Hissap Langne',
    'Tari Suru',
    'Khyaung Rawe',
    'Rangso Haaling',
    'Sapa Anung',
    'Neko Anung',
    'Nenu Haaling',
    'Aya Satam',
  ],
  streams: [
    'Hajo So',
    'Tagung So',
    'Rehi So',
    'Ngaka So',
    'Rojo So',
    'Lungnirung',
    'Bikar So',
    'Tabam Soro',
    'Charwa',
    'Sedang So',
    'Kamcho So / Mambar So',
    'Boroh So',
    'Nyangpo So',
    'Lungrung Sai',
    'Cheme So',
  ],
  myokoSites: [
    'Debeyar',
    'Rota Langne',
    'Tapo Pu',
    'Langchung',
    'Rone Sehi',
    'Taluku',
    'Charwa',
    'Tamahwa',
    'Patine',
    'Sangrik',
    'Bularne',
    'Dalane',
    'Barfe Yarlo',
    'Ampe Langtam',
    'Langruk',
    'Jaga Langne',
    'Depu Tamdung',
    'Langye Putung',
    'Tapo Yarlo',
    'Jeli Hali Bangra Ko',
    'Zarung',
    'Pingdru',
    'Tapik Langta',
    'Tade Pobe',
    'Taluk Sero',
    'Pacha Morang',
    'Langrung Sehi',
    'Kamlang Sehi',
    'Yakapu',
    'Narangyar',
    'Deweyne',
    'Bemabung',
    'Sangkam Ne',
    'Sangpine',
    'Sarewa',
    'Chemo',
    'Sebikso',
  ],
  mountainPlaces: [
    'Kapuk Yarbe',
    'Passing Tara',
    'Ngerah',
    'Dori Ung',
    'Lalam Pu',
    'Tapik Langta',
    'Langra',
    'Wapu Pumey',
    'Wapu Putey',
    'Karta So',
    'Wabey',
  ],
};

export const HISTORICAL_AGREEMENTS: HistoricalAgreement[] = [
  {
    id: 'lungte-dapo-myora',
    title: 'Lungte-Dapo between Rang and Myora Villages',
    period: '18th Century',
    subtitle: 'The Sange Tree at Nyele Langpa — Over 200 Years of Friendship',
    paragraphs: [
      'One of the most significant agreements in the village’s history is the Lungte-Dapo, a friendly pact concluded between Rang and Myora villages in the eighteenth century. It symbolised the commitment of the two villages to maintain cordial relations, uphold peace and harmony, and support one another in times of adversity.',
      'As a symbol of the settlement and of their enduring friendship, a Sange tree was planted at Nyele Langpa. Over the years it grew into a gigantic landmark, a living testament to the bond of friendship and mutual understanding between the two villages. After standing for more than 200 years, the tree eventually fell. Its legacy endures, however, as a symbol of the Lungte-Dapo and of the long tradition of unity, cooperation and mutual support between Rang and Myora.',
    ],
  },
  {
    id: 'lungte-dapo-loffa',
    title: 'Lungte-Dapo between Rang and Loffa Villages',
    period: '1993 / 1994–1995 (see editorial date note)',
    subtitle: 'Joint Resource Protection & Exchange of Eight Mithuns',
    paragraphs: [
      'A second agreement was made between Rang and Loffa. Over the decades, Seppa Township and its surrounding areas saw significant population growth as people migrated from the villages to the town in search of better opportunities. The growing population put increasing pressure on the natural resources of nearby villages, leading to deforestation and widespread destruction of flora and fauna. Rang village, one of the land donors to Seppa Township, was among those most affected.',
      'Consequently, in 1994–1995 (also recorded as 1993 and 1995 in the Genesis chapter), under the leadership of Tado Tamar Rang and Rafe Dawe Rang, together with some intellectuals from Loffa village, a Memorandum of Understanding (MoU) was drawn up to regulate and curtail further development that could harm the interests of the two villages. In the Genesis account, the pact was marked by an exchange of eight Mithuns, four from each village, first at Loffa and then at Rang, with the strong support of village stalwarts including Lt. Norbo Kocho, Fedang Tamar, Kadang Dawe, Taping Lichi, and Misa Tamar.',
      'Rang and Loffa have historically enjoyed cordial cultural relations and mutual cooperation, strengthened by the financial and moral support they extended to each other during Assembly elections. Despite several decades of shared understanding, however, the relationship has not always been as harmonious as might be expected.',
    ],
  },
  {
    id: 'kapuk-myodi-dispute',
    title: 'The Kapuk Myodi Boundary Dispute',
    period: '2023 – Present (Documentary Record)',
    subtitle: 'Neutral Institutional Documentation of Territorial Proceedings',
    paragraphs: [
      'In 2023, tensions emerged when Loffa village expressed discontent over Rang village’s claim to Kapuk Myodi, an area understood to be a common mountain cliff associated with the villages of Torung Yangje, Lachung Yangje, Fangche, Loffa and Hamba Pinda. In response, the Loffa Welfare Society convened a general meeting on 4 November 2023 to discuss the matter.',
      'After prolonged deliberations, the meeting reportedly reached an amicable understanding that the Nenu Stream would serve as the natural boundary between the two villages, while the issue of Kapuk Myodi would be taken up for further discussion after proper verification of the relevant facts.',
      'Subsequently, however, Loffa village erected a notice board declaring Doripu as its northern boundary without the consent of Rang village. Rang strongly objected to this unilateral action, which further intensified the boundary dispute. The matter ultimately had to be brought before the competent Magistrate for resolution. The longstanding cordial relations between the two villages have since deteriorated, straining the mutual trust, understanding and cooperation nurtured over several decades.',
      'Because so much of the village’s history has been passed down by memory rather than in writing, recording these accounts is itself an important task for the community.',
    ],
  },
];

export const INFRASTRUCTURE_MILESTONES = [
  {
    year: '1983',
    title: 'Rang Primary School Established',
    detail:
      'Established through the dedicated efforts of the late Larta Dawe Rang and Jardang Dawe Rang (first ASM), who donated his own land for the school. Shaped generations and produced distinguished alumni including Shri Mara Kocho, IES.',
  },
  {
    year: '2004',
    title: 'Rang Welfare Society Registered',
    detail:
      'Officially registered in 2004 under the chairmanship of Pai Dawe Rang, marking a pivotal step toward organised community development (noted alongside formal record-keeping in 2001 and written bye-laws in 2013).',
  },
  {
    year: '23 May 2017',
    title: 'PMGSY Road Construction Begins',
    detail:
      'Road construction under the Pradhan Mantri Gram Sadak Yojana (PMGSY) commenced after 70 years of road deprivation since Independence.',
  },
  {
    year: '31 August 2017',
    title: 'First Vehicle Reaches Rang Village',
    detail:
      'A historic milestone symbolising progress and transformation, later recognized as a model PMGSY road in East Kameng District.',
  },
  {
    year: '2018',
    title: 'Best Performing ASM Award',
    detail:
      'Langpa Kocho awarded Best Performing Anchal Samiti Member of East Kameng District after establishing Rang’s tradition of consensus-based Panchayat selection.',
  },
  {
    year: '2020 / 2021',
    title: 'Nyubu Nyvgam Yerko (Gurukul) Established',
    detail:
      'Built on land donated free of cost by Er. Pai Dawe; inaugurated on 20 March 2021 by Hon’ble Chief Minister Shri Pema Khandu in the presence of Shri Kiren Rijiju. State’s first indigenous Gurukul blending CBSE curriculum with Nyishi wisdom.',
  },
  {
    year: '2025',
    title: 'Best GPC Award & National Leadership',
    detail:
      'Garbe Lichi Rang awarded Best Gram Panchayat Chairperson of East Kameng District (second consecutive district-level governance honour); Er. Mara Kocho serves as Managing Director, NEHHDC (Ministry of DoNER, Govt. of India).',
  },
  {
    year: '2026',
    title: 'Rang Primary School Closes Permanently',
    detail:
      'Rang Primary School closed permanently in 2026 owing to low enrolment, closing a 43-year chapter in village education.',
  },
];

export const MONOLITH_ESSAY = {
  title: 'The Silver Jubilee Monolith and the Nine Clans of Rang Village',
  opening:
    'Every community that lasts asks itself a quiet question: what do we want to be remembered for? On its twenty-fifth year, the Rang Welfare Society has answered with a monolith: one column of polished granite, nine-faced, banded in gold and crowned with the Silver Jubilee and Rang Welfare Society logos. Stone does not speak; people must teach it to. This essay reads the monolith as its designers intended, as an argument about who we are, where we came from and which way we intend to walk.',
  oneStoneNineFaces:
    'The monolith is carved from a single piece of granite and has nine faces, one for each clan that settled Rang in successive waves. No clan stands in front of another; walk around it and there is no “main side”. Wherever you stand, you face someone’s symbol, and it faces you. A village is not its largest clan, nor its oldest, nor its loudest. It is the whole circle, and the circle is cut from one stone: our differences are real, but our foundation is common.',
  symbolsIntro:
    'Each face carries the emblem of one clan, shown here in the order of settlement. Together they form the vocabulary of a good society: foundation, growth, continuity, warmth, balance, vision, connection, grace and unity.',
  twentyFiveBands:
    'Around the lower body of the monolith run twenty-five bands of gold, one for each year of the Society’s service. They are not one great slab of brightness but many fine lines laid patiently, one above the other, and that is how a society is built. No institution is raised in a day. Twenty-five years of service are made of countless small acts: a meeting attended, a dispute settled, a child helped to school, a neighbour accompanied through a hard season. Each is a thin line, easily overlooked; stacked together, they shine. The bands also bind, like hoops around a vessel, holding the nine faces as shared purpose holds the nine clans.',
  tapersUpward:
    'The monolith narrows as it climbs. The broad base, set on stepped tiers of granite, is the past: wide, heavy, settled. The narrowing shaft is the future: lighter, more focused, reaching. A society that looks forward must travel light, carrying its values but not its grudges, its memory but not its old divisions. As the years go on, the village should become more concentrated in purpose, not more scattered.',
  theCrown: [
    'At the summit, like a crown, sits a two-sided emblem. On one side is the Silver Jubilee logo: a green-and-gold medallion ringed with a laurel wreath, bearing the numeral 25 and a garland of many-coloured blossoms. On the other side is the logo of the Rang Welfare Society itself. The pairing is deliberate. One face marks time: twenty-five years, honoured with the laurel of achievement earned through effort, and with blossoms that may be read as the clans, different in hue but gathered in one wreath. The other face marks identity: the Society that carried the work through those years. A jubilee without an institution is only a date, and an institution without a milestone forgets how far it has come. Held together on one crown, they say that the Society’s purpose is service over time.',
    'The crown also turns. Standing in one place, a visitor sees the jubilee or the Society, never both at once; to take in the whole crown, one must walk around the monolith. That is a quiet lesson: no single vantage shows the whole village. The Society stands above the nine clans not as a ruler but as a shared roof, and a crown, rightly understood, is what a community agrees to hold above itself: its common purpose.',
  ],
  beyondTheStone:
    'Granite lasts; commitments do not, unless they are renewed. Let the monolith be read as a charge for the next twenty-five years: to build on sound foundations (Tamar), grow without forgetting our roots (Tabang, Doda), show warmth to the vulnerable (Lichi), balance tradition and change, elders and youth, men and women (Takung), keep watch over every family (Kocho), work as a network rather than as camps (Dawe), hold to dignity and perseverance (Ribu), and keep the circle unbroken (Pimung). Then, when a child asks, “Why does it have nine faces?”, the answer will also be a lesson in belonging, and the village will have grown taller as the column does: rooted in a broad base of history and ever more clearly pointed at the sky.',
};
