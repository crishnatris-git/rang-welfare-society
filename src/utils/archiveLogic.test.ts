import test from 'node:test';
import assert from 'node:assert/strict';
import {
  searchArchive,
  filterTimeline,
  validateSubmissionInput,
  sanitizeDocumentId,
  type SearchDocument,
  type TimelineItem,
} from './archiveLogic';

const sampleDocs: SearchDocument[] = [
  {
    id: 'clan-tamar',
    title: 'Tamar Clan',
    subtitle: 'The Seal of Cosmic Order',
    excerpt: 'Settled at Namgo Langra (Narangyar), migrated to Sangphine led by Ato Changrang and Ato Parang.',
    category: 'Clans',
    route: '/rang/clans/tamar',
    keywords: ['Namgo Langra', 'Ato Changrang', 'Astrological Seal'],
  },
  {
    id: 'art-nyangpo',
    title: 'The Legend of Nyangpo Soh',
    subtitle: 'By Kaya Rang',
    excerpt: 'Nestled in the heart of Rang village flows a quiet watercourse known as Nyangpo Soh.',
    category: 'Articles',
    route: '/voices/legend-of-nyangpo-soh',
    keywords: ['stream', 'folklore', 'tache', 'Kaya Rang'],
  },
  {
    id: 'pioneer-pai',
    title: 'Er. Pai Dawe Rang',
    subtitle: 'First Chairman of RWS (2013–2016) & First Graduate',
    excerpt: 'First Chairman of Rang Welfare Society and donor of land for Nyubu Nyvgam Yerko.',
    category: 'People & Pioneers',
    route: '/people/firsts',
    keywords: ['Chairman', 'Gurukul', 'Gazetted Officer'],
  },
];

const sampleTimeline: TimelineItem[] = [
  {
    id: 't1',
    year: '1993',
    sortYear: 1993,
    title: 'Rang Village Welfare Committee Formed',
    description: 'Formed at Rang Saam footbridge under Sh. Rafe Dawe Rang.',
    period: '1991–2013',
    category: 'Environment',
    leadership: 'Sh. Rafe Dawe Rang',
  },
  {
    id: 't2',
    year: '2017',
    sortYear: 2017,
    title: 'First Vehicle Reaches Rang (PMGSY)',
    description: 'First vehicle reached Rang Village on 31 August 2017.',
    period: '2016–2020',
    category: 'Infrastructure',
    leadership: 'Er. Mara Kocho',
  },
  {
    id: 't3',
    year: '2020',
    sortYear: 2020,
    title: 'Coaching for Classes X and XII',
    description: 'Started coaching programmes for Class X and XII students.',
    period: '2020–2023',
    category: 'Education',
    leadership: 'Sh. Rakesh Dawe Rang',
  },
];

test('searchArchive ranks title matches ahead of excerpt matches and respects category filter', () => {
  const results = searchArchive(sampleDocs, 'Nyangpo');
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'art-nyangpo');

  const clanOnly = searchArchive(sampleDocs, 'Rang', 'Clans');
  assert.equal(clanOnly.length, 1);
  assert.equal(clanOnly[0].id, 'clan-tamar');
});

test('filterTimeline filters by period, category, and free-text query in chronological order', () => {
  assert.equal(filterTimeline(sampleTimeline, { period: '2016–2020' }).length, 1);
  assert.equal(filterTimeline(sampleTimeline, { category: 'Education' })[0].year, '2020');
  assert.equal(filterTimeline(sampleTimeline, { query: 'PMGSY' })[0].id, 't2');
});

test('validateSubmissionInput rejects invalid payloads and accepts valid blueprint-compliant submissions', () => {
  const badErrors = validateSubmissionInput({
    submissionType: 'InvalidType',
    title: 'Hi',
    content: 'Too short',
    contributorName: 'A',
    contributorEmail: 'not-an-email',
  });
  assert.ok(badErrors.length >= 4);

  const okErrors = validateSubmissionInput({
    submissionType: 'Historical Memory',
    title: 'Memories of Rang Primary School 1985',
    content: 'I remember walking up to the school building on donated land every morning.',
    contributorName: 'Taro Kocho',
    clan: 'Kocho',
    contributorEmail: 'taro@example.com',
  });
  assert.equal(okErrors.length, 0);
});

test('sanitizeDocumentId conforms to Firestore isValidId regex', () => {
  const id = sanitizeDocumentId('sub/../bad!@#');
  assert.match(id, /^[a-zA-Z0-9_-]+$/);
  assert.ok(id.length <= 128);
});
