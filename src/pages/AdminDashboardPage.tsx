import React, { useEffect, useState } from 'react';
import {
  Shield,
  LogIn,
  LogOut,
  Plus,
  Trash2,
  Check,
  X,
  FileText,
  Calendar,
  Megaphone,
  Images,
  Target,
  BookOpen,
  Inbox,
  Settings as SettingsIcon,
  LayoutDashboard,
} from 'lucide-react';
import { PageHeader } from '../components/EditorialUI';
import { ASSETS } from '../data/assets';
import { SOCIETY_CONTACT } from '../data/societyData';
import { VISION_2047 } from '../data/communityAndVisionData';
import { useAuth } from '../context/AuthContext';
import {
  AnnouncementDoc,
  CmsArticleDoc,
  CommunitySubmissionDoc,
  GalleryItemDoc,
  PublicationDoc,
  SocietyEventDoc,
  VisionUpdateDoc,
  WebsiteSettingsDoc,
  deleteAnnouncement,
  deleteCmsArticle,
  deleteEvent,
  deleteGalleryItem,
  deletePublication,
  deleteSubmission,
  deleteVisionUpdate,
  reviewSubmission,
  saveAnnouncement,
  saveCmsArticle,
  saveEvent,
  saveGalleryItem,
  savePublication,
  saveVisionUpdate,
  saveWebsiteSettings,
  subscribeAllAnnouncements,
  subscribeAllCmsArticles,
  subscribeAllEvents,
  subscribeAllGallery,
  subscribeAllPublications,
  subscribeAllSubmissions,
  subscribeVisionUpdates,
  subscribeWebsiteSettings,
} from '../services/cmsService';
import { usePageSeo } from '../utils/seo';

type AdminTab =
  | 'overview'
  | 'announcements'
  | 'events'
  | 'articles'
  | 'gallery'
  | 'vision'
  | 'publications'
  | 'submissions'
  | 'settings';

