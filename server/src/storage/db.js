import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'access_log.json');

// Ensure data directory and db file exist
async function ensureDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Failed to initialize database storage:', error);
  }
}

export async function saveAccessLog(email) {
  await ensureDb();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    email,
    timestamp: new Date().toISOString()
  };

  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    const logs = JSON.parse(data || '[]');
    logs.push(entry);
    await fs.writeFile(DB_FILE, JSON.stringify(logs, null, 2), 'utf-8');
    return entry;
  } catch (error) {
    console.error('Error saving to access log:', error);
    throw error;
  }
}

export async function getAllLogs() {
  await ensureDb();
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
}
