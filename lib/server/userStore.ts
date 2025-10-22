import { promises as fs } from "fs"
import path from "path"

export interface StoredUser {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: string
  updatedAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "users.json")

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(DATA_FILE, "[]", "utf8")
  }
}

export async function readUsers(): Promise<StoredUser[]> {
  await ensureDataFile()
  const raw = await fs.readFile(DATA_FILE, "utf8")
  if (!raw.trim()) {
    return []
  }
  try {
    return JSON.parse(raw) as StoredUser[]
  } catch (error) {
    console.error("[userStore] Failed to parse users.json", error)
    return []
  }
}

export async function writeUsers(users: StoredUser[]): Promise<void> {
  await ensureDataFile()
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf8")
}

export async function findUserByEmail(email: string): Promise<StoredUser | undefined> {
  const users = await readUsers()
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

export async function saveUser(user: StoredUser): Promise<StoredUser> {
  const users = await readUsers()
  const existingIndex = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase())

  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }

  await writeUsers(users)
  return user
}

export async function getUserById(id: string): Promise<StoredUser | undefined> {
  const users = await readUsers()
  return users.find((user) => user.id === id)
}