export function AdminDashboardPage() {
  const { user, isAuthReady, isAdmin, adminRole, authError, signInWithGoogle, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [announcements, setAnnouncements] = useState<AnnouncementDoc[]>([]);
  const [events, setEvents] = useState<SocietyEventDoc[]>([]);
  const [articles, setArticles] = useState<CmsArticleDoc[]>([]);
  const [gallery, setGallery] = useState<GalleryItemDoc[]>([]);
  const [visionUpdates, setVisionUpdates] = useState<VisionUpdateDoc[]>([]);
  const [publications, setPublications] = useState<PublicationDoc[]>([]);
  const [submissions, setSubmissions] = useState<CommunitySubmissionDoc[]>([]);
  const [settings, setSettings] = useState<WebsiteSettingsDoc | null>(null);

  // Announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState<AnnouncementDoc['category']>('Official Notice');
  const [annSummary, setAnnSummary] = useState('');
  const [annBody, setAnnBody] = useState('');
  const [annDate, setAnnDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [annStatus, setAnnStatus] = useState<AnnouncementDoc['status']>('published');

  // Event form state
  const [evTitle, setEvTitle] = useState('');
  const [evCategory, setEvCategory] = useState<SocietyEventDoc['category']>('General Conference');
  const [evDate, setEvDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [evLocation, setEvLocation] = useState('RWS Community Hall, Village Rang');
  const [evDesc, setEvDesc] = useState('');
  const [evPoster, setEvPoster] = useState('');
  const [evIsPast, setEvIsPast] = useState(false);
  const [evStatus, setEvStatus] = useState<'draft' | 'published'>('published');

  // Article form state
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState<CmsArticleDoc['category']>('Article');
  const [artAuthor, setArtAuthor] = useState('');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artBody, setArtBody] = useState('');
  const [artStatus, setArtStatus] = useState<'draft' | 'published'>('published');

  // Gallery form state
  const [galTitle, setGalTitle] = useState('');
  const [galCaption, setGalCaption] = useState('');
  const [galCategory, setGalCategory] = useState('Community Archive');
  const [galPeriod, setGalPeriod] = useState('Post-Jubilee');
  const [galUrl, setGalUrl] = useState('');
  const [galStatus, setGalStatus] = useState<'draft' | 'published'>('published');

  // Vision 2047 update form state
  const [visMissionId, setVisMissionId] = useState(VISION_2047.missions[0].id);
  const [visPhase, setVisPhase] = useState<VisionUpdateDoc['phase']>('Phase I: 2026-2030 (Rang Nirman)');
  const [visTitle, setVisTitle] = useState('');
  const [visSummary, setVisSummary] = useState('');
  const [visStatus, setVisStatus] = useState<VisionUpdateDoc['progressStatus']>('Planned');
  const [visDate, setVisDate] = useState(() => new Date().toISOString().slice(0, 10));

  // Publication form state
  const [pubTitle, setPubTitle] = useState('');
  const [pubYear, setPubYear] = useState('2027');
  const [pubCategory, setPubCategory] = useState('Annual Report');
  const [pubDesc, setPubDesc] = useState('');
  const [pubUrl, setPubUrl] = useState('');
  const [pubStatus, setPubStatus] = useState<'draft' | 'published'>('published');

  // Settings form state
  const [setEmail, setSetEmail] = useState(SOCIETY_CONTACT.email);
  const [setPhone, setSetPhone] = useState(SOCIETY_CONTACT.phone);
  const [setAddress, setSetAddress] = useState(SOCIETY_CONTACT.officeAddress);
  const [setGa4, setSetGa4] = useState('');
  const [setGsc, setSetGsc] = useState('');

  usePageSeo({
    title: 'RWS Administration & CMS Portal — Rang Welfare Society',
    description: 'Authorised Rang Welfare Society digital archive and content management portal.',
    canonicalPath: '/admin',
  });

  useEffect(() => {
    if (!isAuthReady || !isAdmin) return;
    const unsubs = [
      subscribeAllAnnouncements(setAnnouncements),
      subscribeAllEvents(setEvents),
      subscribeAllCmsArticles(setArticles),
      subscribeAllGallery(setGallery),
      subscribeVisionUpdates(setVisionUpdates),
      subscribeAllPublications(setPublications),
      subscribeAllSubmissions(setSubmissions),
      subscribeWebsiteSettings((s) => {
        setSettings(s);
        if (s) {
          setSetEmail(s.officialEmail || SOCIETY_CONTACT.email);
          setSetPhone(s.officialPhone || SOCIETY_CONTACT.phone);
          setSetAddress(s.officeAddress || SOCIETY_CONTACT.officeAddress);
          setSetGa4(s.ga4MeasurementId || '');
          setSetGsc(s.searchConsoleVerification || '');
        }
      }),
    ];
    return () => unsubs.forEach((u) => u());
  }, [isAuthReady, isAdmin]);

  const flashSuccess = (msg: string) => {
    setErrorMessage(null);
    setStatusMessage(msg);
  };

  const flashError = (err: unknown) => {
    setStatusMessage(null);
    setErrorMessage(err instanceof Error ? err.message : 'Operation failed.');
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !annTitle.trim() || !annSummary.trim() || !annBody.trim()) {
      setErrorMessage('Please fill title, summary, and body for the notice.');
      return;
    }
    try {
      await saveAnnouncement({
        title: annTitle.trim(),
        category: annCategory,
        summary: annSummary.trim(),
        body: annBody.trim(),
        publishDate: annDate,
        status: annStatus,
        authorUid: user.uid,
        authorName: user.displayName || user.email || 'RWS Office',
      });
      setAnnTitle('');
      setAnnSummary('');
      setAnnBody('');
      flashSuccess('Notice saved successfully.');
    } catch (err) {
      flashError(err);
    }
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !evTitle.trim() || !evDesc.trim()) {
      setErrorMessage('Please fill title and description for the event.');
      return;
    }
    try {
      await saveEvent({
        title: evTitle.trim(),
        category: evCategory,
        eventDate: evDate,
        location: evLocation.trim() || 'Village Rang',
        description: evDesc.trim(),
        posterUrl: evPoster.trim() || undefined,
        isPast: evIsPast,
        status: evStatus,
        authorUid: user.uid,
      });
      setEvTitle('');
      setEvDesc('');
      setEvPoster('');
      flashSuccess('Event saved successfully.');
    } catch (err) {
      flashError(err);
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !artTitle.trim() || !artAuthor.trim() || !artBody.trim()) {
      setErrorMessage('Please provide title, author display name, and body.');
      return;
    }
    try {
      await saveCmsArticle({
        title: artTitle.trim(),
        category: artCategory,
        authorDisplay: artAuthor.trim(),
        excerpt: artExcerpt.trim() || artBody.trim().slice(0, 180),
        body: artBody.trim(),
        status: artStatus,
        authorUid: user.uid,
      });
      setArtTitle('');
      setArtAuthor('');
      setArtExcerpt('');
      setArtBody('');
      flashSuccess('Community Voices entry saved.');
    } catch (err) {
      flashError(err);
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !galTitle.trim() || !galUrl.trim()) {
      setErrorMessage('Please provide a photograph title and valid image URL.');
      return;
    }
    try {
      await saveGalleryItem({
        title: galTitle.trim(),
        caption: galCaption.trim() || galTitle.trim(),
        category: galCategory.trim() || 'Community Archive',
        period: galPeriod.trim() || 'Post-Jubilee',
        imageUrl: galUrl.trim(),
        status: galStatus,
        authorUid: user.uid,
      });
      setGalTitle('');
      setGalCaption('');
      setGalUrl('');
      flashSuccess('Gallery item saved.');
    } catch (err) {
      flashError(err);
    }
  };

  const handleSaveVisionUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !visTitle.trim() || !visSummary.trim()) {
      setErrorMessage('Please provide an update title and summary.');
      return;
    }
    try {
      await saveVisionUpdate({
        missionId: visMissionId,
        phase: visPhase,
        title: visTitle.trim(),
        summary: visSummary.trim(),
        progressStatus: visStatus,
        reportedDate: visDate,
        authorUid: user.uid,
      });
      setVisTitle('');
      setVisSummary('');
      flashSuccess('Vision 2047 progress update published.');
    } catch (err) {
      flashError(err);
    }
  };

  const handleSavePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !pubTitle.trim() || !pubUrl.trim()) {
      setErrorMessage('Please provide publication title and PDF/document URL.');
      return;
    }
    try {
      await savePublication({
        title: pubTitle.trim(),
        year: pubYear.trim() || '2026',
        category: pubCategory.trim() || 'Official Document',
        description: pubDesc.trim() || pubTitle.trim(),
        documentUrl: pubUrl.trim(),
        status: pubStatus,
        authorUid: user.uid,
      });
      setPubTitle('');
      setPubDesc('');
      setPubUrl('');
      flashSuccess('Publication record saved.');
    } catch (err) {
      flashError(err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveWebsiteSettings({
        officialEmail: setEmail.trim() || SOCIETY_CONTACT.email,
        officialPhone: setPhone.trim() || SOCIETY_CONTACT.phone,
        officeAddress: setAddress.trim() || SOCIETY_CONTACT.officeAddress,
        ga4MeasurementId: setGa4.trim() || undefined,
        searchConsoleVerification: setGsc.trim() || undefined,
      });
      flashSuccess('Website settings updated.');
    } catch (err) {
      flashError(err);
    }
  };

  const handlePromoteSubmission = async (sub: CommunitySubmissionDoc) => {
    if (!user) return;
    try {
      const mappedCategory: CmsArticleDoc['category'] =
        sub.submissionType === 'Poem'
          ? 'Poem'
          : sub.submissionType === 'Folktale'
          ? 'Folktale'
          : sub.submissionType === 'Historical Memory'
          ? 'Memory'
          : 'Article';

      await saveCmsArticle({
        title: sub.title,
        category: mappedCategory,
        authorDisplay: sub.clan ? `${sub.contributorName} (${sub.clan})` : sub.contributorName,
        excerpt: sub.content.slice(0, 200),
        body: sub.content,
        imageUrl: sub.attachmentUrl,
        status: 'published',
        authorUid: user.uid,
      });
      await reviewSubmission(sub.id, 'approved', 'Approved and published to Community Voices.');
      flashSuccess(`Approved and published "${sub.title}" to Community Voices.`);
    } catch (err) {
      flashError(err);
    }
  };

  return (
    <div>
      <PageHeader
        kicker="Institutional Governance & Content Management"
        title="RWS Administration Portal"
        subtitle="Role-protected CMS for publishing post-jubilee official notices, events, Vision 2047 reports, gallery updates, publications, and moderating community archive submissions."
        breadcrumbs={[{ label: 'Admin Portal' }]}
        backgroundImage={ASSETS.landscapes.valleyKamengPanorama}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {!isAuthReady ? (
          <div className="bg-white border border-[#E4DCC9] rounded-sm p-10 text-center text-sm text-[#5A6058]">
            Verifying authentication state...
          </div>
        ) : !user ? (
          <div className="max-w-lg mx-auto bg-white border border-[#D8CEB8] rounded-sm p-8 sm:p-10 text-center shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border border-[#B88A3E]/60 bg-[#143A28] shadow-xs">
              <img
                src={ASSETS.logos.rwsOfficial}
                alt="Rang Welfare Society Official Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-[1.04]"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium">
              Authorised Personnel Only
            </p>
            <h2 className="mt-2 font-serif text-2xl text-[#143A28] font-semibold">
              Sign In to RWS CMS
            </h2>
            <p className="mt-3 text-sm text-[#4A524C] leading-relaxed">
              Historical Silver Jubilee archival texts remain immutable. Authorised RWS office-bearers and editors may sign in with their verified Google account to publish post-jubilee updates and moderate community submissions.
            </p>
            {authError && (
              <p className="mt-4 text-xs text-[#8C2D19] bg-[#FDF2F0] border border-[#E5B4AA] rounded-sm p-3">
                {authError}
              </p>
            )}
            <button
              type="button"
              onClick={signInWithGoogle}
              className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#1B4332] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <LogIn className="w-4 h-4" />
              Sign In with Google
            </button>
          </div>
        ) : !isAdmin ? (
          <div className="max-w-lg mx-auto bg-white border border-[#E5B4AA] rounded-sm p-8 sm:p-10 text-center shadow-xs">
            <Shield className="w-10 h-10 text-[#8C2D19] mx-auto mb-3" />
            <h2 className="font-serif text-2xl text-[#143A28] font-semibold">
              Administrator Access Required
            </h2>
            <p className="mt-3 text-sm text-[#4A524C] leading-relaxed">
              Signed in as <span className="font-medium text-[#1C241E]">{user.email}</span>. This account is not currently registered as an authorised Rang Welfare Society administrator or editor.
            </p>
            <button
              type="button"
              onClick={signOut}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2ECE0] text-[#143A28] border border-[#D8CEB8] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:border-[#B88A3E] transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white border border-[#D8CEB8] rounded-sm p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium">
                  Active Session · Role: {adminRole?.toUpperCase()}
                </p>
                <p className="text-sm font-medium text-[#143A28] mt-0.5">
                  {user.displayName || user.email} ({user.email})
                </p>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#F2ECE0] text-[#143A28] border border-[#D8CEB8] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:border-[#B88A3E] cursor-pointer whitespace-nowrap shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>

            {statusMessage && (
              <div role="status" className="bg-[#EEF6F0] border border-[#A3CCA9] text-[#143A28] rounded-sm px-4 py-3 text-sm flex items-center justify-between">
                <span>{statusMessage}</span>
                <button type="button" onClick={() => setStatusMessage(null)} aria-label="Dismiss notice" className="cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {errorMessage && (
              <div role="alert" className="bg-[#FDF2F0] border border-[#E5B4AA] text-[#8C2D19] rounded-sm px-4 py-3 text-sm flex items-center justify-between">
                <span>{errorMessage}</span>
                <button type="button" onClick={() => setErrorMessage(null)} aria-label="Dismiss error" className="cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2 border-b border-[#D8CEB8] pb-4" role="tablist" aria-label="Admin CMS modules">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'announcements', label: `Notices (${announcements.length})`, icon: Megaphone },
                { id: 'events', label: `Events (${events.length})`, icon: Calendar },
                { id: 'articles', label: `Voices (${articles.length})`, icon: FileText },
                { id: 'gallery', label: `Gallery (${gallery.length})`, icon: Images },
                { id: 'vision', label: `Vision 2047 (${visionUpdates.length})`, icon: Target },
                { id: 'publications', label: `Publications (${publications.length})`, icon: BookOpen },
                { id: 'submissions', label: `Submissions (${submissions.filter((s) => s.status === 'pending').length})`, icon: Inbox },
                { id: 'settings', label: 'Settings', icon: SettingsIcon },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                      activeTab === tab.id
                        ? 'bg-[#143A28] text-[#F9F6EF] border-[#143A28]'
                        : 'bg-white text-[#334139] border-[#D8CEB8] hover:border-[#B88A3E]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Official Notices', count: announcements.length, tab: 'announcements' as AdminTab },
                  { label: 'Events & Conferences', count: events.length, tab: 'events' as AdminTab },
                  { label: 'CMS Voice Entries', count: articles.length, tab: 'articles' as AdminTab },
                  { label: 'CMS Gallery Photos', count: gallery.length, tab: 'gallery' as AdminTab },
                  { label: 'Vision 2047 Reports', count: visionUpdates.length, tab: 'vision' as AdminTab },
                  { label: 'CMS Publications', count: publications.length, tab: 'publications' as AdminTab },
                  { label: 'Pending Submissions', count: submissions.filter((s) => s.status === 'pending').length, tab: 'submissions' as AdminTab },
                  { label: 'Total Submissions', count: submissions.length, tab: 'submissions' as AdminTab },
                ].map((stat) => (
                  <button
                    key={stat.label}
                    type="button"
                    onClick={() => setActiveTab(stat.tab)}
                    className="bg-white border border-[#E4DCC9] rounded-sm p-5 text-left hover:border-[#B88A3E] transition-colors cursor-pointer"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-[#5A6058]">{stat.label}</p>
                    <p className="mt-2 font-serif text-3xl text-[#143A28] font-semibold tabular-nums">
                      {stat.count}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleSaveAnnouncement} className="lg:col-span-5 bg-white border border-[#E4DCC9] rounded-sm p-6 space-y-4">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Publish Official Notice</h3>
                  <div>
                    <label htmlFor="ann-title" className="block text-xs font-semibold text-[#334139] mb-1">Title *</label>
                    <input id="ann-title" type="text" required value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="ann-cat" className="block text-xs font-semibold text-[#334139] mb-1">Category</label>
                      <select id="ann-cat" value={annCategory} onChange={(e) => setAnnCategory(e.target.value as AnnouncementDoc['category'])} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                        <option>Official Notice</option>
                        <option>Announcement</option>
                        <option>Community News</option>
                        <option>Institutional Update</option>
                        <option>Public Statement</option>
                        <option>Development Initiative</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ann-date" className="block text-xs font-semibold text-[#334139] mb-1">Publish Date</label>
                      <input id="ann-date" type="date" value={annDate} onChange={(e) => setAnnDate(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ann-summary" className="block text-xs font-semibold text-[#334139] mb-1">Summary *</label>
                    <input id="ann-summary" type="text" required value={annSummary} onChange={(e) => setAnnSummary(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="ann-body" className="block text-xs font-semibold text-[#334139] mb-1">Full Text *</label>
                    <textarea id="ann-body" rows={5} required value={annBody} onChange={(e) => setAnnBody(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="ann-status" className="block text-xs font-semibold text-[#334139] mb-1">Visibility</label>
                    <select id="ann-status" value={annStatus} onChange={(e) => setAnnStatus(e.target.value as AnnouncementDoc['status'])} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                      <option value="published">Published (Live)</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] cursor-pointer">
                    <Plus className="w-4 h-4" /> Save Notice
                  </button>
                </form>

                <div className="lg:col-span-7 space-y-3">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Existing Notices</h3>
                  {announcements.length === 0 ? (
                    <p className="text-sm text-[#5A6058] bg-white border border-[#E4DCC9] rounded-sm p-6">No notices created yet.</p>
                  ) : (
                    announcements.map((a) => (
                      <div key={a.id} className="bg-white border border-[#E4DCC9] rounded-sm p-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8E6520]">{a.category} · {a.publishDate} · {a.status}</p>
                          <h4 className="font-serif text-base text-[#143A28] font-semibold mt-0.5">{a.title}</h4>
                          <p className="text-xs text-[#4A524C] mt-1">{a.summary}</p>
                        </div>
                        <button type="button" onClick={() => deleteAnnouncement(a.id).then(() => flashSuccess('Notice deleted.')).catch(flashError)} aria-label={`Delete notice ${a.title}`} className="p-2 text-[#8C2D19] hover:bg-[#FDF2F0] rounded-sm cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleSaveEvent} className="lg:col-span-5 bg-white border border-[#E4DCC9] rounded-sm p-6 space-y-4">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Add Event / Conference</h3>
                  <div>
                    <label htmlFor="ev-title" className="block text-xs font-semibold text-[#334139] mb-1">Event Title *</label>
                    <input id="ev-title" type="text" required value={evTitle} onChange={(e) => setEvTitle(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="ev-cat" className="block text-xs font-semibold text-[#334139] mb-1">Category</label>
                      <select id="ev-cat" value={evCategory} onChange={(e) => setEvCategory(e.target.value as SocietyEventDoc['category'])} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                        <option>General Conference</option>
                        <option>Community Meeting</option>
                        <option>Cultural Programme</option>
                        <option>Development Activity</option>
                        <option>Silver Jubilee</option>
                        <option>Youth & Sports</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ev-date" className="block text-xs font-semibold text-[#334139] mb-1">Event Date</label>
                      <input id="ev-date" type="date" value={evDate} onChange={(e) => setEvDate(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ev-loc" className="block text-xs font-semibold text-[#334139] mb-1">Location</label>
                    <input id="ev-loc" type="text" value={evLocation} onChange={(e) => setEvLocation(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="ev-desc" className="block text-xs font-semibold text-[#334139] mb-1">Description *</label>
                    <textarea id="ev-desc" rows={4} required value={evDesc} onChange={(e) => setEvDesc(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="ev-poster" className="block text-xs font-semibold text-[#334139] mb-1">Poster Image URL (Optional)</label>
                    <input id="ev-poster" type="url" value={evPoster} onChange={(e) => setEvPoster(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-xs text-[#334139]">
                      <input type="checkbox" checked={evIsPast} onChange={(e) => setEvIsPast(e.target.checked)} />
                      Mark as past programme
                    </label>
                    <select aria-label="Event visibility" value={evStatus} onChange={(e) => setEvStatus(e.target.value as 'draft' | 'published')} className="px-3 py-1.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-xs">
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] cursor-pointer">
                    <Plus className="w-4 h-4" /> Save Event
                  </button>
                </form>

                <div className="lg:col-span-7 space-y-3">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Scheduled & Past Events</h3>
                  {events.length === 0 ? (
                    <p className="text-sm text-[#5A6058] bg-white border border-[#E4DCC9] rounded-sm p-6">No events created yet.</p>
                  ) : (
                    events.map((ev) => (
                      <div key={ev.id} className="bg-white border border-[#E4DCC9] rounded-sm p-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8E6520]">{ev.category} · {ev.eventDate} · {ev.status}</p>
                          <h4 className="font-serif text-base text-[#143A28] font-semibold mt-0.5">{ev.title}</h4>
                          <p className="text-xs text-[#4A524C] mt-1">{ev.location}</p>
                        </div>
                        <button type="button" onClick={() => deleteEvent(ev.id).then(() => flashSuccess('Event deleted.')).catch(flashError)} aria-label={`Delete event ${ev.title}`} className="p-2 text-[#8C2D19] hover:bg-[#FDF2F0] rounded-sm cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleSaveArticle} className="lg:col-span-5 bg-white border border-[#E4DCC9] rounded-sm p-6 space-y-4">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Publish Post-Jubilee Voice</h3>
                  <div>
                    <label htmlFor="art-title" className="block text-xs font-semibold text-[#334139] mb-1">Title *</label>
                    <input id="art-title" type="text" required value={artTitle} onChange={(e) => setArtTitle(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="art-cat" className="block text-xs font-semibold text-[#334139] mb-1">Category</label>
                      <select id="art-cat" value={artCategory} onChange={(e) => setArtCategory(e.target.value as CmsArticleDoc['category'])} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                        <option>Article</option>
                        <option>Poem</option>
                        <option>Folktale</option>
                        <option>Memory</option>
                        <option>Institutional Note</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="art-author" className="block text-xs font-semibold text-[#334139] mb-1">Author *</label>
                      <input id="art-author" type="text" required value={artAuthor} onChange={(e) => setArtAuthor(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="art-excerpt" className="block text-xs font-semibold text-[#334139] mb-1">Short Excerpt</label>
                    <input id="art-excerpt" type="text" value={artExcerpt} onChange={(e) => setArtExcerpt(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="art-body" className="block text-xs font-semibold text-[#334139] mb-1">Full Content *</label>
                    <textarea id="art-body" rows={5} required value={artBody} onChange={(e) => setArtBody(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="art-status" className="block text-xs font-semibold text-[#334139] mb-1">Visibility</label>
                    <select id="art-status" value={artStatus} onChange={(e) => setArtStatus(e.target.value as 'draft' | 'published')} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] cursor-pointer">
                    <Plus className="w-4 h-4" /> Save Entry
                  </button>
                </form>

                <div className="lg:col-span-7 space-y-3">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Post-Jubilee Articles & Poems</h3>
                  {articles.length === 0 ? (
                    <p className="text-sm text-[#5A6058] bg-white border border-[#E4DCC9] rounded-sm p-6">No post-jubilee entries published yet.</p>
                  ) : (
                    articles.map((c) => (
                      <div key={c.id} className="bg-white border border-[#E4DCC9] rounded-sm p-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8E6520]">{c.category} · {c.authorDisplay} · {c.status}</p>
                          <h4 className="font-serif text-base text-[#143A28] font-semibold mt-0.5">{c.title}</h4>
                          <p className="text-xs text-[#4A524C] mt-1">{c.excerpt}</p>
                        </div>
                        <button type="button" onClick={() => deleteCmsArticle(c.id).then(() => flashSuccess('Article deleted.')).catch(flashError)} aria-label={`Delete article ${c.title}`} className="p-2 text-[#8C2D19] hover:bg-[#FDF2F0] rounded-sm cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleSaveGallery} className="lg:col-span-5 bg-white border border-[#E4DCC9] rounded-sm p-6 space-y-4">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Add Gallery Photograph</h3>
                  <div>
                    <label htmlFor="gal-title" className="block text-xs font-semibold text-[#334139] mb-1">Photo Title *</label>
                    <input id="gal-title" type="text" required value={galTitle} onChange={(e) => setGalTitle(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="gal-url" className="block text-xs font-semibold text-[#334139] mb-1">Image URL *</label>
                    <input id="gal-url" type="url" required value={galUrl} onChange={(e) => setGalUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="gal-cat" className="block text-xs font-semibold text-[#334139] mb-1">Category</label>
                      <input id="gal-cat" type="text" value={galCategory} onChange={(e) => setGalCategory(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                    </div>
                    <div>
                      <label htmlFor="gal-per" className="block text-xs font-semibold text-[#334139] mb-1">Period / Year</label>
                      <input id="gal-per" type="text" value={galPeriod} onChange={(e) => setGalPeriod(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="gal-cap" className="block text-xs font-semibold text-[#334139] mb-1">Caption</label>
                    <textarea id="gal-cap" rows={3} value={galCaption} onChange={(e) => setGalCaption(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="gal-status" className="block text-xs font-semibold text-[#334139] mb-1">Visibility</label>
                    <select id="gal-status" value={galStatus} onChange={(e) => setGalStatus(e.target.value as 'draft' | 'published')} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] cursor-pointer">
                    <Plus className="w-4 h-4" /> Add to Gallery
                  </button>
                </form>

                <div className="lg:col-span-7 space-y-3">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">CMS Gallery Additions</h3>
                  {gallery.length === 0 ? (
                    <p className="text-sm text-[#5A6058] bg-white border border-[#E4DCC9] rounded-sm p-6">No post-jubilee gallery images added yet. (28 archival Silver Jubilee photographs are permanently curated.)</p>
                  ) : (
                    gallery.map((g) => (
                      <div key={g.id} className="bg-white border border-[#E4DCC9] rounded-sm p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={g.imageUrl} alt={g.title} referrerPolicy="no-referrer" className="w-16 h-12 object-cover rounded-xs bg-[#EAE3D2]" />
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#8E6520]">{g.category} · {g.status}</p>
                            <h4 className="font-serif text-base text-[#143A28] font-semibold">{g.title}</h4>
                          </div>
                        </div>
                        <button type="button" onClick={() => deleteGalleryItem(g.id).then(() => flashSuccess('Gallery photo deleted.')).catch(flashError)} aria-label={`Delete gallery item ${g.title}`} className="p-2 text-[#8C2D19] hover:bg-[#FDF2F0] rounded-sm cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleSaveVisionUpdate} className="lg:col-span-5 bg-white border border-[#E4DCC9] rounded-sm p-6 space-y-4">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Log Vision 2047 Report</h3>
                  <div>
                    <label htmlFor="vis-mission" className="block text-xs font-semibold text-[#334139] mb-1">Mission</label>
                    <select id="vis-mission" value={visMissionId} onChange={(e) => setVisMissionId(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                      {VISION_2047.missions.map((m, idx) => (
                        <option key={m.id} value={m.id}>
                          Mission {idx + 1}: {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="vis-phase" className="block text-xs font-semibold text-[#334139] mb-1">Phase</label>
                    <select id="vis-phase" value={visPhase} onChange={(e) => setVisPhase(e.target.value as VisionUpdateDoc['phase'])} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                      <option>Phase I: 2026-2030 (Rang Nirman)</option>
                      <option>Phase II: 2031-2036 (Rang Vistar)</option>
                      <option>Phase III: 2037-2047 (Rang Shikhar)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="vis-status" className="block text-xs font-semibold text-[#334139] mb-1">Status</label>
                      <select id="vis-status" value={visStatus} onChange={(e) => setVisStatus(e.target.value as VisionUpdateDoc['progressStatus'])} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                        <option>Planned</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Published Report</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vis-date" className="block text-xs font-semibold text-[#334139] mb-1">Report Date</label>
                      <input id="vis-date" type="date" value={visDate} onChange={(e) => setVisDate(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="vis-title" className="block text-xs font-semibold text-[#334139] mb-1">Update Headline *</label>
                    <input id="vis-title" type="text" required value={visTitle} onChange={(e) => setVisTitle(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="vis-summary" className="block text-xs font-semibold text-[#334139] mb-1">Verified Report Summary *</label>
                    <textarea id="vis-summary" rows={4} required value={visSummary} onChange={(e) => setVisSummary(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] cursor-pointer">
                    <Plus className="w-4 h-4" /> Publish Progress Report
                  </button>
                </form>

                <div className="lg:col-span-7 space-y-3">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Published Vision 2047 Updates</h3>
                  {visionUpdates.length === 0 ? (
                    <p className="text-sm text-[#5A6058] bg-white border border-[#E4DCC9] rounded-sm p-6">No progress reports published yet. The public Vision 2047 page accurately displays “Progress information not yet published.”</p>
                  ) : (
                    visionUpdates.map((v) => (
                      <div key={v.id} className="bg-white border border-[#E4DCC9] rounded-sm p-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8E6520]">{v.progressStatus} · {v.reportedDate} · {v.phase}</p>
                          <h4 className="font-serif text-base text-[#143A28] font-semibold mt-0.5">{v.title}</h4>
                          <p className="text-xs text-[#4A524C] mt-1">{v.summary}</p>
                        </div>
                        <button type="button" onClick={() => deleteVisionUpdate(v.id).then(() => flashSuccess('Vision update deleted.')).catch(flashError)} aria-label={`Delete vision update ${v.title}`} className="p-2 text-[#8C2D19] hover:bg-[#FDF2F0] rounded-sm cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'publications' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleSavePublication} className="lg:col-span-5 bg-white border border-[#E4DCC9] rounded-sm p-6 space-y-4">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Add Official Publication</h3>
                  <div>
                    <label htmlFor="pub-title" className="block text-xs font-semibold text-[#334139] mb-1">Title *</label>
                    <input id="pub-title" type="text" required value={pubTitle} onChange={(e) => setPubTitle(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="pub-year" className="block text-xs font-semibold text-[#334139] mb-1">Year</label>
                      <input id="pub-year" type="text" value={pubYear} onChange={(e) => setPubYear(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                    </div>
                    <div>
                      <label htmlFor="pub-cat" className="block text-xs font-semibold text-[#334139] mb-1">Category</label>
                      <input id="pub-cat" type="text" value={pubCategory} onChange={(e) => setPubCategory(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="pub-url" className="block text-xs font-semibold text-[#334139] mb-1">Document PDF URL *</label>
                    <input id="pub-url" type="url" required value={pubUrl} onChange={(e) => setPubUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="pub-desc" className="block text-xs font-semibold text-[#334139] mb-1">Description</label>
                    <textarea id="pub-desc" rows={3} value={pubDesc} onChange={(e) => setPubDesc(e.target.value)} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                  </div>
                  <div>
                    <label htmlFor="pub-status" className="block text-xs font-semibold text-[#334139] mb-1">Visibility</label>
                    <select id="pub-status" value={pubStatus} onChange={(e) => setPubStatus(e.target.value as 'draft' | 'published')} className="w-full px-3 py-2 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm">
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#1B4332] cursor-pointer">
                    <Plus className="w-4 h-4" /> Save Publication
                  </button>
                </form>

                <div className="lg:col-span-7 space-y-3">
                  <h3 className="font-serif text-xl text-[#143A28] font-semibold">Post-Jubilee Publications</h3>
                  {publications.length === 0 ? (
                    <p className="text-sm text-[#5A6058] bg-white border border-[#E4DCC9] rounded-sm p-6">No post-jubilee publications added yet.</p>
                  ) : (
                    publications.map((p) => (
                      <div key={p.id} className="bg-white border border-[#E4DCC9] rounded-sm p-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8E6520]">{p.category} · {p.year} · {p.status}</p>
                          <h4 className="font-serif text-base text-[#143A28] font-semibold mt-0.5">{p.title}</h4>
                          <p className="text-xs text-[#4A524C] mt-1">{p.description}</p>
                        </div>
                        <button type="button" onClick={() => deletePublication(p.id).then(() => flashSuccess('Publication deleted.')).catch(flashError)} aria-label={`Delete publication ${p.title}`} className="p-2 text-[#8C2D19] hover:bg-[#FDF2F0] rounded-sm cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[#143A28] font-semibold">Community Archive Moderation Queue</h3>
                {submissions.length === 0 ? (
                  <p className="text-sm text-[#5A6058] bg-white border border-[#E4DCC9] rounded-sm p-6">No community submissions in the queue.</p>
                ) : (
                  submissions.map((sub) => (
                    <div key={sub.id} className="bg-white border border-[#E4DCC9] rounded-sm p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs uppercase tracking-[0.14em] text-[#8E6520] font-semibold">
                          {sub.submissionType} · Status: {sub.status}
                        </p>
                        <span className="text-xs text-[#5A6058]">
                          By {sub.contributorName} {sub.clan ? `(${sub.clan})` : ''} · {sub.contributorEmail}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-[#143A28] font-semibold">{sub.title}</h4>
                      <p className="text-sm text-[#4A524C] whitespace-pre-line">{sub.content}</p>
                      {sub.attachmentUrl && (
                        <a href={sub.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#143A28] underline">
                          Reference Link: {sub.attachmentUrl}
                        </a>
                      )}
                      <div className="pt-3 border-t border-[#EFE8D8] flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handlePromoteSubmission(sub)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold rounded-sm hover:bg-[#1B4332] cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve & Publish to Voices
                        </button>
                        <button
                          type="button"
                          onClick={() => reviewSubmission(sub.id, 'approved', 'Verified and archived by RWS Editorial Team.').then(() => flashSuccess('Marked approved.')).catch(flashError)}
                          className="px-3.5 py-2 bg-[#F2ECE0] text-[#143A28] border border-[#D8CEB8] text-xs font-semibold rounded-sm hover:border-[#B88A3E] cursor-pointer"
                        >
                          Approve Only
                        </button>
                        <button
                          type="button"
                          onClick={() => reviewSubmission(sub.id, 'rejected', 'Not selected for public archive.').then(() => flashSuccess('Submission rejected.')).catch(flashError)}
                          className="px-3.5 py-2 bg-white text-[#8C2D19] border border-[#E5B4AA] text-xs font-semibold rounded-sm hover:bg-[#FDF2F0] cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteSubmission(sub.id).then(() => flashSuccess('Submission deleted.')).catch(flashError)}
                          aria-label={`Delete submission ${sub.title}`}
                          className="px-3 py-2 text-[#8C2D19] hover:bg-[#FDF2F0] text-xs rounded-sm cursor-pointer ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="max-w-2xl bg-white border border-[#E4DCC9] rounded-sm p-6 sm:p-8 space-y-5">
                <h3 className="font-serif text-xl text-[#143A28] font-semibold">Global Institutional & Analytics Settings</h3>
                <div>
                  <label htmlFor="set-email" className="block text-xs font-semibold text-[#334139] mb-1">Official Contact Email</label>
                  <input id="set-email" type="email" value={setEmail} onChange={(e) => setSetEmail(e.target.value)} className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                </div>
                <div>
                  <label htmlFor="set-phone" className="block text-xs font-semibold text-[#334139] mb-1">Official Phone Number</label>
                  <input id="set-phone" type="text" value={setPhone} onChange={(e) => setSetPhone(e.target.value)} className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                </div>
                <div>
                  <label htmlFor="set-address" className="block text-xs font-semibold text-[#334139] mb-1">Office Address</label>
                  <textarea id="set-address" rows={3} value={setAddress} onChange={(e) => setSetAddress(e.target.value)} className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="set-ga4" className="block text-xs font-semibold text-[#334139] mb-1">Google Analytics 4 ID (Optional)</label>
                    <input id="set-ga4" type="text" value={setGa4} onChange={(e) => setSetGa4(e.target.value)} placeholder="G-XXXXXXXXXX" className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm font-mono" />
                  </div>
                  <div>
                    <label htmlFor="set-gsc" className="block text-xs font-semibold text-[#334139] mb-1">Search Console Verification (Optional)</label>
                    <input id="set-gsc" type="text" value={setGsc} onChange={(e) => setSetGsc(e.target.value)} placeholder="Verification token" className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm font-mono" />
                  </div>
                </div>
                <button type="submit" className="px-6 py-3 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#1B4332] cursor-pointer">
                  Save Website Settings
                </button>
              </form>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
