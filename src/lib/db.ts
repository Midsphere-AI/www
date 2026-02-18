import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const DB_PATH = resolve('data/waitlist.db');
mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

export function addToWaitlist(email: string, name: string): { success: boolean; error?: string } {
  try {
    db.prepare('INSERT INTO waitlist (email, name) VALUES (?, ?)').run(email, name);
    return { success: true };
  } catch (err: any) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, error: 'This email is already on the waitlist.' };
    }
    throw err;
  }
}

export function getWaitlistEntries(): { id: number; email: string; name: string; created_at: string }[] {
  return db.prepare('SELECT id, email, name, created_at FROM waitlist ORDER BY id DESC').all() as any;
}
