import bcrypt from 'bcryptjs'

export type AdminUser = {
  name: string
  email: string
  password?: string
  passwordHash?: string
}

export type User = {
  name: string
  email: string
  password?: string
  passwordHash?: string
}

const ADMIN_USERS_STORAGE_KEY = 'ecom_admin_users'
const USERS_STORAGE_KEY = 'ecom_users'

export const normalizeEmail = (email: string) => email.trim().toLowerCase()

export const getAdminUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem(ADMIN_USERS_STORAGE_KEY) ?? '[]') as AdminUser[]
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

export const getUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) ?? '[]') as User[]
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

const saveAdminUsers = (users: AdminUser[]) => {
  localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(users))
}

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}


export const createAdminUser = async (name: string, email: string, password: string) => {
  const users = getAdminUsers()
  const normalizedEmail = normalizeEmail(email)

  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    return { error: 'An account with this email already exists.' }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = { name: name.trim(), email: normalizedEmail, passwordHash , role: 'admin'}

  saveAdminUsers([...users, newUser])

  return { user: newUser }
}

export const createUser = async (name: string, email: string, password: string) => {
  const users = getUsers()
  const normalizedEmail = normalizeEmail(email)

  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    return { error: 'An account with this email already exists.' }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = { name: name.trim(), email: normalizedEmail, passwordHash ,role: 'user'}

  saveUsers([...users, newUser])

  return { user: newUser }
}

export const verifyAdminUser = async (email: string, password: string) => {
  const users = getAdminUsers()
  const normalizedEmail = normalizeEmail(email)
  const foundUser = users.find((user) => normalizeEmail(user.email) === normalizedEmail)

  if (!foundUser) {
    return null
  }

  if (foundUser.passwordHash) {
    const passwordMatches = await bcrypt.compare(password, foundUser.passwordHash)
    return passwordMatches ? foundUser : null
  }

  if (foundUser.password === password) {
    const passwordHash = await bcrypt.hash(password, 10)
    const migratedUsers = users.map((user) =>
      normalizeEmail(user.email) === normalizedEmail ? { ...user, password: undefined, passwordHash } : user,
    )

    saveAdminUsers(migratedUsers)

    return { ...foundUser, password: undefined, passwordHash }
  }

  return null
}

const SignUp = async (name: string, email: string, password: string) => {
  const result = await createUser(name, email, password)
  if (result.error) {
    return { error: result.error }
  }
}


export const verifyUser = async (email: string, password: string) => {
  const users = getUsers()
  const normalizedEmail = normalizeEmail(email)
  const foundUser = users.find((user) => normalizeEmail(user.email) === normalizedEmail)

  if (!foundUser) {
    return null
  }

  if (foundUser.passwordHash) {
    const passwordMatches = await bcrypt.compare(password, foundUser.passwordHash)
    return passwordMatches ? foundUser : null
  }

  if (foundUser.password === password) {
    const passwordHash = await bcrypt.hash(password, 10)
    const migratedUsers = users.map((user) =>
      normalizeEmail(user.email) === normalizedEmail ? { ...user, password: undefined, passwordHash } : user,
    )

    saveUsers(migratedUsers)

    return { ...foundUser, password: undefined, passwordHash }
  }

  return null
}
