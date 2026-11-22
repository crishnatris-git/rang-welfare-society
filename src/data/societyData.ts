import { ASSETS } from './assets';

export interface OfficialMessage {
  id: string;
  senderName: string;
  designation: string;
  constituencyOrOffice: string;
  date?: string;
  portrait?: string;
  portraitPosition?: string;
  paragraphs: string[];
  signOff: string;
}

export interface AsmGpcRecord {
  slNo: number;
  name: string;
  role: string;
  from: string;
  to: string;
  photo?: string;
  note?: string;
}

export const SOCIETY_CONTACT = {
  organization: 'Rang Welfare Society (RWS)',
  tagline: 'One Village. One Family. One Future.',
  magazineTitle: 'RANG — THE 9 COLOURS',
  officeAddress:
    'Office of the Rang Welfare Society (RWS), Community Hall, Village Rang, PO/PS Seppa, East Kameng District, Arunachal Pradesh – 790102',
  email: 'rangwelfaresociety@gmail.com',
  phone: '9402757828',
  jubileeDate: '18–19 November 2026',
  distanceFromSeppa: 'Approximately 4 km from Seppa',
  censusVillageCode: '262015',
};

export const OFFICIAL_MESSAGES: OfficialMessage[] = [
  {
    id: 'chairman-rws',
    senderName: 'Er. Logo Rang',
    designation: 'Chairman, Rang Welfare Society',
    constituencyOrOffice: 'Office of the Rang Welfare Society, Village Rang, Seppa',
    date: 'Dated the 18th, November 2026 · Village Rang',
    portrait: ASSETS.dignitaries.logoRang,
    portraitPosition: 'object-[50%_18%]',
    paragraphs: [
      'Twenty-five years ago, Rang Welfare Society began with a simple belief that a village grows stronger when its people care for one another. Today as we celebrate our silver jubilee, we honour not only the passing of years but the kindness and shared effort that have filled them. It is my honour & privilege to welcome you to the silver jubilee celebration of the Rang Welfare Society. Today we commemorate 25 years of service, compassion & shared commitment to the welfare of our community.',
      'On behalf of the society, I offer my heartfelt thanks to our elders, members & every villager who has walked beside us throughout this journey. This occasion invites us to remember the past with gratitude & to greet the future with hope. Let us continue to stand families in need, encourage the dream of our young people & give our elders care & respect they deserve.',
      'May the spirit that brought us together remain alive in the years ahead & renew the bonds of unity & kindness that have sustained us for 25 years. This silver jubilee belongs to all of us & I’m honoured to celebrate it with you. Let us continue this journey together. Thank you for walking with us for 25 years.',
    ],
    signOff: 'With Regards, (Er. Logo Rang), Chairman, RWS',
  },
  {
    id: 'organising-chairman',
    senderName: 'Sh. Pacha Kocho Rang',
    designation: 'Chairman, RWS Silver Jubilee Organising Committee',
    constituencyOrOffice: 'RWS Silver Jubilee Organising Committee, Village Rang',
    date: 'Dated the 18th, November 2026 · Village Rang',
    portrait: ASSETS.dignitaries.pachaKocho,
    portraitPosition: 'object-[50%_30%]',
    paragraphs: [
      'It gives me immense pleasure and pride to extend warm greetings to all members, elders, youth, and distinguished guests on the Silver Jubilee Celebration of the Rang Welfare Society (RWS). Completing twenty-five years is a historic milestone—a testament to our collective wisdom, perseverance, sacrifice, and shared aspirations. Today, we look back with profound gratitude at our humble beginnings and honor the vision, dedication, and selfless contributions of our founding members and pioneers who built this strong foundation.',
      'This Silver Jubilee Souvenir serves as a cherished record of our milestones, memories, and cultural identity. I express my sincere appreciation to the editorial team, contributors, and well-wishers who made this publication possible. As we celebrate, let us remain guided by unity, mutual respect, and transparency. May this landmark occasion inspire our younger generation to embrace leadership, preserve our rich traditions, and work together for the continued progress and welfare of our society.',
      'My heartfelt congratulations go out to the entire Organising Committee, past and present leaders, volunteers, donors, and every member of RWS whose efforts made this grand celebration a reality. May Rang Welfare Society continue to flourish and reach greater heights in the years ahead.',
    ],
    signOff: 'With best wishes and warm regards, (Sh. Pacha Kocho Rang), Chairman, Organising Committee',
  },
  {
    id: 'mla-seppa-east',
    senderName: 'Sri Ealing Tallang',
    designation: 'Member of Legislative Assembly',
    constituencyOrOffice: '10th Seppa East (ST) Assembly Constituency, Arunachal Pradesh',
    portrait: ASSETS.dignitaries.ealingTallang,
    paragraphs: [
      'It gives me immense pleasure to extend my heartiest congratulations to all the members of Rang Welfare Society (RWS) on completing 25 years of its successful journey.',
      'On this momentous occasion, I commend RWS for setting a remarkable example of coexistence among nine (09) clans within a single village under one society, reflecting the true spirit of unity, harmony and collective progress.',
      'I also appreciate the Society and its members for their valuable contributions towards social, economic and cultural development, as well as for nurturing capable individuals who are serving in various administrative and technical fields, particularly in the Engineering sector.',
      "The Society's efforts towards preserving our indigenous faith, culture and heritage are equally commendable, especially in contribution for establishment of State's first Nyibu Nyagum Yarko (Gurukul) at Rang Village. This pioneering initiative sets an inspiring example for other communities and future generations.",
      'In conclusion, I extend my warm greetings and best wishes to the entire Rang Welfare Society, with sincere appreciation for demonstrating how unity and collective efforts can lead to social, cultural and educational progress.',
      'Heartiest congratulations and best wishes for a grand and memorable Silver Jubilee celebration!',
    ],
    signOff: '(Ealing Tallang), MLA 10th Seppa East (ST)',
  },
  {
    id: 'mla-bameng',
    senderName: 'Shri Kumar Waii',
    designation: 'Member of Legislative Assembly',
    constituencyOrOffice: '8-Bameng Assembly Constituency, Arunachal Pradesh',
    portrait: ASSETS.dignitaries.kumarWaii,
    paragraphs: [
      'It gives me immense pleasure to learn that the Rang Welfare Society (RWS) is celebrating its Silver Jubilee, marking 25 glorious years of dedicated service and commitment towards community development.',
      'On this momentous occasion, I extend my heartfelt congratulations and best wishes to the office bearers, members and well-wishers of the Society. Over the years, RWS has served as an important platform for fostering unity, preserving our rich cultural heritage, promoting social harmony and working towards the collective progress and welfare of our people.',
      'This Silver Jubilee is not merely a celebration of the past 25 years but also an opportunity to reflect upon our achievements and renew our commitment towards a brighter future. I particularly encourage the younger generation to actively participate in community affairs, uphold our traditional values and contribute meaningfully towards education, social development and the overall welfare of society.',
      'I am confident that Rang Welfare Society will continue to grow from strength to strength and play an instrumental role in building a united, progressive and prosperous community.',
      'Once again, I congratulate the entire RWS fraternity on this historic milestone and convey my best wishes for the grand success of the Silver Jubilee celebration and the souvenir publication.',
    ],
    signOff: 'With best wishes! (KUMAR WAII), MLA 8-Bameng',
  },
  {
    id: 'mla-chayang-tajo',
    senderName: 'Shri Hayeng Mangfi',
    designation: 'Member of Legislative Assembly & Advisor to Minister WRD',
    constituencyOrOffice: '9-Chayang Tajo A/C, Govt. of Arunachal Pradesh',
    portrait: ASSETS.dignitaries.hayengMangfi,
    paragraphs: [
      'It gives me immense pleasure and honour to extend my warmest congratulations and heartfelt greetings to the Rang Welfare Society (RWS) on the momentous occasion of its Silver Jubilee Celebration, commemorating 25 glorious years of dedication, unity, service and commitment to society. Twenty-five years is not merely a milestone in the passage of time, it is a remarkable journey of collective aspirations, perseverance, sacrifices and achievements.',
      'Over the years, RWS has made noteworthy contributions to the growth and transformation of Seppa Township through its active role in promoting social development, community participation and public welfare, while also contributing to the larger vision of progress, harmony and development of Arunachal Pradesh as a whole. On this auspicious occasion, I encourage the Society to carry forward its noble mission with renewed determination, unity and a progressive outlook. May RWS continue to serve as a strong platform for social welfare, community development, youth empowerment, preservation of indigenous traditions and promotion of peace and mutual understanding.',
      'The Silver Jubilee is an occasion to honour the visionaries, founding members, past leaders, dedicated office bearers and every individual whose sincere efforts and invaluable contributions have shaped the Society into what it is today. Their commitment and selfless service will continue to inspire generations to come. Let this Silver Jubilee not only be a celebration of past achievements but also a renewed commitment towards a brighter, more united and prosperous future. I firmly believe that collective responsibility, mutual cooperation and a shared vision are the foundations upon which a stronger society can be built.',
      'Once again, I convey my sincere congratulations and best wishes to the entire Rang Welfare Society family on completing 25 glorious years. May the Society continue to achieve greater milestones and remain a beacon of unity, service and progress in the years ahead.',
      'With best wishes for a grand and memorable Silver Jubilee Celebration!',
    ],
    signOff: 'Warm Regards, Hayeng Mangfi, MLA 9-Chayang Tajo A/C',
  },
  {
    id: 'dc-seppa',
    senderName: 'Yashashwini B (IAS)',
    designation: 'Deputy Commissioner, East Kameng District',
    constituencyOrOffice: 'Office of Deputy Commissioner, East Kameng District, Seppa, Arunachal Pradesh – 790102',
    portrait: ASSETS.dignitaries.yashashwiniIas,
    paragraphs: [
      'It gives me immense pleasure to learn that the Rang Welfare Society is bringing out a Souvenir to commemorate the Silver Jubilee of Service and Community Development of Rang Village, East Kameng District, Arunachal Pradesh.',
      'The Silver Jubilee is a momentous occasion that celebrates not only twenty-five years of dedicated service and collective achievements but also the spirit of unity, cooperation and commitment towards the welfare and development of the community. It is an occasion to acknowledge the valuable contributions of community leaders, elders, youth, social workers and all those who have worked tirelessly for the progress and well-being of Rang.',
      'On this memorable occasion, I extend my heartfelt congratulations and best wishes to the Rang Welfare Society and the people of Rang Village.',
      'I wish the Silver Jubilee celebration and the publication of the Souvenir every success.',
    ],
    signOff: '(Yashashwini B) IAS, Deputy Commissioner, East Kameng District, Seppa',
  },
];

