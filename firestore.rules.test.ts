import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const rules = fs.readFileSync('firestore.rules', 'utf8');
const blueprint = JSON.parse(fs.readFileSync('firebase-blueprint.json', 'utf8'));

test('firestore.rules has default-deny catch-all first', () => {
  const catchAllIndex = rules.indexOf('match /{document=**}');
  const firstCollectionIndex = rules.indexOf('match /announcements/');
  assert.ok(catchAllIndex > 0, 'Default deny catch-all must exist');
  assert.ok(catchAllIndex < firstCollectionIndex, 'Default deny catch-all must precede collection rules');
});

test('every collection in firebase-blueprint.json has a matching rule block', () => {
  const paths = Object.keys(blueprint.firestore);
  for (const p of paths) {
    assert.ok(rules.includes(`match ${p}`), `Missing rule block for ${p}`);
  }
});

test('submissions enforce pending status on create and isolate PII reads', () => {
  assert.ok(rules.includes("incoming().status == 'pending'"));
  assert.ok(rules.includes('existing().authorUid == request.auth.uid'));
  assert.ok(rules.includes('request.auth.token.email_verified == true'));
});

test('no blanket isSignedIn() list rules exist', () => {
  assert.equal(rules.includes('allow list: if isSignedIn();'), false);
  assert.equal(rules.includes('allow read: if isSignedIn();'), false);
});

test('all writes enforce request.time and isValidId path hardening', () => {
  assert.ok(rules.includes('incoming().createdAt == request.time'));
  assert.ok(rules.includes('incoming().updatedAt == request.time'));
  assert.ok(rules.includes('isValidId(announcementId)'));
  assert.ok(rules.includes('isValidId(submissionId)'));
});
