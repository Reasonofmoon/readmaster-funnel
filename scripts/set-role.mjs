#!/usr/bin/env node
/**
 * ReadMaster — Set User Role in Firestore
 * Usage: node set-role.mjs <email> <role>
 * Roles: student | parent | teacher | director | franchise_admin
 *
 * Requires: GOOGLE_APPLICATION_CREDENTIALS or firebase-service-account.json
 * Uses OET Korea Firebase project (oet-korea-platform)
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VALID_ROLES = ['student', 'parent', 'teacher', 'director', 'franchise_admin'];

const email = process.argv[2];
const role = process.argv[3];

if (!email || !role) {
  console.log('Usage: node set-role.mjs <email> <role>');
  console.log('Roles:', VALID_ROLES.join(' | '));
  process.exit(1);
}

if (!VALID_ROLES.includes(role)) {
  console.error(`❌ Invalid role "${role}". Valid: ${VALID_ROLES.join(', ')}`);
  process.exit(1);
}

// Init Firebase Admin
let serviceAccount;
try {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || resolve(__dirname, '..', 'oet-korea', 'firebase-service-account.json');
  serviceAccount = JSON.parse(readFileSync(saPath, 'utf-8'));
} catch (e) {
  console.error('❌ Cannot find firebase-service-account.json');
  console.error('  Place it in oet-korea/ or set GOOGLE_APPLICATION_CREDENTIALS');
  process.exit(1);
}

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);
const auth = getAuth(app);

async function setRole() {
  // Find user by email
  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch (e) {
    console.error(`❌ User not found: ${email}`);
    process.exit(1);
  }

  console.log(`👤 Found: ${user.displayName || user.email} (${user.uid})`);

  // Update Firestore
  await db.collection('users').doc(user.uid).set({
    role: role,
    roleUpdatedAt: new Date().toISOString(),
  }, { merge: true });

  // Also set Custom Claims (for server-side auth rules)
  await auth.setCustomUserClaims(user.uid, { role });

  console.log(`✅ ${email} → role: ${role}`);
  console.log(`   Firestore: users/${user.uid}.role = "${role}"`);
  console.log(`   Custom Claims: { role: "${role}" }`);
  process.exit(0);
}

setRole().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