export const RWS_BYELAW_OBJECTIVES: string[] = [
  'To foster fraternity, integrity and a sense of belonging among Rang villagers;',
  'To bring out the hidden talents of the people for the village’s greater interest;',
  'To create awareness so that the village can cope with the changing pace of development;',
  'To prevent division in the name of religion, region, sect, clan or creed;',
  'To encourage good educational institutions and scholarships;',
  'To preserve and promote the village’s cultural heritage, and to document its orally transmitted folklore, folk songs, folktales and folk dances;',
  'To reform the village into a refined and scientific society;',
  'To render humanitarian service to the needy; and',
  'To institute awards and citations that recognise individual contributions to the village’s upliftment.',
];

export const ASM_GPC_BOARD: AsmGpcRecord[] = [
  {
    slNo: 1,
    name: 'Sri Jardang Dawe Rang',
    role: 'Anchal Samiti Member (ASM)',
    from: '1981',
    to: '1983',
    photo: ASSETS.leaders.jardangDawe,
    note: 'First ASM of Rang; donated land for Rang Primary School (1983).',
  },
  {
    slNo: 2,
    name: 'Sri Rachung Lingfa',
    role: 'Anchal Samiti Member (ASM)',
    from: '1983',
    to: '1987',
  },
  {
    slNo: 3,
    name: 'Lt. Raling Lingfa',
    role: 'Anchal Samiti Member (ASM)',
    from: '1992',
    to: '1996',
  },
  {
    slNo: 4,
    name: 'Sri Rakesh Dawe Rang',
    role: 'Anchal Samiti Member (ASM)',
    from: '2004',
    to: '2009',
    photo: ASSETS.leaders.rakeshDawe,
    note: 'Later served as RWS Chairman (2020–2023).',
  },
  {
    slNo: 5,
    name: 'Smti. Mecheri Dawe Rang',
    role: 'Anchal Samiti Member (ASM)',
    from: '2009',
    to: '2013',
  },
  {
    slNo: 6,
    name: 'Sri Longpa Kocho Rang',
    role: 'Anchal Samiti Member (ASM)',
    from: '2013',
    to: '2019',
    photo: ASSETS.leaders.longpaKocho,
    note: 'Established consensus-based Panchayat selection; awarded Best Performing ASM of East Kameng District (2018).',
  },
  {
    slNo: 7,
    name: 'Sri Sangkam Tamar (C/T)',
    role: 'Gram Panchayat Caretaker / Chairperson',
    from: '2019',
    to: '2021',
    photo: ASSETS.leaders.sangkamTamar,
    note: 'Recorded among Rang’s first Gram Chairpersons alongside Smti. Padak Tamar Rang.',
  },
  {
    slNo: 8,
    name: 'Sri Gorbe Rang',
    role: 'Gram Panchayat Chairperson (GPC)',
    from: '2021',
    to: '2026',
    photo: ASSETS.leaders.gorbeRang,
    note: 'Awarded Best Gram Panchayat Chairperson of East Kameng District in 2025 (also recorded as Garbe Lichi Rang).',
  },
  {
    slNo: 9,
    name: 'Smti. Mepe Sangdo Rang',
    role: 'Gram Panchayat Chairperson (GPC)',
    from: '2026',
    to: 'Present',
    photo: ASSETS.leaders.mepeSangdoRang,
  },
];

