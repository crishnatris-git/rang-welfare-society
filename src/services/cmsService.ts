import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { sanitizeDocumentId } from '../utils/archiveLogic';

export type PublishStatus = 'draft' | 'published' | 'scheduled';

export interface AnnouncementDoc {
  id: string;
  title: string;
  category:
    | 'Official Notice'
    | 'Announcement'
    | 'Community News'
    | 'Institutional Update'
    | 'Public Statement'
    | 'Development Initiative';
  summary: string;
  body: string;
  status: PublishStatus;
  publishDate: string;
  authorUid: string;
  authorName: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export interface SocietyEventDoc {
  id: string;
  title: string;
  category:
    | 'General Conference'
    | 'Community Meeting'
    | 'Cultural Programme'
    | 'Development Activity'
    | 'Silver Jubilee'
    | 'Youth & Sports';
  eventDate: string;
  location: string;
  description: string;
  posterUrl?: string;
  status: 'draft' | 'published';
  isPast: boolean;
  authorUid: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export interface CmsArticleDoc {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Article' | 'Poem' | 'Folktale' | 'Memory' | 'Institutional Note';
  authorDisplay: string;
  excerpt: string;
  body: string;
  imageUrl?: string;
  status: 'draft' | 'published';
  authorUid: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export interface GalleryItemDoc {
  id: string;
  title: string;
  caption: string;
  category: string;
  imageUrl: string;
  period?: string;
  status: 'draft' | 'published';
  authorUid: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export interface VisionUpdateDoc {
  id: string;
  missionId: string;
  phase:
    | 'Phase I: 2026-2030 (Rang Nirman)'
    | 'Phase II: 2031-2036 (Rang Vistar)'
    | 'Phase III: 2037-2047 (Rang Shikhar)';
  title: string;
  summary: string;
  progressStatus: 'Planned' | 'In Progress' | 'Completed' | 'Published Report';
  reportedDate: string;
  authorUid: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export interface PublicationDoc {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  documentUrl: string;
  coverUrl?: string;
  status: 'draft' | 'published';
  authorUid: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export interface CommunitySubmissionDoc {
  id: string;
  submissionType:
    | 'Historical Memory'
    | 'Old Photograph'
    | 'Article'
    | 'Folktale'
    | 'Poem'
    | 'Historical Information'
    | 'Editorial Correction';
  title: string;
  content: string;
  contributorName: string;
  clan?: string;
  contributorEmail: string;
  contributorPhone?: string;
  attachmentUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  reviewNotes?: string;
  authorUid: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export interface WebsiteSettingsDoc {
  id: string;
  ga4MeasurementId?: string;
  searchConsoleVerification?: string;
  officialEmail: string;
  officialPhone: string;
  officeAddress: string;
  updatedAt?: Timestamp | string;
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== '') {
      result[k] = v;
    }
  }
  return result;
}

export function subscribePublishedAnnouncements(
  onData: (items: AnnouncementDoc[]) => void
): () => void {
  const q = query(
    collection(db, 'announcements'),
    where('status', '==', 'published'),
    orderBy('publishDate', 'desc')
  );
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AnnouncementDoc, 'id'>) })));
    },
    (error) => {
      // Fallback gracefully on index or read error without crashing public pages
      console.warn('Announcements listener notice:', error.message);
      onData([]);
    }
  );
}

export function subscribeAllAnnouncements(
  onData: (items: AnnouncementDoc[]) => void
): () => void {
  const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AnnouncementDoc, 'id'>) })));
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'announcements')
  );
}

export async function saveAnnouncement(
  data: Omit<AnnouncementDoc, 'id' | 'createdAt' | 'updatedAt'>,
  existingId?: string
): Promise<string> {
  const id = existingId || sanitizeDocumentId('notice');
  const ref = doc(db, 'announcements', id);
  try {
    if (existingId) {
      await updateDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return id;
  } catch (error) {
    handleFirestoreError(error, existingId ? OperationType.UPDATE : OperationType.CREATE, `announcements/${id}`);
  }
}

export async function deleteAnnouncement(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'announcements', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `announcements/${id}`);
  }
}

