import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  LogIn,
  FileText,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import { PageHeader, OrnamentalDivider } from '../components/EditorialUI';
import { ASSETS } from '../data/assets';
import { SOCIETY_CONTACT } from '../data/societyData';
import { NINE_CLANS } from '../data/rangEncyclopedia';
import { useAuth } from '../context/AuthContext';
import {
  CommunitySubmissionDoc,
  WebsiteSettingsDoc,
  createCommunitySubmission,
  subscribeUserSubmissions,
  subscribeWebsiteSettings,
} from '../services/cmsService';
import { ALLOWED_SUBMISSION_TYPES, validateSubmissionInput } from '../utils/archiveLogic';
import { usePageSeo } from '../utils/seo';

type ConnectMode = 'contact' | 'contribute';

export function ContactContributePage({ mode = 'contact' }: { mode?: ConnectMode }) {
  const { user, isAuthReady, signInWithGoogle, authError } = useAuth();
  const [settings, setSettings] = useState<WebsiteSettingsDoc | null>(null);
  const [mySubmissions, setMySubmissions] = useState<CommunitySubmissionDoc[]>([]);

  const [submissionType, setSubmissionType] = useState<string>(ALLOWED_SUBMISSION_TYPES[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [clan, setClan] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [contributorPhone, setContributorPhone] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccessId, setSubmitSuccessId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  usePageSeo({
    title:
      mode === 'contact'
        ? 'Contact Rang Welfare Society — Village Rang, Seppa'
        : 'Contribute to the Rang Heritage Archive — Rang Welfare Society',
    description:
      mode === 'contact'
        ? 'Official contact office, postal address, email, and telephone for Rang Welfare Society (RWS), Village Rang, Seppa, East Kameng District, Arunachal Pradesh.'
        : 'Submit historical memories, old photograph references, essays, folktales, poems, or editorial corrections to the Rang Welfare Society archival moderation queue.',
    canonicalPath: mode === 'contact' ? '/contact' : '/contribute',
  });

  useEffect(() => {
    const unsubSettings = subscribeWebsiteSettings(setSettings);
    return () => unsubSettings();
  }, []);

  useEffect(() => {
    if (user) {
      if (!contributorName && user.displayName) setContributorName(user.displayName);
      if (!contributorEmail && user.email) setContributorEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (mode !== 'contribute' || !isAuthReady || !user) {
      setMySubmissions([]);
      return;
    }
    const unsub = subscribeUserSubmissions(user.uid, setMySubmissions);
    return () => unsub();
  }, [mode, isAuthReady, user]);

  const officeEmail = settings?.officialEmail || SOCIETY_CONTACT.email;
  const officePhone = settings?.officialPhone || SOCIETY_CONTACT.phone;
  const officeAddress = settings?.officeAddress || SOCIETY_CONTACT.officeAddress;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccessId(null);

    if (!user) {
      setValidationErrors(['Please sign in with Google before submitting to the archive.']);
      return;
    }

    const errors = validateSubmissionInput({
      submissionType,
      title,
      content,
      contributorName,
      clan,
      contributorEmail,
      contributorPhone,
      attachmentUrl,
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setSubmitting(true);
    try {
      const id = await createCommunitySubmission({
        submissionType: submissionType as CommunitySubmissionDoc['submissionType'],
        title: title.trim(),
        content: content.trim(),
        contributorName: contributorName.trim(),
        clan: clan.trim() || undefined,
        contributorEmail: contributorEmail.trim(),
        contributorPhone: contributorPhone.trim() || undefined,
        attachmentUrl: attachmentUrl.trim() || undefined,
        authorUid: user.uid,
      });
      setSubmitSuccessId(id);
      setTitle('');
      setContent('');
      setAttachmentUrl('');
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Unable to submit your contribution right now. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const subNav = (
    <div className="flex flex-wrap gap-2">
      <Link
        to="/contact"
        className={`px-4 py-2 text-xs font-medium tracking-wide rounded-sm border transition-colors whitespace-nowrap shrink-0 ${
          mode === 'contact'
            ? 'bg-[#B88A3E] text-[#0E2A1C] border-[#B88A3E]'
            : 'bg-white/5 text-[#E4DEC9] border-white/20 hover:bg-white/10 hover:text-white'
        }`}
      >
        Contact Office
      </Link>
      <Link
        to="/contribute"
        className={`px-4 py-2 text-xs font-medium tracking-wide rounded-sm border transition-colors whitespace-nowrap shrink-0 ${
          mode === 'contribute'
            ? 'bg-[#B88A3E] text-[#0E2A1C] border-[#B88A3E]'
            : 'bg-white/5 text-[#E4DEC9] border-white/20 hover:bg-white/10 hover:text-white'
        }`}
      >
        Contribute to Archive
      </Link>
    </div>
  );

  if (mode === 'contact') {
    return (
      <div>
        <PageHeader
          kicker="Official Correspondence"
          title="Contact Rang Welfare Society"
          subtitle="Reach the Office of the Rang Welfare Society (RWS) at Village Rang, Seppa Circle, East Kameng District, Arunachal Pradesh."
          breadcrumbs={[{ label: 'Contact RWS' }]}
          backgroundImage={ASSETS.landscapes.heroRangHills}
        >
          {subNav}
        </PageHeader>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white border border-[#E4DCC9] rounded-sm p-6 sm:p-10 shadow-xs">
              <div className="flex items-center gap-4 pb-6 border-b border-[#EFE8D8]">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#B88A3E]/60 bg-[#143A28] shrink-0 shadow-xs">
                  <img
                    src={ASSETS.logos.rwsOfficial}
                    alt="Official Logo of Rang Welfare Society"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-[1.04]"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium">
                    Institutional Headquarters
                  </p>
                  <h2 className="font-serif text-2xl text-[#143A28] font-semibold">
                    {SOCIETY_CONTACT.organization}
                  </h2>
                  <p className="text-xs text-[#5A6058] mt-0.5">{SOCIETY_CONTACT.tagline}</p>
                </div>
              </div>

              <dl className="mt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#8E6520] shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-[#5A6058] font-semibold">
                      Official Address
                    </dt>
                    <dd className="mt-1 text-base text-[#1C241E] leading-relaxed">
                      {officeAddress}
                    </dd>
                    <p className="mt-1 text-xs text-[#6B726C]">
                      {SOCIETY_CONTACT.distanceFromSeppa} · Census Village Code: {SOCIETY_CONTACT.censusVillageCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#8E6520] shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-[#5A6058] font-semibold">
                      Official Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${officeEmail}`}
                        className="text-base font-medium text-[#143A28] hover:text-[#8E6520] underline decoration-[#B88A3E]/50 underline-offset-4"
                      >
                        {officeEmail}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#8E6520] shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-[#5A6058] font-semibold">
                      Telephone
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${officePhone}`}
                        className="text-base font-medium text-[#143A28] hover:text-[#8E6520] tabular-nums"
                      >
                        +91 {officePhone}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#143A28] text-[#F9F6EF] rounded-sm p-6 sm:p-8 border border-[#B88A3E]/30">
                <p className="text-xs uppercase tracking-[0.16em] text-[#D8B268] font-medium">
                  Community Heritage Participation
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">
                  Contribute to the Digital Archive
                </h3>
                <p className="mt-3 text-sm text-[#E4DEC9] leading-relaxed">
                  Share verified historical memories, old photograph links, essays, poems, Nyishi oral traditions, or archival corrections for formal review by the RWS Editorial Committee.
                </p>
                <Link
                  to="/contribute"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-[#B88A3E] text-[#0E2A1C] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#CCA052] transition-colors whitespace-nowrap shrink-0"
                >
                  Open Archive Submission Form
                  <Send className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-[#F2ECE0] border border-[#D8CEB8] rounded-sm p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#8E6520] font-semibold">
                  <BookOpen className="w-4 h-4" />
                  Archival Integrity Policy
                </div>
                <p className="mt-2 text-sm text-[#4A524C] leading-relaxed">
                  Historical texts from the Silver Jubilee Commemorative Souvenir (<em>Rang — The 9 Colours</em>, 2026) are preserved verbatim. Spelling and date variants recorded across source drafts are documented transparently under{' '}
                  <Link to="/society/governance" className="text-[#143A28] font-medium underline underline-offset-2">
                    Governance & Editorial Notes
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="Living Digital Archive"
        title="Contribute to the Rang Heritage Archive"
        subtitle="Submit historical memories, old photograph references, essays, folktales, poems, or factual corrections for moderation by the Rang Welfare Society Editorial Committee."
        breadcrumbs={[
          { label: 'Connect', to: '/contact' },
          { label: 'Contribute to Archive' },
        ]}
        backgroundImage={ASSETS.landscapes.valleyKamengSunrise}
      >
        {subNav}
      </PageHeader>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white border border-[#E4DCC9] rounded-sm p-6 sm:p-10 shadow-xs">
          {!isAuthReady ? (
            <p className="text-sm text-[#5A6058]">Checking session status...</p>
          ) : !user ? (
            <div className="text-center py-6 max-w-xl mx-auto">
              <ShieldCheck className="w-10 h-10 text-[#143A28] mx-auto mb-3" />
              <h2 className="font-serif text-2xl text-[#143A28] font-semibold">
                Sign In to Submit to the Community Archive
              </h2>
              <p className="mt-3 text-sm text-[#4A524C] leading-relaxed">
                To maintain historical accountability and protect the archive from spam, community contributions require Google sign-in. Your submissions enter the official RWS moderation queue and are reviewed before publication.
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
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#EFE8D8]">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#8E6520] font-medium">
                    Verified Contributor Session
                  </p>
                  <p className="text-sm text-[#143A28] font-medium mt-0.5">
                    Signed in as {user.displayName || user.email} ({user.email})
                  </p>
                </div>
              </div>

              {validationErrors.length > 0 && (
                <div
                  role="alert"
                  className="bg-[#FDF2F0] border border-[#E5B4AA] rounded-sm p-4 text-sm text-[#8C2D19]"
                >
                  <div className="flex items-center gap-2 font-semibold mb-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Please review the following fields:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    {validationErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {submitError && (
                <div
                  role="alert"
                  className="bg-[#FDF2F0] border border-[#E5B4AA] rounded-sm p-4 text-sm text-[#8C2D19]"
                >
                  {submitError}
                </div>
              )}

              {submitSuccessId && (
                <div
                  role="status"
                  className="bg-[#EEF6F0] border border-[#A3CCA9] rounded-sm p-4 text-sm text-[#143A28] flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Contribution Received for Editorial Review</p>
                    <p className="mt-1 text-xs text-[#334139]">
                      Your submission (Reference: <span className="font-mono">{submitSuccessId}</span>) has been logged in the Rang Welfare Society moderation queue. You can track its review status below.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sub-type" className="block text-xs uppercase tracking-[0.12em] text-[#334139] font-semibold mb-1.5">
                    Contribution Category *
                  </label>
                  <select
                    id="sub-type"
                    value={submissionType}
                    onChange={(e) => setSubmissionType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm text-[#1C241E] focus:outline-none focus:border-[#143A28]"
                  >
                    {ALLOWED_SUBMISSION_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sub-clan" className="block text-xs uppercase tracking-[0.12em] text-[#334139] font-semibold mb-1.5">
                    Clan Affiliation (Optional)
                  </label>
                  <select
                    id="sub-clan"
                    value={clan}
                    onChange={(e) => setClan(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm text-[#1C241E] focus:outline-none focus:border-[#143A28]"
                  >
                    <option value="">Select clan or leave blank</option>
                    {NINE_CLANS.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name} Clan
                      </option>
                    ))}
                    <option value="Well-Wisher / Guest">Well-Wisher / Guest</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="sub-title" className="block text-xs uppercase tracking-[0.12em] text-[#334139] font-semibold mb-1.5">
                  Title of Contribution *
                </label>
                <input
                  id="sub-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Memory of the 2013 First General Conference or Folktale from Myodi"
                  className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm text-[#1C241E] focus:outline-none focus:border-[#143A28]"
                />
              </div>

              <div>
                <label htmlFor="sub-content" className="block text-xs uppercase tracking-[0.12em] text-[#334139] font-semibold mb-1.5">
                  Full Text, Historical Details, or Correction Note *
                </label>
                <textarea
                  id="sub-content"
                  required
                  rows={7}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article, poem, folktale, historical recollection, photograph context, or editorial correction here (minimum 15 characters)..."
                  className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm text-[#1C241E] leading-relaxed focus:outline-none focus:border-[#143A28]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="sub-name" className="block text-xs uppercase tracking-[0.12em] text-[#334139] font-semibold mb-1.5">
                    Contributor Full Name *
                  </label>
                  <input
                    id="sub-name"
                    type="text"
                    required
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm text-[#1C241E] focus:outline-none focus:border-[#143A28]"
                  />
                </div>
                <div>
                  <label htmlFor="sub-email" className="block text-xs uppercase tracking-[0.12em] text-[#334139] font-semibold mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="sub-email"
                    type="email"
                    required
                    value={contributorEmail}
                    onChange={(e) => setContributorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm text-[#1C241E] focus:outline-none focus:border-[#143A28]"
                  />
                </div>
                <div>
                  <label htmlFor="sub-phone" className="block text-xs uppercase tracking-[0.12em] text-[#334139] font-semibold mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="sub-phone"
                    type="tel"
                    value={contributorPhone}
                    onChange={(e) => setContributorPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm text-[#1C241E] focus:outline-none focus:border-[#143A28]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sub-url" className="block text-xs uppercase tracking-[0.12em] text-[#334139] font-semibold mb-1.5">
                  Reference Image or Document URL (Optional)
                </label>
                <input
                  id="sub-url"
                  type="url"
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  placeholder="https://... (e.g. Google Drive or image link for archival review)"
                  className="w-full px-3.5 py-2.5 bg-[#F9F6EF] border border-[#D8CEB8] rounded-sm text-sm text-[#1C241E] focus:outline-none focus:border-[#143A28]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <p className="text-xs text-[#6B726C]">
                  All contributions are reviewed by RWS office-bearers prior to public listing.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#1B4332] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Submitting...' : 'Submit for Review'}
                </button>
              </div>
            </form>
          )}
        </div>

        {user && (
          <>
            <OrnamentalDivider className="my-10" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#8E6520] font-medium">
                Personal Archival Record
              </p>
              <h2 className="mt-1 font-serif text-2xl text-[#143A28] font-semibold">
                Your Submitted Contributions
              </h2>

              {mySubmissions.length === 0 ? (
                <div className="mt-4 bg-[#F2ECE0] border border-[#D8CEB8] rounded-sm p-6 text-sm text-[#5A6058] flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#8E6520] shrink-0" />
                  You have not submitted any archival items yet. Submissions made under your account will appear here with their editorial review status.
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {mySubmissions.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-[#E4DCC9] rounded-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-[#8E6520] font-medium">
                          {item.submissionType} {item.clan ? `· ${item.clan}` : ''}
                        </p>
                        <h3 className="mt-1 font-serif text-lg text-[#143A28] font-semibold">
                          {item.title}
                        </h3>
                        {item.reviewNotes && (
                          <p className="mt-1.5 text-xs text-[#4A524C]">
                            Editorial Note: {item.reviewNotes}
                          </p>
                        )}
                      </div>
                      <span className="text-xs uppercase tracking-[0.14em] font-semibold px-3 py-1.5 rounded-xs border border-[#D8CEB8] bg-[#F9F6EF] text-[#143A28] self-start sm:self-center whitespace-nowrap shrink-0">
                        Status: {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
