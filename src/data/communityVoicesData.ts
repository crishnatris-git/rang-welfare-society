import { ASSETS } from './assets';

export interface VoiceArticleSection {
  heading?: string;
  paragraphs: string[];
  lessonLearnt?: string;
}

export interface VoiceArticle {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  authorCredential?: string;
  category: 'Cultural & Historical' | 'Personal Memoir' | 'Youth Perspective' | 'Social Reflection';
  readingMinutes: number;
  excerpt: string;
  heroImage?: string;
  sections: VoiceArticleSection[];
  disclaimer?: string;
}

export interface VoicePoem {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  authorNote?: string;
  stanzas: string[][];
}

export interface NyishiRiddle {
  id: number;
  nyishi: string;
  nyishiAnswer: string;
  english: string;
  englishAnswer: string;
}

export const VOICE_ARTICLES: VoiceArticle[] = [
  {
    slug: 'crossroads-of-tradition-and-progress',
    title: 'Rang Village: A Community at the Crossroads of Tradition and Progress',
    author: 'Dr. Robin Hissang',
    authorCredential: 'Principal, Government College, Seppa, East Kameng District, Arunachal Pradesh',
    category: 'Cultural & Historical',
    readingMinutes: 8,
    excerpt:
      'A scholarly and deeply personal portrait of Rang Village within East Kameng’s historical evolution—chronicling the 2003 relief march, oral traditions of Late Norbo Kocho, Byangne Kadang Dawe, and the rise of Nyubu Nyegam Yerko.',
    heroImage: ASSETS.landscapes.heroRangHills,
    sections: [
      {
        heading: 'A District in Transition',
        paragraphs: [
          'Arunachal Pradesh was once known as the North-East Frontier Agency (NEFA) and remained constitutionally part of Assam until 1972. Given its strategic importance and the peculiar nature of its problems, it was administered by the Ministry of External Affairs until 1965 and thereafter by the Ministry of Home Affairs, through the Governor of Assam acting as Agent of the President of India.',
          'The administrative map was redrawn several times. The Tirap Frontier Tract was created in 1943 from parts of the Lakhimpur and Sadiya Frontier Tracts. In 1946 the Balipara Frontier Tract was divided into the Sela Sub-Agency and the Subansiri area. In 1965 the remaining frontier divisions were renamed Kameng, Subansiri, Siang, Lohit and Tirap districts. Following the Arunachal Pradesh District Act of 1980, Kameng was split into East Kameng (the erstwhile Seppa Subdivision) and West Kameng (the erstwhile Bomdila division). The name Kameng comes from the river Kming, a tributary of the Brahmaputra.',
          'East Kameng is a young district, poised between tradition and modernity, which is the most crucial phase in the life of any civilisation. The 2011 Census recorded a population of 78,680 (38,775 males and 39,915 females), a density of 19 persons per sq. km and a sex ratio of 1,029 females per 1,000 males. Literacy stands at 63.19 per cent for men and 46.87 per cent for women; of the 26,914 literate persons, 15,103 are men and 11,811 are women. Women outnumber men, yet they trail in literacy. Rural-to-urban migration is high, and it can be checked only by bringing modern amenities to rural areas.',
        ],
      },
      {
        heading: 'Profile of Rang Village',
        paragraphs: [
          'Rang is a rural settlement about four kilometres from Seppa, the district headquarters. It falls under Seppa Circle and is part of the Seppa West area. The Census of India records 478 residents (221 men and 257 women) in 64 families, all of them Nyishi. The sex ratio is 1,163 females per 1,000 males. Overall literacy is 58.2 per cent (men 71.6 per cent, women 46.9 per cent). That gap of roughly a quarter of the population is wide, and it deserves the serious attention of Rang’s own educated community. Gram Panchayat Rang functions under rural local self-government (census village code 262015).',
          'Rang gave much of the land on which the Seppa township stands, especially New Seppa, home to institutions such as Jawahar Navodaya Vidyalaya, the veterinary department’s poultry farm and Saint Joseph Secondary School.',
          'The village belongs to the wider indigenous cultural landscape of East Kameng, in which Nyishi traditions shape community life. The traditional village council, the Nyelle, still functions effectively alongside its modern counterpart, the Rang Welfare Society. Clan relationships and customary practices remain well preserved, as do indigenous faith, rituals, festivals, oral traditions, traditional knowledge of forests, agriculture and natural resources, the indigenous language, traditional houses, ornaments and material culture.',
        ],
      },
      {
        heading: 'Rang’s Contribution to Nation Building',
        paragraphs: [
          'Every contribution, whether by an individual or a society, adds up at the macro level to the growth of the country. Service to the village for its general welfare is service to the area and the district, and work for the community’s wellbeing is, in the end, nation building. In that spirit, the elders, indigenous priests, women and youth of Rang who sustain the cultural continuity of Arunachal Pradesh are contributing to the nation, to Bharat.',
        ],
      },
      {
        heading: 'My First Encounter with Rang',
        paragraphs: [
          'I first learnt of Rang in 2002, when I was in the first semester of my MA in Political Science at what was then Arunachal University (now Rajiv Gandhi University) at Rono Hills, Doimukh. I had been elected President of the East Kameng Middle Zone Students Union (EKMZSU), a post I held from 2002 to 2005. In 2003 a fire swept through Rang and completely gutted the houses of the late Kadang Dawe, Rige Dawe and Modi Dawe. Fortunately, no lives were lost.',
          'When the news reached us, the EKMZSU decided to carry out two days of mass social service, with night halts and relief material, in collaboration with the Rang Youths Society, led by Shri Kaya Rang and Shri Longpa Kocho. Shri Kaya Rang, who was also Finance Secretary of the EKMZSU, guided us on a foot march from New Seppa along the hill porter track to the uphill village. Many friends and colleagues joined the team, among them Shri Biro Langdo, Shri Lota Yangda, Shri Shila Singhi, Shri Hasang Tok, Shri Fecha Lamgu, Shri Doto Yame, Shri Choi Singhi, Shri Karbia Haffi, the late Lada Dada, Ms. Sonaki Gungli, Ms. Bobi Yame and Ms. Sumila Natung. We reached Rang at 4:00 PM on 19 November 2003. The villagers gave us a warm reception, with a big pig offered by Shri Chabu Dawe, and I was lodged for the night in the house of the late Norbo Kocho, then the village headman.',
          'I have long kept a diary, and I had one with me then. Late Norbo Kocho was a tall, dignified man. We began with the usual chat about my parents, and soon he was narrating the folk story of Abo Tanyi. There were no Android phones or SIM cards in Arunachal Pradesh in those days, so I wrote down everything in my diary. His first story was Niya-Nima (Abo Tanyi and the Tiger), on the genesis of Byopia. The second was Aming-Kwring, on how toys were made. I had heard the story of Niya and Nima from my father too, but never that of Aming-Kwring. I wrote it down out of sheer curiosity. Today I realise its worth. I later rewrote it as an article, which became an authentic source on the Indian knowledge system: “Aming-Kering: Traditional Toy/Puppet Making System of Arunachal Pradesh with Special Reference to Nyishi Tribe”, published in the popular Indian magazine Heritage Explorer.',
          'After two days of service, carrying every required item up from the jungle, the team returned on the afternoon of 21 November 2003. As we left for Seppa, the Rang youths presented us with another Ragma, a whole roasted pig.',
          'In Nyishi civilisation, everything has its genesis in a body of practical knowledge, but with no written tradition, oral literature is steadily being lost. Late Norbo Kocho was a treasure house of indigenous knowledge, and he died with it. When a figure who is a living dictionary passes away, a great deal of knowledge and many ideas pass with him. I am grateful to him for sharing that treasure and for inspiring me to reflect on ancestral faith, culture and heritage.',
          'Another memory comes from 2011. While visiting my native village, Silla, I noticed that at the house of Shri Roko Sangdo the Rochung Wingnam, a chicken-liver omen test, was being chanted. I learnt that an elderly priest (Nyubu), Byangne Kadang Dawe, was chanting to select the offering (Pwrw) for a ritual. Out of curiosity I stayed to listen. When the liver was read after the full chant, it seemed to point to a mithun, and some senior experts from Silla recommended it. After examining the omen closely, however, Byangne Kadang said, “No, this sign does not approve a mithun. I do not agree with you. In my judgment, the earlier omen, for a male pig, was better than this one. Let us finalise the pig.” All present, myself included, accepted his judgment. A few months later he performed the ritual with a pig, and Kai Logo Sangdo, the ailing person, recovered fully. The episode showed me an honest priest of true spiritual standing, a messenger who served ordinary people through his priestly power. I still cite him as an example of the integrity and role of the Nyubu in society.',
        ],
      },
      {
        heading: 'Rang’s Contribution to the Development of Arunachal Pradesh',
        paragraphs: [
          'The people of Rang have been associated with the Nyokum Yullo celebration at Pampoli since 1975, as members of the organising committee and even as priests. Jardang Dawe served as organising secretary in 1976 and the late Larta Dawe in 1977. Shri Longpa Kocho was secretary in 2023 and Shri Bogitram Rang organising chairman in 2024. Although they stayed away on the last day of the Golden Jubilee celebration in 2025, they supported me, at my personal request, in the inauguration of the Golden Jubilee Nyokum Yullo monolith at Pampoli. Their contribution cannot be overlooked, for it upheld the core values of the festival. Rang villagers have likewise led from the front in the Nyokum Yullo celebration at Seppa since its inception, a contribution beyond measure.',
          'A landmark achievement is the Nyubu Nyegam Yerko at Rang, built on land donated free of cost by Er. Pai Dawe. This holistic institution keeps alive the heritage of the Nyishi indigenous faith community. It was inaugurated on 20 March 2021 by Shri Pema Khandu, Hon’ble Chief Minister of Arunachal Pradesh, in the presence of Shri Kiren Rijiju, then Minister of State (Independent Charge) for Youth Affairs and Sports and Minister of State for Minority Affairs, Government of India. The Rang Welfare Society played an immense role in the early social service for the school and donated a mithun for the inaugural lunch.',
          'The name itself is a statement of purpose: Nyubu means priests, Nyegam means intellectuals or skilled orators, and Yerko means a place of learning. The institution blends modern education with the ancient gurukul model and is a joint venture of indigenous faith organisations, the Donyi Polo Cultural and Charitable Trust and Vivekananda Kendra Vidyalaya, Kanyakumari. The Vidyalaya teaches the CBSE curriculum based on NCERT syllabi, while the indigenous organisation teaches traditional knowledge. The Yerko aims to build self-control, character, knowledge of nature and its place in human life, social awareness, and healthy, alert and responsible young people, combining modernity with indigenous knowledge while preserving shamanism, tradition and culture and studying change and continuity in today’s context. It also carries forward the teachings and dreams of Swami Vivekananda for India.',
          'Education is entirely free, and students are drawn mainly from poor and Below Poverty Line families. Co-curricular activities teach the importance of nature and co-existence, the altars of various rituals, forms of cultivation and ritual festivals, shamanic chanting, folktales and folklore, and indigenous healing practices. To teach the Nyishi language, the Council for Nyishi Language Research and Training was constituted on 30 August 2019 to develop the language and its syllabus for the Yerko. The institution has now become a tourist destination and a model for other Yerkos (gurukuls) in Arunachal Pradesh, a real contribution to the state.',
          'Rang has also produced people of distinction. Er. Mara Kocho, now Managing Director of the North Eastern Handicrafts and Handlooms Development Corporation, Guwahati, is the first Indian Engineering Service officer from the Nyishi community and from East Kameng district. He discharges his official duties sincerely in several capacities and plays a pivotal role in positive social change in Arunachal Pradesh. Er. Pai Dawe, Executive Engineer in the Water Resource Development Department, was born and raised in Rang, and works to preserve and protect the indigenous faith and culture of the state. Er. Rajesh Dawe, Executive Engineer in the Department of Power, serves as Finance Secretary of the Nyishi Elite Society, the apex social body of the Nyishi community. Er. Logo Rang, Assistant Engineer in the Rural Works Department, also hails from Rang. Many more officers, officials, public figures and leaders, too numerous to name, serve in different capacities.',
          'The legacy of the ancestors is being carried to the younger generation by priests and orators such as Shri Jardang Dawe, Byangne Fedang Tamar, Byangne Manyang Dawe, Byangne Tawa Kocho, Shri Rakesh Dawe, Byangne Ragung Doda and Byangne Jadu Dawe. Their work for the preservation and promotion of Nyishi culture and indigenous knowledge is a great service.',
        ],
      },
      {
        heading: 'Rang: A Village of Potential',
        paragraphs: [
          'In my understanding, Rang is one of the most promising villages in Arunachal Pradesh, able to contribute to the growth of East Kameng in particular and the state as a whole. Rich in human resources, it can play an important role in development. Its proximity to Seppa leaves scope for donating more land for the township’s expansion. It is well placed for cultural preservation and the promotion of Nyishi identity, and it can contribute greatly to documenting the indigenous knowledge system of the Nyishi people.',
          'Tourism offers further promise. The Rang viewpoint gives scenic views of Seppa and the surrounding hills, and the green mountains, fresh air and gentle slopes suit trekking and hiking. Rang can therefore be developed as a model of indigenous cultural preservation, sustainable rural development and community-based tourism, without losing its traditional and cultural identity.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'The socio-cultural and political system is in transition, but it must not lose its core cultural values. In this context, Rang has contributed to preservation through teaching and learning, particularly through voluntary support for the Yerko (gurukul). Judged by current trends, the villagers and the leading group under the Rang Welfare Society are moving in the right direction, and their methods are well suited to all-round development.',
          'The present Tari bridge, the hanging bridge linking the main Bazar line with New Seppa, was once known as the Rang Bridge. That name could be reasserted to restore Rang’s rightful place in history. The Society might even move to rename the hanging bridge as Rang Bridge, or after an eminent figure from the village, for no one can deny Rang’s role in the development and expansion of the Seppa township.',
          'Finally, I sincerely advise the youth to uphold the high moral values and cultural ethos handed down by their ancestors, and to follow the example of the village’s present team of intellectuals, so that Rang may fulfil its promise and inspire the government, other societies and other tribes.',
        ],
      },
    ],
  },
  {
    slug: 'harvesting-rituals-kipung-and-dampung',
    title: 'The Harvesting Rituals of the Nyishi – The Legend of Kipung and Dampung',
    author: 'Pai Dawe',
    authorCredential: 'Advisor, Rang Welfare Society',
    category: 'Cultural & Historical',
    readingMinutes: 6,
    excerpt:
      'In Lwbv and Rallw Polo, the Nyishi celebrate Rwkdam and Rwkling—rooted in the sacred ancestral legend of Abo Tani, loyal dog Kipung, graceful deer Dampung, and Ayo Dwngar, divine mother of food grains.',
    sections: [
      {
        paragraphs: [
          'The months of October and November, known in the Nyishi calendar as Lwbv and Rallw Polo, mark the most sacred period of the year for the Nyishi community—the time of the Harvesting Rituals. These rituals are not merely a celebration of abundance but a spiritual thanksgiving to nature, ancestral spirits, and Ayo Dwngar, the divine mother of food grains, who first taught humankind the sacred art of agriculture.',
          'Across the diverse Nyishi-inhabited regions, this festival is celebrated under different names. In East Kameng, it is called Rwkdam or Rwkling, while in Papum Pare, Kamle, and other regions, it is known as Jvrphi or Empar Benam. Yet, regardless of name or dialect, the soul of the celebration remains one — gratitude, reverence, and remembrance of the divine origins of cultivation.',
        ],
      },
      {
        heading: 'The Ancient Legend of Kipung and Dampung',
        paragraphs: [
          'The roots of the Nyishi harvest ritual lie deep in the ancient legend of Kipung (the dog) and Dampung (the deer), whose tale embodies the timeless bond between nature, animals, and humankind.',
          'Long ago, when the earth was still young and unscarred by human greed, Abo Tani, the great forefather of the Tani clans, lived in harmony with the forest. He had not yet discovered the art of growing food and survived only on wild fruits, roots, and whatever the forest offered in mercy. His only companion was a loyal dog named Kipung, who shared his hunger and his hope.',
          'One fateful day, while wandering deep into the jungle, Kipung met a graceful deer named Dampung. Despite their differences, they became friends. Dampung often shared with Kipung the tender shoots of Oyak (Poulzolziahirta) and other edible wild plants. Grateful for her kindness, Kipung invited Dampung to visit his master, Abo Tani.',
          'When Dampung arrived at Tani’s humble hut, she saw how little he had — only scraps of roots and bark to eat. As Abo Tani ate, Kipung stared eagerly, watching every movement of his master’s hand. Amused by the dog’s behaviour, Dampung laughed softly, but Kipung, embarrassed and angry, barked sharply. Startled, Dampung fled into the forest.',
          'In her frightened rush, she stepped into a bamboo vessel filled with Hikung Ladung, the fermented bamboo soup that gave off a sharp, stinging smell. From that day, it is said, the deer’s feet carry that peculiar odour — a mark of the ancient mishap.',
        ],
      },
      {
        heading: 'The Flight and the Offering',
        paragraphs: [
          'As Kipung chased her relentlessly, Dampung ran toward the mountains and pleaded for their protection. To appease the mountains, she offered her gallbladder as tribute. The mountains accepted her offering, and from that moment, the deer has been without a gallbladder — a mystery explained by this very legend. Where her gallbladder fell, the golden herb Rangka (Coptisteeta) grew, known even today for its healing powers.',
          'But Kipung, furious and loyal to her master, threatened to burn the mountains and destroy everything that sheltered Dampung. The mountains trembled and surrendered. Fleeing again, Dampung ran toward the river and sought refuge there. Yet, even the river quaked in fear when Kipung vowed to poison its waters.',
          'Finally, exhausted and desperate, Dampung reached a place called Dwllu Rang, where the plains opened into vast fields of golden grains — rice swaying gently in the wind. Kipung, catching up, stopped in awe. The sight of the rice fields filled her with wonder. Forgetting her anger, she gently took a few grains, hiding them in her ear and between her claws, and hurried back to Abo Tani.',
        ],
      },
      {
        heading: 'The Gift of Ayo Dwngar',
        paragraphs: [
          'When Abo Tani saw the grains, he was astonished by their beauty and golden hue. Yet he did not know how to cultivate them. He scattered the seeds upon loose, rooted soil — but nothing sprouted. Frustrated, he blamed the forest creatures and killed some to inspect their stomachs, only to find nothing. Disheartened, he sat in despair, believing he was not destined for abundance.',
          'One evening, as the sun sank behind the hills, an old woman appeared before him, radiant yet humble. She revealed herself as Ayo Dwngar, the divine goddess of food grains. Moved by Abo Tani’s struggle and faith, she took pity on him. From her body, she drew forth the seeds of rice, millet, maize, and pulses, and taught Abo Tani how to nurture them.',
          'She instructed, “Observe the world around you — the call of birds, the hum of insects, the bloom of flowers. Nature speaks. Learn its rhythm, and your fields shall never go barren.”',
          'With devotion and patience, Abo Tani followed her guidance. When the time came, he harvested his first golden grains. Overwhelmed with joy, he offered his thanks to Ayo Dwngar and shared the bounty with Kipung, whose loyalty had brought him the sacred seed of life.',
        ],
      },
      {
        heading: 'The Birth of the Harvesting Ritual',
        paragraphs: [
          'From that divine beginning arose the Harvesting Ritual of the Nyishi, a sacred time to express gratitude to Ayo Dwngar, Kipung, and even Dampung, whose sacrifice led humanity to the discovery of rice. During these rituals, the Nyibu (priest) chants the story of Kipung and Dampung, and elders retell the legend to younger generations by the warmth of the hearth, preserving the wisdom of the ancestors through word and memory.',
          'Each grain harvested is seen not just as food but as a living spirit, born from divine compassion and the unity of all living beings — human, animal, and nature.',
        ],
      },
      {
        heading: 'A Vanishing Tradition & A Call to Remember',
        paragraphs: [
          'Today, however, this sacred storytelling is fading. The deep chants of the Nyibu are being replaced by loud modern celebrations — “harvesting parties” that often forget the roots they sprang from. The ancient ritual of thanksgiving to nature risks being reduced to mere entertainment.',
          'When we forget the story of Kipung and Dampung, we lose more than a folktale — we lose our connection to the soil, to gratitude, and to the rhythm of life itself.',
          'As Nyishis, it is our moral and spiritual duty to preserve and pass on these ancestral stories. These legends are not just myths; they are the moral compass of our identity, guiding us toward harmony with the natural world. Let us, as parents, elders, and guardians of tradition, revive the art of storytelling — around fires, in schools, during harvests — so that our children may inherit not just our lands, but the soul of our culture.',
          'May the tale of Kipung and Dampung continue to echo in every song, every harvest, and every heart that beats beneath the Nyishi sky.',
        ],
      },
    ],
  },
  {
    slug: 'my-village-memoirs-tales-from-rang',
    title: 'My Village Memoirs: Tales from Rang',
    author: 'Mara Kocho',
    authorCredential: 'Advisor, RWS · Managing Director, NEHHDC (IES)',
    category: 'Personal Memoir',
    readingMinutes: 10,
    excerpt:
      'Humorous, tender, and deeply wise childhood recollections from 1980s Rang—from a cold winter dawn tap and the 1983 school strike to cinema film strips, paddy weeding, one-rupee tea, and truck rides to Pampoli.',
    sections: [
      {
        heading: 'The Earliest',
        paragraphs: [
          'The winter dawn in Rang was dark and bitterly cold. I was fast asleep on my mother’s back, bundled tightly in traditionally woven cloth in the way every Nyishi mother carries her baby. The morning chill crept over my tender face and poked at my tiny feet, as if politely trying to wake me up.',
          'It did not stay polite for long. A sudden spray of ice-cold water landed on my face and jolted me awake. I gasped for breath, half-drowned and half-suffocated, and wriggled with all the strength my little body had. It was no use. My mother, entirely unbothered, kept jerking her shoulder to shake me off while both her hands stayed busy at the tap, washing whatever needed washing. A baby’s protest, I learnt early, carries little weight against a mother on a schedule.',
          'That was my very first memory: the moment I became aware of the world. And the world, it turned out, was cold and wet.',
          'My second memory is not much more glamorous. My elder cousin, Aii Koro Kocho, who was later married off to Sibidar of Hamba Pinda Village, was minding me one fine morning, this time carrying me on her chest. Suddenly a thick, mushy something was passed into my mouth, mouth to mouth, the way children were once fed in those days. For the first time in my life, I felt nausea. The terrible taste brought it right back up, and I made my feelings about that breakfast very clear.',
          'I sometimes wonder how old I could have been then. Either I had an extraordinary memory as a child, or some experiences are simply too memorable to forget.',
        ],
        lessonLearnt:
          'Life does not ask for our consent before it begins. The cold water and the strange food taught me early that comfort is a gift and not a guarantee, and that we grow by being awakened, however rudely.',
      },
      {
        heading: 'First Education',
        paragraphs: [
          'In 1983, the opening of a new school in our village was the biggest news anyone could remember. For me, unfortunately, it was bad news. My father had decided I would not be going. I was the obedient one, more obedient than my elder brother, the late Mama Kocho, and my father reasoned that if I went off to school, he would be left with nobody to look after him. Besides, I had a full-time job already: babysitting my younger sister, Yadang Kocho.',
          'But school fascinated me beyond words, and so I did what any future administrator would do. I negotiated. I told my father, very clearly, that if he does not let me go to school, I would stop babysitting my sister. It was my first labour strike and my first successful collective bargaining, with a collective of exactly one. I won. I was in school on the very first day, and I still remember the first letter I ever wrote, a wobbly “A” on a dotted workbook supplied by the school. I have written many letters since, and I confess that none has given me quite the same pride.',
          'Pathak Sir was the first teacher posted at Government Primary School, Rang, but his stay lasted only a few months. Living alone in a brand-new school in the middle of the wilderness was no small test, and it did not help when he found a snake inside his quarters. Nobody blamed him for leaving. He was succeeded by Mukherjee Sir, who had a daily routine of calling out across the village, every morning and evening, “Tado, Assi Malak Takke!”, which means “Tado, fix the water supply!” In hindsight, the tap that drenched me as a baby had now become the school’s most important officer.',
          'Teachers who joined later included Kalita Sir, who taught us patriotic songs such as “Saare Jahan Se Acchha, Hindustan Hamara” as well as Assamese songs “Ae Mati re Moro Mote”, and Sharma Sir, Chutia Sir and Bhuyan Sir, along with a few others whose names have slipped from my memory, but whose kindness has not. These men came to a remote village with little comfort and gave us our first window to the wider world.',
        ],
        lessonLearnt:
          'Nobody hands you an opportunity on a plate. If something matters, ask for it, bargain for it, and be willing to give up something in return. And never forget the teachers who walked into the unknown so that we could learn.',
      },
      {
        heading: 'The Childhood Play',
        paragraphs: [
          'In the late 1980s, the Rang volleyball team was the pride of the village. Names like Tari Tamar, Sacha Rang, Pai Dawe, Logo Rang, the late Mama Kocho and others made it unbeatable at village-level championships, and trophies came home in good numbers through the late ’80s and early ’90s. The credit, everyone agreed, belonged to Sacha Rang, who taught us volleyball, football and hockey, long before anyone in Rang had heard of a “sports policy”.',
          'But the real fun of childhood, for my generation and those after us, was brought by Pai Dawe. He would pick up a new thing or two in Seppa and bring it back to the village for us to enjoy. He once carried home pieces of old, discarded cinema film, hung up a white cloth as a screen, and with the help of a torch cast the still frames onto it. It was not exactly Bollywood. It did not move, it had no sound, and the hero never changed his pose. But to children who had never seen a cinema hall, it was pure magic, and I count it as my first experience of the movies.',
          'He also taught us games. There was Pitthu, in which one side stacked seven flat stones and the other side tried to smash the tower with a ball, while the first team rebuilt it before being hit. I admit I do not remember the rules perfectly now, which is probably why I never became a champion. There was Danchyo Baaji, our own village version of hide-and-seek, played among the bushes, where one’s main enemies were thorns and ants. The one sighted the other won the game. And there was the funny one we called Laro-Putti, played with a long stick, a small wooden piece and a little trench in the ground. You flicked the small piece up and struck it as far as you could, and the farther it flew, the more points you scored. Only years later did I learn that the rest of India calls it Gilli-Danda. We had been playing an international sport all along, without knowing it.',
          'Those days remain unforgettable because Pai Dawe taught us so much, like a true elder brother, and what we learnt from him we could never have learnt from a book.',
        ],
        lessonLearnt:
          'Joy needs very little: a stick, some stones, a torch and a good-hearted elder. A single person who shares what he knows can enrich an entire generation.',
      },
      {
        heading: 'The Forgettable — The Great Paddy Weeding',
        paragraphs: [
          'Every childhood has chapters one would like to forget but never can. Here are a few of mine.',
          'One day, Taro Kocho, Digi Kocho and I went to the jhum field belonging to the late Paii Malai Takung, somewhere between Boro Soh and Sadang Soh. Taro, being the eldest, had a brilliant idea. “Let us weed this field,” he declared, and he pointed out which plants were the weeds. Digi and I, the polite and obedient juniors, followed without a question. By the time we were done, we had cleared a patch of at least ten feet by ten feet. Of weeds, there were none. Every single plant we had so carefully uprooted was rice.',
          'When Paii Malai discovered the damage, he caught the three of us and thrashed us black and blue. We richly deserved every bit of it, and I hold no grudge to this day. It was my first lesson in agriculture and in agricultural economics, delivered with some force.',
        ],
        lessonLearnt:
          'Blind obedience is not a virtue. Ask questions before you follow, even if the one leading you is older and sounds sure. A confident voice is not always a correct one.',
      },
      {
        heading: 'The Price of a Malpua',
        paragraphs: [
          'The late Langte Hano, one of my stepmother’s brothers, lived with us in those days. One afternoon he returned from Seppa with a packet of malpuas, those golden, syrupy fried sweets that were pure luxury for us village children. He sat down and began eating them right in front of Taro, Digi and me. We were helpless. We would have traded anything we owned for a bite. He was not ready to share even a crumb.',
          'As we stared at him without blinking, he finally named his price. If we wanted a piece, we would have to blow a puff of air on his backside (Koyung Mikna). Dignity and desire fought a short battle in three small hearts, and desire won easily. Over and over we puffed, and each time we were rewarded with a tiny piece of malpua. Later we gave the episode a name that cannot be printed in a respectable magazine, and we laughed about it for years.',
        ],
        lessonLearnt:
          'Hunger and craving can make us bargain away our self-respect. A sweet that costs your dignity is the most expensive sweet in the world.',
      },
      {
        heading: 'The Stick Fight',
        paragraphs: [
          'Another time, the three of us were coming back from Taluku, which is now Charwa Colony, New Seppa, in the evening. Our cousin Boga Kocho handed each of us a stick. On the way he ordered Taro and Digi to fight each other with them. I watched my two companions whack each other black and blue for no reason at all. When the show was over, he made us run uphill towards the village, and he ran behind us, swatting whoever he could reach.',
          'For the older boy it was great fun. For the younger ones it was not fun at all, and it was plainly wrong.',
        ],
        lessonLearnt:
          'Strength is for protecting, not for amusing oneself at the expense of the weak. How an elder treats the young is the truest measure of his character.',
      },
      {
        heading: 'The One-Rupee Tea',
        paragraphs: [
          'One day, the late Ranyang Dawe and I carried firewood to Seppa to sell. I had a one-rupee note in my pocket, a fortune in those days, when a rupee bought two cups of tea. Feeling like a millionaire, I invited him to tea at Gamsang Rimo’s hotel on the Seppa bazaar line. He did not believe me. Even after I said it again, he insisted I check my pocket. I was absolutely sure the note was in my back pocket, so I proudly refused, and we ordered the tea.',
          'We drank it slowly, like lords. Then came the bill, and I reached for my pocket with a flourish, and the flourish froze. The note was gone. I whispered the terrible news to Ranyang, who scolded me in a low voice. Then, with the waiter looking elsewhere, we did the only sensible thing: we ran. The waiter spotted us and gave chase, but two boys who have just stolen tea run much faster than a man with a tray. We outran him and laughed about it later, though my conscience was not laughing quite as loudly.',
        ],
        lessonLearnt:
          'Check your pocket before you order the tea. Never promise what you have not verified, and never confuse confidence with cash.',
      },
      {
        heading: 'The Stream Nobody Warned Us About',
        paragraphs: [
          'Every year, in the dry season, the village organised community fishing at Aya Sahtam and KapakSahtam on the bank of Kameng river. One year it was held at KapakSahtam, led from the front by the late Tadi Tamar, the late Darje Tamar, the late Donyi Kocho, Ramjo Tamar and others. When the day’s fishing was done, it was already dark, and the late Tadi Tamar led us children, Boccho, Digi and me among them, back towards the village.',
          'Along the way, thirst got the better of us. We came upon a small stream, and nobody knew where it came from. We asked Tadi Tamar if the water was safe. “Yes,” he said, quite casually. We scrambled down and drank happily. Only when we had finished did he burst into laughter. A few metres further, we found out why: the stream was running past the carcass of many dead pigs. He had known all along, and he had let us drink it.',
          'Strangely, none of us fell ill, which I put down to the stomach of a village child and the mercy of the gods of Rang.',
        ],
        lessonLearnt:
          'A casual “yes” can be costly. Look before you drink, verify before you trust, and when you are in charge of the young, never find your amusement in their ignorance.',
      },
      {
        heading: 'PPA Party Zindabad!',
        paragraphs: [
          '“PPA Party Zindabad! PPA Party Zindabad!” was the first political slogan I ever heard in my life. I do not remember the year, but we were told that the late Mepe Dada was contesting the Assembly election, and that he was offering free truck rides from Seppa to Pampoli. We had never travelled in a truck or a bus before, let alone a car or a jeep. For the children of Rang, this was the biggest opportunity ever.',
          'We walked down to Seppa with no money and no food, just our excitement. We waited the whole day without eating, and by the afternoon we managed to clamber onto a truck full of party supporters. Each of us was handed a flag (I truly cannot recall whose) and told to shout “PPA Party Zindabad!” all the way to Pampoli and back. And so, we travelled, and we shouted, and we waved.',
          'By the time we returned to Seppa, we were exhausted, drained, and our stomachs were completely empty. Then we were told the same trip would be repeated the next day.',
          'Somehow, we all decided to stay back in Seppa for another round, because riding in a truck was such a thrill. We spent the night at Jardang Dawe’s house, without a morsel of food. By morning, our energy had left us altogether. The truck, the flag, the slogans, nothing was tempting any more. We chose to head home.',
          'On the way I discovered something remarkable. After a certain point, extreme hunger stops feeling like hunger. The body was close to collapse, and I could hardly take a step. Then a thought came: perhaps if we ate something, even leaves from the wayside, the hunger would return to normal and the body would wake up. We picked some leaves we believed were edible and ate them. To my surprise, the hunger did come back to normal, and with it came a little strength. We walked on, and we reached home safely.',
          'I think of that journey often. In the end, nobody had won the election for us, and we had won nothing from the rally except an empty stomach. But somewhere between Seppa and Rang, a hungry boy learnt that the body can be tricked, the mind can be steadied, and one can always find a little something to carry on.',
        ],
        lessonLearnt:
          'Never follow the crowd on an empty stomach. Free rides are rarely free. But when life leaves you with nothing, keep walking, and look around: there is usually something small and humble that will carry you home.',
      },
      {
        heading: 'Looking Back',
        paragraphs: [
          'Today I sit in offices far from that cold tap and those muddy paths. Yet when I think of Rang, I do not remember the hunger, the beatings or the embarrassments. I remember the laughter that came after each of them. We had no toys, no screens, and often no food, but we had each other, and the elders who scolded us, taught us, teased us and, in their own rough way, raised us.',
          'Many of the people in these pages are no longer with us. I have written their names with love, and with a smile, because that is how I remember them. If these stories bring back a memory or a chuckle to anyone who grew up in a village like mine, then Rang has done its job once again.',
        ],
      },
    ],
    disclaimer:
      'These anecdotes are loosely based on the writer’s recollections of his early childhood and are shared purely in a spirit of nostalgia, humour and gratitude. Some events, dialogues and details may have been dramatised or altered with the passage of time, and any resemblance to actual happenings may be only partial. The names of persons, living or departed, have been mentioned with affection and respect, and no incident is intended to malign, offend or hurt the feelings of any individual, family, community or institution.',
  },
  {
    slug: 'life-story-of-kanchak-lichi-rang',
    title: 'My Village, My Home – Rang (The Life Story of Kanchak Lichi Rang)',
    author: 'Raaj Krishna Swamy Rang',
    category: 'Personal Memoir',
    readingMinutes: 5,
    excerpt:
      'A loving memorial to Kanchak Lichi Rang—the gifted young dancer of Monkey Dancing and Daliya Dancing who represented his hill village in Itanagar and carried Rang in his heart until his passing.',
    sections: [
      {
        paragraphs: [
          'Up in the hills, about four kilometres from town, lies a beautiful village surrounded by mountains, greenery, and breathtaking views. From here, one can see the entire town below. The fresh mountain air, peaceful environment, sound of birds, and natural beauty make this place truly special. This village is called Rang.',
          'To many people, it may seem like just a small village in the hills, but for one young boy, it was his entire world. That boy was Kanchak Lichi Rang.',
          'Born and raised in Rang, his childhood, memories, happiness, friendships, and dreams were all deeply rooted here. For him, the village was not merely a place to live; it was his home, his identity, and his greatest source of joy.',
          'Kanchak loved everything about his village. He loved waking up to the song of birds, walking along the narrow village paths, playing with his friends, sitting with the elders, and soaking in the quiet beauty of nature. He enjoyed gazing at the mountains, looking down over the town, and simply spending time with the people around him.',
          'What made Rang even more special to him was its community. In the village, people treated one another like family. They shared in each other’s joys and sorrows, helped one another through difficult times, and stood together whenever someone needed support. There was a rare bond among the villagers—one that cannot be found just anywhere.',
        ],
      },
      {
        heading: 'A Boy with a Passion for Dancing',
        paragraphs: [
          'Beyond his love for his village, Kanchak had a remarkable talent for dancing. To him, dance was not just a hobby; it was something that brought pure joy to his heart. He was especially known for his skill in Monkey Dancing and Daliya Dancing.',
          'Whenever there was a cultural celebration or village gathering, his talent made him stand out. He danced with his own distinct style, energy, and passion, using movement to express his happiness and his deep connection to his culture and traditions.',
          'His gift also created opportunities to perform beyond his village. One of the proudest moments of his life was travelling to Itanagar to participate in a crew dance performance at the Indigenous Faith Youth Festival. For a young boy from a small hill village, earning such an opportunity was a milestone. It proved that talent does not depend on where a person comes from—with passion and dedication, even someone from the smallest village can reach a larger stage.',
        ],
      },
      {
        heading: 'A Love That Never Changed',
        paragraphs: [
          'As Kanchak grew older, many of his friends began dreaming of moving to larger towns and cities, believing that urban life offered better homes, better jobs, and greater opportunities.',
          'Kanchak had dreams of his own and wanted to achieve great things in life. Yet, no matter how far life might take him, he never wanted to forget where he came from.',
          'To him, the true beauty of life was not measured by wealth, expensive houses, or the fast pace of a city. Instead, it was found in the simple moments of village life: the laughter of friends, the love of family, the kindness of neighbours, the sounds of nature, and peaceful evenings in the hills. He understood that while a village may look small on a map, the love and memories it holds can be bigger than the world itself.',
        ],
      },
      {
        heading: 'A Life That Became a Memory',
        paragraphs: [
          'Time passed, and life continued to move forward. The young boy who once walked the village paths, played with his friends, danced with joy, and admired the beauty of Rang became a cherished part of the village’s history.',
          'Today, Kanchak Lichi Rang is no longer physically with us. He passed away a few months ago, leaving behind memories that will forever remain close to the hearts of those who knew and loved him.',
          'Although he is gone, his story has not ended. His childhood memories, his gift for dance, his love for his people, and his bond with his village will continue to live on. Whenever someone looks out at the mountains surrounding Rang, walks along its narrow paths, or gazes down at the town from the hilltop, those sights bring him back to mind.',
          'Perhaps this is what makes a person truly unforgettable—not how long they live, but how deeply they touch the lives of others. The village remains the same. The mountains still stand tall, the birds still sing each morning, and the view of the town below remains unchanged. Yet for everyone who remembers Kanchak, Rang will forever carry a piece of him. He was born in Rang, he grew up in Rang, and Rang will always remain a part of his story.',
        ],
      },
    ],
  },
  {
    slug: 'rang-village-our-home-our-pride',
    title: 'RANG Village – Our Home, our pride',
    author: 'Malo Lichi Rang',
    authorCredential: 'Daughter of Garbe Lichi Rang · BSc 2nd Year, 3rd Semester',
    category: 'Youth Perspective',
    readingMinutes: 3,
    excerpt:
      'Reflections on lineage, grandfather Abo Taping Lichi, and why belonging to Rang means carrying forward its unity, history, and traditions.',
    sections: [
      {
        paragraphs: [
          'The name Rang is believed to have come from a stream called Rang So, which flows through the village. It is a beautiful village situated under Seppa, East Kameng District, surrounded by beautiful mountains and nature.',
          'The first major lineages were Tachang, Taabang, Taanmar and Taanda. Later different clans like Tabang, Tamar, Doda, Takung, Lichi, Kocho, Pimung, Ribu and Dawe joined together and formed the present Rang village. My family also has a special connection with Rang village. My grandfather Abo Taping Lichi was a highly respected priest in our community. He was well known and respected by the people of village.',
          'Rang is not only known for its history but also for its unity and peaceful environment. The people here live like one big family. Whenever someone faces any problem or difficulty, everyone comes together to help. Nobody is left alone during difficult times. We celebrate together, laugh together and enjoy our time with one another.',
          'I may not have grown up there, but I feel proud to belong to a village with such a beautiful history. I believe that knowing our roots is important because our past tells us who we are and where we belong. I hope that coming generations will continue to respect our ancestors, protect our culture, preserve our traditions and maintain the unity that makes Rang different. Development is important but keeping our identity, values and relationship alive is equally important.',
          'Sometimes, we don’t understand the value of a place until we hear the stories of those who grew up there. I wish the old people who built this village could see how far it has come today. My Rang village is special not because of how big it is, but because of the people, memories, love and unity that make it a home.',
        ],
      },
    ],
  },
  {
    slug: 'the-legend-of-nyangpo-soh',
    title: 'The Legend of Nyangpo Soh',
    author: 'Kaya Rang',
    authorCredential: 'Founding President, ARYWS & Former Secretary, RWS',
    category: 'Cultural & Historical',
    readingMinutes: 3,
    excerpt:
      'A haunting oral tradition woven into the quiet stream flowing through the center of Rang Village—and the midnight sound heard on moonless nights.',
    heroImage: ASSETS.landscapes.nyangpoSohStream,
    sections: [
      {
        paragraphs: [
          'Nestled in the heart of Rang village flows a quiet, modest watercourse known to every resident as Nyangpo Soh. Though it may appear to the outside eye as merely a small, unassuming river meandering through the center of the settlement, it occupies a profound and chilling place in the collective memory and folklore of our community.',
          'What makes this gentle stream so famous across in the village is not its size or depth, but the eerie legend tied to the darkest nights of the year. According to ancestral lore passed down through generations, the stream becomes the haunting ground of a spirit known as the Nyangpo—believed to be the wandering soul of a woman who tragically lost her life during pregnancy.',
          'During the moonless nights of every month, when darkness blankets the riverbank and the village falls into absolute silence, an unmistakable presence is said to emerge along the waters. Villagers recount hearing a rhythmic, echoing sound cutting through the stillness: “Tok, tok, tok, tok, tok…” Legend says that the restless spirit wanders along the edge of the stream to gather tache (river crabs), her movements heralded by this distinct, repetitive tap.',
          'For the people of Rang village, this tale is far more than an ordinary campfire ghost story; it is a living oral tradition intertwined with the landscape itself. Elders caution the young against venturing too close to the riverbank during moonless hours, keeping the memory and solemn reverence of the Nyangpo alive. Whenever travellers or neighbours ask why this modest stream bears the name Nyangpo Soh, any villager will readily recount the tale of the midnight footsteps by the water.',
          'Today, Nyangpo Soh continues to flow quietly through our village, serving as a reminder of our ancestors’ beliefs, the mysteries that linger in nature, and the poignant folklore that forever shapes our cultural heritage.',
        ],
      },
    ],
  },
  {
    slug: 'between-generations-nyishi-families',
    title: 'Between Generations: Listening Across the Gap in Nyishi Families',
    author: 'Someen Kocho',
    category: 'Social Reflection',
    readingMinutes: 4,
    excerpt:
      'Bridging language, livelihood, and lifestyle differences between elders and youth through Elder-Youth Circles, storytelling evenings, and Vision 2047.',
    sections: [
      {
        paragraphs: [
          'Every family has its moments when a younger member just doesn’t quite get what an elder is trying to say. The elder may well mean no harm at all, but the gap in experience and in the way of life between the generations can be quite wide. In the Nyishi family this is manifest in the changing lifestyles, values, opportunities and indeed the way of looking at the world. A generation is defined by the time in which they grow up. The older generations grew up in a world where life was essentially based around farming, traditional cultivation, community and culture. The younger generation today are much more likely to move to the cities for their education and their jobs, and as a result are exposed to a whole range of different ways of life, different technologies and different cultures.',
          'These changing environments have an impact on language, on the way we parent, on our values and on our expectations in terms of careers. The older generation will tend to be very much in the tradition, very much focused on family and stability. The younger generation are much more likely to be looking for independence and new things to do. The language issue is also a big one with the increasing use of Hindi and English as well as Nyishi which can make communication within the family very difficult. The result is that a young person growing up away from Arunachal Pradesh may not be very confident in their mother tongue at all. A bigger worry is the slow erosion of cultural knowledge. The Nyishi language, the Nyokum festival, the folktales, the songs, the traditional crafts and the traditional agricultural practices are all an integral part of the community’s identity. If that knowledge isn’t being passed on then it’s going to become increasingly alien to the next generation.',
          'Bridging the generation gap requires effort from both sides. Storytelling evenings, screen free family meals and intergenerational skill sharing are all ways of facilitating real interaction. The younger generation can share their knowledge of the technology they use, the older generation can share their knowledge of traditional cultivation methods, farming practices, crafts, songs and the like. At the community level we can have initiatives such as Nyishi language learning programmes, Elder-Youth Circles, cultural documentation and support for traditional livelihoods to reinforce these links. That way cultural preservation can remain an integral part of community development.',
          'Looking to Vision 2047, the future of Rang should be one of development without the loss of cultural identity. Education, employment and economic opportunity must all develop in tandem with the preservation of language, culture and indigenous knowledge. The generational divide doesn’t have to be a problem. The experience and knowledge of the older generation can be combined with the ideas and ambitions of the younger generation to produce a much stronger and more cohesive community.',
          'Progress should never entail forgetting one’s roots.',
        ],
      },
    ],
  },
  {
    slug: 'weight-of-expectations-growing-up-as-a-woman',
    title: 'The Weight of Expectations: Growing Up as a Woman',
    author: 'Jurjum Kocho',
    category: 'Social Reflection',
    readingMinutes: 4,
    excerpt:
      'A candid eighteen-year-old voice from Rang calling for equal opportunities, dignity, shared household responsibilities, and the courage to question unfair expectations.',
    sections: [
      {
        paragraphs: [
          'Growing up as a girl, I have often heard people telling women how they should dress, behave, speak and even live their lives. There always seems to be a certain way society expects a woman to be. But what makes me wonder is, why do these expectations exist, and why are women still expected to follow them without questioning anything? I am only eighteen, and I know I still have a lot to experience, but even at this age, I have seen enough to realise that equality is something we still need to work towards.',
          'In my own community, I have seen women put their dreams aside for their families. I have seen them stay quiet even when they had every right to speak, and adjust to situations that made them unhappy simply because that was what they had been taught to do. Sometimes, it feels like a woman’s responsibilities are always noticed, but her own dreams and feelings are forgotten. What bothers me most is that many of these things are considered normal, just because they have been happening for generations.',
          'For me, this is exactly why feminism matters. I don’t see feminism as a fight against men or an attempt to prove that women are better than them. I see it as a fight for equal opportunities, respect and freedom. Every woman should have the right to decide what she wants to study, what she wants to wear, what career she wants to pursue and what kind of life she wants to live. These decisions should not have to depend on whether society approves of them.',
          'I also feel that patriarchy has a lot to do with the way these expectations have become so common. In many families, men are naturally seen as the decision-makers, while women are expected to adjust and compromise. The problem is that people have followed these ideas for so long that they have started treating them as traditions. But just because something has been practised for years does not mean it is always right. We should be able to question certain traditions instead of blindly following them. I believe that change does not always have to begin with something big. Sometimes, it starts with a simple conversation at home, a girl being encouraged to follow her dreams or a boy being taught that household responsibilities are not just a woman’s duty.',
          'We need to raise girls who are confident enough to speak for themselves, but we also need to raise boys who understand and respect equality. I may be eighteen, and I may not know everything about the struggles women have faced over the years, but I do know that no woman should feel guilty for having dreams of her own. She should not have to choose between her happiness and her family, or stay silent just to keep everyone else comfortable.',
          'To me, feminism is not about wanting special treatment. It is about wanting the freedom to live without unnecessary restrictions and the right to be treated as an equal. And honestly, I don’t think that is too much to ask for.',
        ],
      },
    ],
  },
  {
    slug: 'silver-roots-to-golden-branches',
    title: 'From Silver Roots to Golden Branches: Shaping the Next Decade of Rang',
    author: 'Lisha Rang',
    category: 'Youth Perspective',
    readingMinutes: 2,
    excerpt:
      'A future doctor’s pledge on the Silver Jubilee to build healthcare in Rang Village so that today’s silver roots grow into golden branches by the Golden Jubilee.',
    sections: [
      {
        paragraphs: [
          'I have always heard my father reminisce about how they used to sit by the fire & listened to elders talk about the early days of Rang village. The stories were filled with pride of its heritage & culture. And today as we hear the bells of our silver jubilee ringing, it is also the auspicious day to look back in time and also see how far we have come. For a young person like me standing at this milestone, I find myself looking more forward thinking how we can nurture our silver roots so they can grow into golden branches.',
          'Every silver root / (youth) will grow apart into different branches contributing to different aspects of our village. For me, I would like to contribute towards the health & longevity of folks of our village. Health being the most significant part of a human life and getting to contribute to that part is immense blessing. When I choosed this path of becoming a doctor I have always envisioned about providing / establishing a healthcare system in our village. In few years soon after graduating I want to turn this vision into reality. All this vision wouldn’t be possible without my parents. Both my parents made sure to keep me connected to my roots and enlightened me how important it is to be in touch with my culture & heritage.',
          'After a decades from now when the community gathers for golden jubilee, I want them to look back at this exact moment, and think the silver jubilee was more of a promise in building the RANG VILLAGE of dreams / pride of EAST KAMENG.',
        ],
      },
    ],
  },
  {
    slug: 'rang-a-part-of-our-family-strong',
    title: 'RANG: A Part of our Family Strong',
    author: 'Miss Melo Litchi Rang',
    authorCredential: 'Daughter of Gorbe Rang',
    category: 'Youth Perspective',
    readingMinutes: 2,
    excerpt:
      'Knowing Rang through a father’s childhood stories—and why a father’s birthplace forever lives in the heart of the next generation.',
    sections: [
      {
        paragraphs: [
          'Rang is not just a village for us, it is the place where my father was born, where he spent his childhood and made so many memories. Later, our family shifted to Seppa, and we started a new journey there, Rang was never forgotten in our family. While growing up, I heard so many stories about Rang from my father. He told us about his childhood, the people, the surroundings, the traditions and the simple life he once lived there.',
          'I used to imagine how the village looked during his childhood, how people lived there & how beautiful those days must have been. I was not there to experience those moments but through his stories, I have slowly built my own connection with Rang.',
          'I hope the beauty, culture, traditions and history of Rang continue to live for generations. Sometimes our connection to a place begins with the stories told by our parents. Rang village will always be special to me not only because it is my father’s birthplace but because it is a part of who we are and where our family comes from.',
          'I know Rang through my father’s stories, and I hope one day I can create my own memories. A place my father calls Home will always have a special place in my Heart.',
        ],
      },
    ],
  },
  {
    slug: 'building-the-missing-bridge',
    title: 'Building the Missing Bridge: Ensuring We Keep Our Roots',
    author: 'Meshi Dawe',
    category: 'Youth Perspective',
    readingMinutes: 5,
    excerpt:
      'A blueprint by a young Rang writer proposing a living online heritage archive uniting Elders, Fluent Speakers, and the Younger Generation—the very spirit embodied in this digital platform.',
    sections: [
      {
        paragraphs: [
          'More and more youths from our village and hometown are leaving every year. We go to further our education, start new careers and plan our future. Although this is a great thing, many in myself and the next generation are losing our connection to our hometown. We visit our homes over holidays but feel like we’re guests in our own village. Many of us now cannot fluently speak our mother tongue nor understand the true meanings behind our special village customs, festivals and ways of life.',
          'This isn’t because the youth don’t care. We simply don’t have a bridge between our modern education and our ancestral roots.',
          'A simple solution would be to create a living online archive which contains everything about our village translated and written down so that no child will feel detached from their roots.',
        ],
      },
      {
        heading: 'Three Key Groups Needed to Build the Bridge',
        paragraphs: [
          '1. Our Elders: Our grandparents and great grandparents and other elderly people within the community will have seen the start and changes throughout our village. These people will have grown up doing the traditions we want to understand. They will have stories passed down to them from previous generations. They will know about our history and traditions and will know all about our rituals and culture. We need to make an effort to ensure we keep our elders’ knowledge.',
          '2. Fluent Speakers: We will need people who are fluent in our mother tongue. They will be able to help us bridge the gap between our elders and younger generations. They’ll be able to help us understand the stories and knowledge passed down by our elders. They will translate and explain what our elders are saying. This is really important as some of us may not be too confident in our native language.',
          '3. Younger Generation: We (the younger generation) may not know our language or our traditions but we can be curious and keen to learn. We can take the initiative to listen to our elders, ask questions, write down the stories and organise them. We can use the technology we have to keep them safe.',
        ],
      },
      {
        heading: 'Simple Steps Forward',
        paragraphs: [
          '1. Gather the Stories: Every time we go into our village we can sit down with our grandparents and other elders. We can ask them about their experiences and write down the history of our village. Find out where our local festivals started, traditional stories and the stories passed down through generations. Record or write down what they say!',
          '2. Find out the Meaning of our Rituals: Ask our elders to help us understand why we do certain traditions. Find out where they came from and what they mean to us. Ask them about the beliefs and traditional knowledge they have. There is so much we may not know about our culture.',
          '3. Translation: Those who are fluent in our mother tongue can help translate the stories, conversations and cultural knowledge. We can record our elders speaking in our native language and translate them. This will help us slowly become familiar with how our language is spoken.',
          '4. Create an Online Archive: We can put all these stories, translations, pictures and recordings into an easy to access online archive. We can start with a simple blog, digital booklet, shared folder or community. As more people get involved we can slowly create an archive of our village’s history, language and cultural knowledge.',
          'This gives us an opportunity to engage with others. As we listen to the stories and find out the meaning behind our traditions we will become curious. We may ask more questions, become interested in our history and traditions and be encouraged to learn more about our mother tongue.',
          'Learning a language takes time and we don’t need to become fluent to start understanding our culture. We can make an effort to learn our language and can simultaneously learn about our culture and begin to appreciate it. This project can help us learn about our roots and become interested in our language. Most importantly this knowledge should be something we can pass onto others. So next coming generations can have access to it.',
          'When our young people leave our village to chase their dreams they shouldn’t lose their identity. By using the experiences of our elders, knowledge of our fluent speakers and curiosity of our younger generation we can create a bridge. Let’s create this bridge together so our younger generation can always connect back to their roots no matter how far they go.',
          '“Generations may grow apart in time and experience, but may they never grow too far from the roots that connect them.”',
        ],
      },
    ],
  },
];

