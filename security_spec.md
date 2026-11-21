# Rang Welfare Society — Firestore Security Specification (Phase 0 TDD)

## 1. Data Invariants

1. **Default-Deny Safety Net**: Every path not explicitly matched is denied (`allow read, write: if false`).
2. **Public vs Draft Separation**: Public visitors (including unauthenticated users) may only read `announcements`, `events`, `cmsArticles`, `galleryItems`, and `publications` where `resource.data.status == 'published'`. Drafts and scheduled notices are strictly restricted to verified RWS administrators.
3. **Admin RBAC & Verified Email Mandate**: Administrative actions require `request.auth != null && request.auth.token.email_verified == true` AND either membership in `/admins/$(request.auth.uid)` or the bootstrapped admin email `uddipangoswami2021@gmail.com` with `email_verified == true`.
4. **PII Isolation on Community Submissions**: `/submissions/{submissionId}` contains contributor email and phone. Only the submitting authenticated user (`resource.data.authorUid == request.auth.uid`) or an RWS administrator may `get` or `list` submissions. Submissions MUST be created with `status == 'pending'` and `authorUid == request.auth.uid` so no contributor can self-publish.
5. **Temporal Integrity & Immutability**: `createdAt` and `updatedAt` are strictly validated against `request.time`. On updates, `createdAt` and `authorUid` are immutable.
6. **Path ID & Payload Boundary Enforcement**: Every document ID path variable is validated via `isValidId()` (`^[a-zA-Z0-9_\-]+$`, max 128 chars), every string checks `.size()`, and every write checks `hasAll` / `hasOnly` or `affectedKeys().hasOnly(...)` to block shadow fields and value poisoning.
7. **Terminal State Locking**: Once a community submission reaches `status == 'archived'`, non-admin updates are blocked and only admins may modify or delete it.

## 2. The "Dirty Dozen" Adversarial Payloads (Must Return PERMISSION_DENIED)

1. **Self-Approved Submission**: Contributor creates `/submissions/sub-1` with `{ status: "approved", ... }` instead of `"pending"`.
2. **Identity Spoofing on Submission**: Authenticated user `uid-A` creates `/submissions/sub-2` with `{ authorUid: "uid-B", ... }`.
3. **PII Scraping via List**: Non-admin user `uid-A` executes `list` on `/submissions` without filtering `where('authorUid', '==', 'uid-A')` or tries to `get` `uid-B`'s submission.
4. **Unverified Admin Email Spoof**: User with email `uddipangoswami2021@gmail.com` and `email_verified: false` attempts to create `/announcements/ann-1`.
5. **Privilege Escalation**: Regular user tries to create `/admins/<their-uid>` with `{ role: "admin" }`.
6. **Shadow Field Injection**: Admin or user creates `/announcements/ann-2` with an undeclared ghost field `{ isPinnedSecret: true }`.
7. **Draft Leakage**: Unauthenticated visitor attempts to `get` or `list` `/announcements` where `status == 'draft'`.
8. **Resource Poisoning (Oversized ID)**: Attacker attempts to create `/submissions/<1500-char-id>` or inject special characters (`../admins`).
9. **Value Poisoning (Oversized Body)**: Contributor sends a 100KB string in `content` exceeding `maxLength: 15000`.
10. **Timestamp Spoofing**: Client submits backdated `createdAt: Timestamp(2020-01-01)` instead of `serverTimestamp()` (`request.time`).
11. **Immutable Field Tampering**: Update on `/announcements/ann-1` attempts to alter `createdAt` or `authorUid`.
12. **Public Write to Vision 2047 Progress**: Non-admin authenticated user attempts to write fake progress data to `/visionUpdates/v-1`.
