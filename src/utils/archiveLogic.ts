export type SearchCategory =
  | 'All'
  | 'Clans'
  | 'Articles'
  | 'Poems'
  | 'Folktales'
  | 'People & Pioneers'
  | 'Historical Milestones'
  | 'Landscape & Sites'
  | 'Vision 2047'
  | 'Community Institutions'
  | 'News & Publications';

export interface SearchDocument {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: Exclude<SearchCategory, 'All'>;
  route: string;
  keywords: string[];
  year?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  sortYear: number;
  title: string;
  description: string;
  period: string;
  category:
    | 'Governance'
    | 'Infrastructure'
    | 'Education'
    | 'Environment'
    | 'Social Welfare'
    | 'Community Participation';
  leadership?: string;
}

export interface SubmissionInput {
  submissionType: string;
  title: string;
  content: string;
  contributorName: string;
  clan?: string;
  contributorEmail: string;
  contributorPhone?: string;
  attachmentUrl?: string;
}

export const ALLOWED_SUBMISSION_TYPES = [
  'Historical Memory',
  'Old Photograph',
  'Article',
  'Folktale',
  'Poem',
  'Historical Information',
  'Editorial Correction',
] as const;

export function searchArchive(
  documents: SearchDocument[],
  query: string,
  category: SearchCategory = 'All'
): SearchDocument[] {
  const trimmed = query.trim().toLowerCase();
  const filteredByCategory =
    category === 'All' ? documents : documents.filter((doc) => doc.category === category);

  if (!trimmed) {
    return filteredByCategory;
  }

  const terms = trimmed.split(/\s+/).filter(Boolean);

  return filteredByCategory
    .map((doc) => {
      const titleLower = doc.title.toLowerCase();
      const subtitleLower = (doc.subtitle ?? '').toLowerCase();
      const excerptLower = doc.excerpt.toLowerCase();
      const keywordsJoined = doc.keywords.join(' ').toLowerCase();
      const haystack = `${titleLower} ${subtitleLower} ${excerptLower} ${keywordsJoined} ${(doc.year ?? '').toLowerCase()}`;

      const matchesAll = terms.every((term) => haystack.includes(term));
      if (!matchesAll) return null;

      let score = 0;
      for (const term of terms) {
        if (titleLower === term) score += 100;
        else if (titleLower.includes(term)) score += 35;
        if (subtitleLower.includes(term)) score += 20;
        if (keywordsJoined.includes(term)) score += 15;
        if (excerptLower.includes(term)) score += 10;
      }
      return { doc, score };
    })
    .filter((entry): entry is { doc: SearchDocument; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .map((entry) => entry.doc);
}

export function filterTimeline(
  items: TimelineItem[],
  opts: { period?: string; category?: string; query?: string }
): TimelineItem[] {
  const q = (opts.query ?? '').trim().toLowerCase();
  return items
    .filter((item) => {
      if (opts.period && opts.period !== 'All' && item.period !== opts.period) {
        return false;
      }
      if (opts.category && opts.category !== 'All' && item.category !== opts.category) {
        return false;
      }
      if (q) {
        const hay = `${item.year} ${item.title} ${item.description} ${item.leadership ?? ''} ${item.period}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => a.sortYear - b.sortYear);
}

export function validateSubmissionInput(input: SubmissionInput): string[] {
  const errors: string[] = [];
  if (!ALLOWED_SUBMISSION_TYPES.includes(input.submissionType as (typeof ALLOWED_SUBMISSION_TYPES)[number])) {
    errors.push('Please select a valid contribution category.');
  }
  const title = input.title.trim();
  if (title.length < 3 || title.length > 200) {
    errors.push('Title must be between 3 and 200 characters.');
  }
  const content = input.content.trim();
  if (content.length < 15 || content.length > 15000) {
    errors.push('Contribution details must be between 15 and 15,000 characters.');
  }
  const name = input.contributorName.trim();
  if (name.length < 2 || name.length > 120) {
    errors.push('Contributor name must be between 2 and 120 characters.');
  }
  const email = input.contributorEmail.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
    errors.push('Please provide a valid email address.');
  }
  if (input.clan && input.clan.trim().length > 80) {
    errors.push('Clan name cannot exceed 80 characters.');
  }
  if (input.contributorPhone && input.contributorPhone.trim().length > 40) {
    errors.push('Phone number cannot exceed 40 characters.');
  }
  if (input.attachmentUrl && input.attachmentUrl.trim().length > 1000) {
    errors.push('Reference URL cannot exceed 1,000 characters.');
  }
  return errors;
}

export function sanitizeDocumentId(prefix: string): string {
  const cleanPrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24) || 'doc';
  const rand = Math.random().toString(36).slice(2, 10);
  return `${cleanPrefix}-${Date.now()}-${rand}`;
}