export const VOICE_POEMS: VoicePoem[] = [
  {
    slug: 'the-village-that-watched-me-grow',
    title: 'THE VILLAGE THAT WATCHED ME GROW',
    author: 'Takar Dawe',
    authorNote: 'Father’s name – Shankar Dawe, Mother’s name – Mooni Dawe',
    stanzas: [
      [
        'As I travel along the other side of my life,',
        'The joy in my heart is wearing out.',
        'Those lovely eyes of nature,',
        'Watching me through my life,',
        'Now must watch me leaving her shadows.',
      ],
      [
        'Those trees witnessed my playfulness',
        'These rivers knew my innocence.',
        'Those people who watched my childhood',
        'Are now slowly turning grey.',
      ],
      [
        'Growing old was the wish I used to have,',
        'Now I seek the child inside me.',
        'To travel along with life',
        'Some footprints have to fade silently.',
      ],
      [
        'This new side of life',
        'Plays me the symphony of adulthood,',
        'Yet my ears long for',
        'The melodies of childhood.',
      ],
      [
        'As time passes by,',
        'I am left with beautiful memories,',
        'The warmth of the people once I knew,',
        'And the beautiful ending of childhood.',
      ],
    ],
  },
  {
    slug: 'my-first-guiding-light',
    title: 'My First Guiding Light.',
    author: 'Rinyo Dawe',
    stanzas: [
      [
        'In every step, in every stride,',
        'Your presence fills my heart with pride.',
        'On this day, so dear and true,',
        'My love, I celebrate you.',
      ],
      [
        'With every smile, with every tear,',
        'Your wisdom guides me, year by year.',
        'You’ve been my rock, my guiding light,',
        'Through every challenge, every plight.',
      ],
      [
        'Your scolding echoes in my soul,',
        'Your love has made me feel whole.',
        'So here’s to you, on this special day,',
        'Happy birthday, in every way!',
      ],
      [
        'May your day be filled with joy and cheer,',
        'And may your heart always hold what’s dear.',
        'You’re cherished beyond compare,',
        'Today and always, I’m grateful you’re there.',
      ],
    ],
  },
  {
    slug: 'sory-alang-sacred-soul-of-rang',
    title: 'SORY-ALANG',
    subtitle: 'The Sacred Soul of Rang Village',
    author: 'MENI LICHI RANG',
    stanzas: [
      [
        'In the heart of Rang, where green hills rise,',
        'Beneath the clouds and open skies,',
        'There stands a stone, so old and grand,',
        'A sacred guardian of our land.',
      ],
      [
        'Sory-Alang is the name we say,',
        'With love and faith along the way.',
        'Not just a stone, not just a name,',
        'But a part of our culture’s flame.',
      ],
      [
        'Our elders believe, with hearts so true,',
        'That Sory-Alang watches over me and you.',
        'It guards our village from illness and pain,',
        'And gives us hope through sunshine and rain.',
      ],
      [
        'Its sacred place we keep so clean,',
        'With care and respect in every scene.',
        'For what it means, we understand,',
        'It holds the stories of our land.',
      ],
      [
        'When villagers gather to pray as one,',
        'Their offerings are made beneath the sun.',
        'With traditional sacrifices, they show their devotion,',
        'Keeping alive their faith and emotion.',
      ],
      [
        'When important meetings fill the day,',
        'Near Sory-Alang, they choose to stay.',
        'They believe it listens to every word,',
        'And every promise that is heard.',
      ],
      [
        'A lie or promise made in vain,',
        'Is believed to bring illness and pain.',
        'For truth and honour must always stay,',
        'In every word we speak each day.',
      ],
      [
        'O Sory-Alang, our pride, our guide,',
        'Your place in our hearts will never hide.',
        'Through every generation, your story will belong,',
        'To the land, the people, and the village of Rang.',
      ],
      [
        'Though years may pass and times may change,',
        'Our love for our roots will never fade.',
        'You are our faith, our history, our identity,',
        'A living treasure of our community.',
      ],
      [
        'Sory-Alang, forever you will stand,',
        'The sacred guardian of our Rang land!',
      ],
    ],
  },
];

