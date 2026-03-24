#!/usr/bin/env node
/**
 * ReadMaster — Seed Branches Collection in Firestore
 * Usage: node seed-branches.mjs
 * 
 * Creates the `branches` collection with default branch data.
 * Uses OET Korea Firebase project (oet-korea-platform).
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let serviceAccount;
try {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || resolve(__dirname, '..', '..', 'oet-korea', 'firebase-service-account.json');
  serviceAccount = JSON.parse(readFileSync(saPath, 'utf-8'));
} catch (e) {
  console.error('❌ Cannot find firebase-service-account.json');
  process.exit(1);
}

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

const BRANCHES = [
  {
    id: 'okgil',
    name: '부천 옥길동 본원',
    shortName: '옥길동',
    address: '경기도 부천시 옥길동',
    phone: '010-8460-1764',
    director: 'Dante',
    status: 'active',
    openDate: '2026-07-01',
    theme: { primary: '#062016', accent: '#c9a94d', bg: '#f9f7f2' },
  },
  {
    id: 'udu',
    name: '춘천 우두동점',
    shortName: '우두동',
    address: '강원도 춘천시 우두동',
    phone: '010-9595-3225',
    director: '백민',
    status: 'active',
    openDate: '2026-07-01',
    theme: { primary: '#062016', accent: '#c9a94d', bg: '#f9f7f2' },
  },
];

async function seed() {
  for (const branch of BRANCHES) {
    const { id, ...data } = branch;
    await db.collection('branches').doc(id).set({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    console.log(`✅ branches/${id} — ${data.name}`);
  }
  console.log(`\n🏢 ${BRANCHES.length} branches seeded.`);
  process.exit(0);
}

seed().catch(err => { console.error('❌', err.message); process.exit(1); });