export function subscribePublishedEvents(onData: (items: SocietyEventDoc[]) => void): () => void {
  const q = query(collection(db, 'events'), where('status', '==', 'published'));
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SocietyEventDoc, 'id'>) }));
      list.sort((a, b) => b.eventDate.localeCompare(a.eventDate));
      onData(list);
    },
    (error) => {
      console.warn('Events listener notice:', error.message);
      onData([]);
    }
  );
}

export function subscribeAllEvents(onData: (items: SocietyEventDoc[]) => void): () => void {
  const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SocietyEventDoc, 'id'>) })));
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'events')
  );
}

export async function saveEvent(
  data: Omit<SocietyEventDoc, 'id' | 'createdAt' | 'updatedAt'>,
  existingId?: string
): Promise<string> {
  const id = existingId || sanitizeDocumentId('event');
  const ref = doc(db, 'events', id);
  try {
    if (existingId) {
      await updateDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        isPast: data.isPast,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        isPast: data.isPast,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return id;
  } catch (error) {
    handleFirestoreError(error, existingId ? OperationType.UPDATE : OperationType.CREATE, `events/${id}`);
  }
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'events', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `events/${id}`);
  }
}

export function subscribePublishedCmsArticles(onData: (items: CmsArticleDoc[]) => void): () => void {
  const q = query(collection(db, 'cmsArticles'), where('status', '==', 'published'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CmsArticleDoc, 'id'>) })));
    },
    (error) => {
      console.warn('CMS articles listener notice:', error.message);
      onData([]);
    }
  );
}

export function subscribeAllCmsArticles(onData: (items: CmsArticleDoc[]) => void): () => void {
  const q = query(collection(db, 'cmsArticles'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CmsArticleDoc, 'id'>) })));
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'cmsArticles')
  );
}

export async function saveCmsArticle(
  data: Omit<CmsArticleDoc, 'id' | 'createdAt' | 'updatedAt'>,
  existingId?: string
): Promise<string> {
  const id = existingId || sanitizeDocumentId('article');
  const ref = doc(db, 'cmsArticles', id);
  try {
    if (existingId) {
      await updateDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return id;
  } catch (error) {
    handleFirestoreError(error, existingId ? OperationType.UPDATE : OperationType.CREATE, `cmsArticles/${id}`);
  }
}

export async function deleteCmsArticle(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'cmsArticles', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `cmsArticles/${id}`);
  }
}

export function subscribePublishedGallery(onData: (items: GalleryItemDoc[]) => void): () => void {
  const q = query(collection(db, 'galleryItems'), where('status', '==', 'published'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryItemDoc, 'id'>) })));
    },
    (error) => {
      console.warn('Gallery listener notice:', error.message);
      onData([]);
    }
  );
}

export function subscribeAllGallery(onData: (items: GalleryItemDoc[]) => void): () => void {
  const q = query(collection(db, 'galleryItems'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryItemDoc, 'id'>) })));
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'galleryItems')
  );
}

export async function saveGalleryItem(
  data: Omit<GalleryItemDoc, 'id' | 'createdAt' | 'updatedAt'>,
  existingId?: string
): Promise<string> {
  const id = existingId || sanitizeDocumentId('photo');
  const ref = doc(db, 'galleryItems', id);
  try {
    if (existingId) {
      await updateDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return id;
  } catch (error) {
    handleFirestoreError(error, existingId ? OperationType.UPDATE : OperationType.CREATE, `galleryItems/${id}`);
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'galleryItems', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `galleryItems/${id}`);
  }
}

export function subscribeVisionUpdates(onData: (items: VisionUpdateDoc[]) => void): () => void {
  const q = query(
    collection(db, 'visionUpdates'),
    where('progressStatus', 'in', ['Planned', 'In Progress', 'Completed', 'Published Report'])
  );
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<VisionUpdateDoc, 'id'>) }));
      items.sort((a, b) => b.reportedDate.localeCompare(a.reportedDate));
      onData(items);
    },
    (error) => {
      console.warn('Vision updates listener notice:', error.message);
      onData([]);
    }
  );
}