export const HEAD_GAON_BURAHS = [
  {
    order: '1st Head Gaon Burah',
    name: 'Sh. Fedang Tamar Rang',
    photo: ASSETS.leaders.fedangTamarHgb,
    note: 'First Head Gaon Burah; also among Rang’s first five to attend SSB training at Haflong.',
  },
  {
    order: '2nd Head Gaon Burah',
    name: 'Sh. Tawa Kocho Rang',
    photo: ASSETS.leaders.tawaKochoHgb,
    note: 'Unanimously selected Second Head Gaon Burah during the 2023–2026 RWS term.',
  },
];

export const GAON_BURAHS_AND_BURIS = [
  { slNo: 3, name: 'Sh. Jardang Dawe Rang', role: 'Gaon Burah' },
  { slNo: 4, name: 'Sh. Ramjo Tamar Rang', role: 'Gaon Burah' },
  { slNo: 5, name: 'Sh. Solo Dawe Rang', role: 'Gaon Burah' },
  { slNo: 6, name: 'Smti. Mekap Dawe Rang', role: 'Gaon Buri (First Female Gaon Burah of Rang)' },
  { slNo: 7, name: 'Smti. Asamni Dawe Rang', role: 'Gaon Buri' },
  { slNo: 8, name: 'Smti. Migung Kocho Rang', role: 'Gaon Buri' },
  { slNo: 9, name: 'Smti. Yagam Takung Rang', role: 'Gaon Buri' },
  { slNo: 10, name: 'Smti. Meku Tamar Rang', role: 'Gaon Buri' },
];