export const NYOKUM_YULLO_FOLKTALE = {
  slug: 'the-legend-of-nyokum-yullo',
  title: 'The Legend of Nyokum Yullo',
  subtitle: 'How Ane Donyi’s blessing came to the Nyishi',
  author: 'By Jadu Dawe, Priest',
  paragraphs: [
    'The Nyishi tell of a time when the parents of Ane Donyi arranged a bridal contest to find her a husband. Many suitors came forward, among them Motebo, Sarok, Siki, Ramlo, and Abo Tani among others, the ancestral father of the Nyishi. After a fierce competition, Abo Tani emerged the winner, and he and Ane Donyi were married.',
    'In time the couple were blessed with a child and needed someone to help care for the little one. One day, Ane Donyi asked Abo Tani to go to her parents’ home and bring her younger sisters, Bangchri and Bangchro, to be the babysitters.',
    'Before he left, Ane Donyi explained that two paths led to her parents’ house. The first, Myoba, was an uphill trek, tiring and difficult, but it would bring him to his destination early and without obstacles. The second, Myori, was cool, shady and comfortable, but he would meet flies, leeches, snakes and other insects along the way and risk being bitten. Worse still, Myori passed the dwelling of Hamma Tadda, the god of poverty, who had the power to turn anyone poor if he was disturbed. Ane Donyi warned Abo Tani strictly: whatever happened, he must not take the Myori route.',
    'Abo Tani set out for Bangchri and Bangchro and, as he had been told, began with the uphill Myoba. But after a few miles he found the climb punishing. There was no place to rest and no water to drink, and he gave up.',
    'He turned back and took the Myori trek instead. The way was easy and shaded, with plenty of water, and he walked on happily. After a few miles, however, flies and insects began to bite, and leeches fastened onto his legs and sucked his blood. Abo Tani drew his dao (sword) and scraped them off, flicking the leeches away onto an old wooden log lying in the ground. That was in fact the house of Hamma Tadda—the God of poverty. The blows woke the god of poverty in a rage, and he cursed Abo Tani on the spot. The curse was so powerful that Abo Tani’s costly dao and scabbard turned into pieces of plain wood, his fine pari (Eri silk) garments became rags, and his precious tado-chungre (traditional beads) turned to charcoal.',
    'Ashamed and embarrassed to be seen in such a state, Abo Tani did not go on to the home of Ane Donyi’s parents. He returned home disguised as a dog. Several days passed, and Ane Donyi wondered what had become of him and why he had not come back. Meanwhile, she noticed that a stray dog had been staying at the house for a few days, never barking, never eating, only sleeping curled up. She suspected that the dog was Abo Tani, hiding his true form out of shame.',
    'To be sure, she spat on her palm and offered it to the dog, knowing that only Abo Tani would accept it. The dog took it, and her doubt was gone.',
    'Ane Donyi was both angry and grieved. Abo Tani had disobeyed her, she said; he would remain poor for the rest of his life, and she could no longer stay with him as his wife. Despite her strict warning, he had taken the Myori trek and brought poverty and disgrace upon himself. As she prepared to leave for her heavenly abode with their child, Abo Tani caught hold of her toe and begged her not to abandon him. She did not listen and left him.',
    'Yet before she departed, Ane Donyi gave him a promise. Whenever he longed to reach out to her, whenever he was in difficulty, he should remember her and offer her prayers. She would appear before him and bless him: to ward off evil spirits, to grant fertility so that the generations may continue, to bring prosperity and bumper harvests, and to keep peace and harmony of mankind.',
    'This is why the Nyishi, to this day, pray to Ane Donyi and remember her through Nyokum Yullo. Nyokum Yullo is the general, community-wide prayer, while Yullo is also performed as a private ritual in individual families, in which a chicken or other animal is offered to Ane Donyi in the hope of good returns.',
  ],
  lessons: [
    {
      title: 'Always listen to your wife’s advice.',
      body: 'Ane Donyi’s warning was not a restriction but protection. Ignoring advice from wives and loved ones can cost us what we hold dear.',
    },
    {
      title: 'Comfort can hide a cost.',
      body: 'The shady Myori trek looked easy and inviting, yet it led to loss. The easy path is not always the right one, and what is difficult at the start may be what keeps us safe.',
    },
    {
      title: 'Do not give up too soon.',
      body: 'Abo Tani abandoned the Myoba trek after only a few miles. Had he persevered, he would have reached his destination early and unharmed. Hardship is often temporary; regret can last far longer.',
    },
    {
      title: 'Be careful and respectful in unfamiliar places.',
      body: 'A moment of carelessness with the dao disturbed Hamma Tadda. Our actions, even small ones, can have large consequences, and we owe respect to nature and to forces we do not fully understand.',
    },
    {
      title: 'Own your mistakes; do not hide from them.',
      body: 'Shame drove Abo Tani to disguise himself rather than face his family. Acknowledging a mistake honestly is the first step toward setting it right.',
    },
    {
      title: 'Grace and remembrance endure.',
      body: 'Even in her anger and grief, Ane Donyi left Abo Tani, and his descendants, a blessing. The legend reminds us to remember our source of strength with gratitude, and to forgive even when we must set boundaries.',
    },
  ],
  closing:
    'In remembering Ane Donyi through Nyokum Yullo, the Nyishi do not only seek blessings of health, harvest and harmony. They also keep alive the wisdom of a story that teaches humility, patience and respect, values worth carrying into every generation.',
};