export async function saveVisionUpdate(
  data: Omit<VisionUpdateDoc, 'id' | 'createdAt' | 'updatedAt'>,
  existingId?: string
): Promise<string> {
  const id = existingId || sanitizeDocumentId('vision');
  const ref = doc(db, 'visionUpdates', id);
  try {
    if (existingId) {
      await updateDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return id;
  } catch (error) {
    handleFirestoreError(error, existingId ? OperationType.UPDATE : OperationType.CREATE, `visionUpdates/${id}`);
  }
}

export async function deleteVisionUpdate(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'visionUpdates', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `visionUpdates/${id}`);
  }
}

export function subscribePublishedPublications(onData: (items: PublicationDoc[]) => void): () => void {
  const q = query(collection(db, 'publications'), where('status', '==', 'published'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PublicationDoc, 'id'>) })));
    },
    (error) => {
      console.warn('Publications listener notice:', error.message);
      onData([]);
    }
  );
}

export function subscribeAllPublications(onData: (items: PublicationDoc[]) => void): () => void {
  const q = query(collection(db, 'publications'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PublicationDoc, 'id'>) })));
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'publications')
  );
}

export async function savePublication(
  data: Omit<PublicationDoc, 'id' | 'createdAt' | 'updatedAt'>,
  existingId?: string
): Promise<string> {
  const id = existingId || sanitizeDocumentId('pub');
  const ref = doc(db, 'publications', id);
  try {
    if (existingId) {
      await updateDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ...stripUndefined(data as Record<string, unknown>),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return id;
  } catch (error) {
    handleFirestoreError(error, existingId ? OperationType.UPDATE : OperationType.CREATE, `publications/${id}`);
  }
}

export async function deletePublication(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'publications', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `publications/${id}`);
  }
}

export function subscribeUserSubmissions(
  uid: string,
  onData: (items: CommunitySubmissionDoc[]) => void
): () => void {
  const q = query(collection(db, 'submissions'), where('authorUid', '==', uid));
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<CommunitySubmissionDoc, 'id'>),
        }))
      );
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'submissions')
  );
}

export function subscribeAllSubmissions(
  onData: (items: CommunitySubmissionDoc[]) => void
): () => void {
  const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<CommunitySubmissionDoc, 'id'>),
        }))
      );
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'submissions')
  );
}

export async function createCommunitySubmission(
  data: Omit<CommunitySubmissionDoc, 'id' | 'status' | 'reviewNotes' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const id = sanitizeDocumentId('sub');
  const ref = doc(db, 'submissions', id);
  try {
    await setDoc(ref, {
      ...stripUndefined(data as Record<string, unknown>),
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `submissions/${id}`);
  }
}

export async function reviewSubmission(
  id: string,
  status: CommunitySubmissionDoc['status'],
  reviewNotes?: string
): Promise<void> {
  const ref = doc(db, 'submissions', id);
  try {
    await updateDoc(ref, {
      status,
      ...(reviewNotes ? { reviewNotes } : {}),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `submissions/${id}`);
  }
}

export async function deleteSubmission(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'submissions', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `submissions/${id}`);
  }
}

export function subscribeWebsiteSettings(
  onData: (settings: WebsiteSettingsDoc | null) => void
): () => void {
  const ref = doc(db, 'settings', 'public');
  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        onData({ id: snap.id, ...(snap.data() as Omit<WebsiteSettingsDoc, 'id'>) });
      } else {
        onData(null);
      }
    },
    (error) => {
      console.warn('Settings listener notice:', error.message);
      onData(null);
    }
  );
}

export async function saveWebsiteSettings(
  data: Omit<WebsiteSettingsDoc, 'id' | 'updatedAt'>
): Promise<void> {
  const ref = doc(db, 'settings', 'public');
  try {
    await setDoc(
      ref,
      {
        ...stripUndefined(data as Record<string, unknown>),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'settings/public');
  }
}