export const FOUNDING_GROUPS = {
  unofficialRvwc: {
    title: 'Founding Members of RWS (Un-official / RVWC, 1991–2013)',
    members: [
      { name: 'Sh. Rafe Dawe Rang', role: 'Founding Chairman (1993)', photo: ASSETS.leaders.rafeDawe },
      { name: 'Lt. Tado Tamar', role: 'Founding Secretary (1993/1994)', photo: ASSETS.leaders.tadoTamar },
      { name: 'Lt. Mama Kocho', role: 'Reconstituted Chairman (1997)', photo: ASSETS.leaders.mamaKocho },
    ],
  },
  youthAssociation2000: {
    title: 'Founding Rang Youth Association (ARYWS, 2000)',
    members: [
      { name: 'Sh. Kaya Rang', role: 'Founding President (2000)', photo: ASSETS.leaders.kayaRang },
      { name: 'Sh. Longpa Kocho Rang', role: 'Founding Secretary (2000)', photo: ASSETS.leaders.longpaKocho },
    ],
    rywa2013Note:
      'In 2013, the All Rang Youth Welfare Society was renamed the Rang Youth Welfare Association (RYWA), with Sh. Apung Pimong as President and Sh. Biman Dawe Rang as Secretary, serving as the Society’s enforcing arm.',
  },
  officialRws2013: {
    title: 'Founding Members of RWS (Official Constitution & Written Bye-Laws, 2013)',
    members: [
      { name: 'Er. Pai Dawe Rang', role: 'First Chairman (2013–2016)', photo: ASSETS.leaders.paiDawe },
      { name: 'Sh. Sacha Pimong Rang', role: 'First General Secretary (2013–2016)', photo: ASSETS.leaders.sachaPimong },
    ],
    womenWingNote:
      'The RWS Women Wing began under the leadership of Smti. Sueli Dawe Rang as President and Smti. Sima Rang as Secretary.',
  },
};