export const NYISHI_RIDDLES_COMPILER = 'Compiled by: Longpa Kocho';

export const NYISHI_RIDDLES: NyishiRiddle[] = [
  {
    id: 1,
    nyishi: 'Niitam Patam Thong Yembang; Hogo he?',
    nyishiAnswer: 'Ejeh Pahbang',
    english: 'I am the quiet point where the two nodes of fabric’s journeys meet. Who am I?',
    englishAnswer: 'Nodes of a Cloth',
  },
  {
    id: 2,
    nyishi: 'Ane Pikpung Kao Linglong; Hogo He?',
    nyishiAnswer: 'Langne Langho',
    english: 'Born of the same mountain, resting side by side—one cradles the other, yet neither moves nor speaks. What are they?',
    englishAnswer: 'A mother-and-daughter stone',
  },
  {
    id: 3,
    nyishi: 'Abang Relo, Boh Nangsar; hogo he?',
    nyishiAnswer: 'Sisam Epoh',
    english: 'The rain falls first; the mud follows behind. What are they?',
    englishAnswer: 'Urine and Poops',
  },
  {
    id: 4,
    nyishi: 'Yani Yano Nudohperoh; hogo heh?',
    nyishiAnswer: 'Dodw',
    english: 'Falling without feet, dancing and slapping the leaves. What is it?',
    englishAnswer: 'Rain droplets',
  },
  {
    id: 5,
    nyishi: 'Gebi Ai Gebikekre, Garro Tasso Gorrokekre; hogo heh?',
    nyishiAnswer: 'Taffi',
    english: 'It has dozens of teeth but cannot take a single bite. What is it?',
    englishAnswer: 'A comb',
  },
  {
    id: 6,
    nyishi: 'Domoda docho, Tangmoda Tangcho; hogo heh?',
    nyishiAnswer: 'Panyu-Ajuk',
    english: 'It eats before we eat, it drinks before we drink. What are they?',
    englishAnswer: 'A spoon and a Mug',
  },
  {
    id: 7,
    nyishi: 'Roneh Naka negogappa pa; he hogo he?',
    nyishiAnswer: 'Harwa',
    english: 'Born on a green branch, wearing a cloak as dark as the night sky, ready for dinner. What is it?',
    englishAnswer: 'Black vegetable',
  },
  {
    id: 8,
    nyishi: 'Abang papang Ngaduramrang chang; hogo he?',
    nyishiAnswer: 'Papuk',
    english: 'It hangs its head toward the earth and weeps red petals. What is it?',
    englishAnswer: 'Banana Flower',
  },
  {
    id: 9,
    nyishi: 'Lang pagam, Banin chakram; hogo heh?',
    nyishiAnswer: 'Tabv',
    english: 'No legs to run, no wings to fly, yet I race across the grass and vanish in the blink of an eye. What am I?',
    englishAnswer: 'A snake',
  },
  {
    id: 10,
    nyishi: 'Badoh Baloh Naka recha; hogo heh?',
    nyishiAnswer: 'Naka Asang chiklak nah',
    english: 'Stacked high without a ladder, waiting in silence to meet the flame. What is it?',
    englishAnswer: 'Firewood',
  },
  {
    id: 11,
    nyishi: 'Ayo kaaso - Aheng doley; hogoyeh?',
    nyishiAnswer: 'Awak',
    english: 'It bites off a hundred green weeds with its single curved tooth but never swallows a bite. What is it?',
    englishAnswer: 'A Handheld weeder',
  },
  {
    id: 12,
    nyishi: 'Ala regokabotiksaaregokabotik; hogohe?',
    nyishiAnswer: 'Esi kukna',
    english: 'It rushes straight down the valley without stopping, yet its white hands reach out to slap both banks at the same time. What are they?',
    englishAnswer: 'Esi kukna (Rushing river rapids / foaming waves)',
  },
  {
    id: 13,
    nyishi: 'Sangri Takki Yaya Bamba; hogo he?',
    nyishiAnswer: 'Nyepam',
    english: 'Right at the top of the bare tree, a bug perches and whistles with the breeze—what is it?',
    englishAnswer: 'A Nose',
  },
];

export const BREATH_HOLDING_RECITATION = {
  title: 'Breath Holding Reciting Competition',
  compiler: 'Compiled by: Longpa Kocho',
  openingChant: 'Ato polo ga labangpopi Talo ko Engdang Tago Bukling na',
  lines: [
    'Balung-Balung, Barking',
    'Balung-Balung, Barnye',
    'Balung-Balung, Barhem',
    'Balung-Balung, Barpi',
    'Balung-Balung, Bargyo',
    'Balung-Balung, Barke',
    'Balung-Balung, Bar Kanv',
    'Balung-Balung, Bar Pinv',
    'Balung-Balung, Bar Kayo',
    'Balung-Balung, Barang chang',
  ],
};
