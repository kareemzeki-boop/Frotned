// ─── CladWise UAE — Frontend API Utility ─────────────────────────────────────
// Usage: import './api.js' in your HTML, then call API.login(), API.getMe() etc.

const BASE_URL = 'https://backend-cladwise-production.up.railway.app/api'

// ─── AUTH HELPERS ─────────────────────────────────────────────────────────────
export const Auth = {
  getToken:  ()      => localStorage.getItem('cw_token'),
  setToken:  (token) => localStorage.setItem('cw_token', token),
  logout:    ()      => { localStorage.removeItem('cw_token'); window.location.reload() },
  isLoggedIn:()      => !!localStorage.getItem('cw_token'),
}

// ─── CORE FETCH ───────────────────────────────────────────────────────────────
async function apiFetch(method, path, body = null) {
  const headers = { 'Content-Type': 'application/json' }
  const token   = Auth.getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const options = { method, headers }
  if (body && method !== 'GET') options.body = JSON.stringify(body)

  const res  = await fetch(BASE_URL + path, options)
  const data = await res.json()

  if (res.status === 401) {
    Auth.logout()
    return
  }

  if (!res.ok) throw { status: res.status, ...data }
  return data
}

// ─── API METHODS ──────────────────────────────────────────────────────────────
export const API = {
  // Auth
  register: (body)    => apiFetch('POST', '/auth/register', body),
  login:    (body)    => apiFetch('POST', '/auth/login',    body),

  // User
  getMe:          ()     => apiFetch('GET',   '/users/me'),
  updateProfile:  (body) => apiFetch('PATCH', '/users/profile', body),

  // Documents
  uploadDocument: (body) => apiFetch('POST', '/suppliers/documents', body),
  getDocuments:   ()     => apiFetch('GET',  '/suppliers/documents'),

  // Projects (ARCHITECT only)
  getProjects:    ()     => apiFetch('GET',  '/projects'),
  createProject:  (body) => apiFetch('POST', '/projects', body),

  // Products (SUPPLIER only)
  getProducts:    ()     => apiFetch('GET',  '/products'),
  createProduct:  (body) => apiFetch('POST', '/products', body),

  // Payments
  getSubscriptionStatus: ()          => apiFetch('GET',  '/payments/status'),
  createCheckoutSession: (priceId)   => apiFetch('POST', '/payments/create-session', { priceId }),

  // Admin
  getSuppliers:        ()        => apiFetch('GET', '/admin/suppliers'),
  getPendingSuppliers: ()        => apiFetch('GET', '/admin/suppliers/pending'),
  getSupplierDetails:  (id)      => apiFetch('GET', `/admin/suppliers/${id}`),
  verifySupplier:      (id, body) => apiFetch('PATCH', `/admin/suppliers/${id}/verify`, body),
  renewSupplier:       (id, body) => apiFetch('PATCH', `/admin/suppliers/${id}/renew`, body),
  getAuditLog:         (id)      => apiFetch('GET', `/admin/suppliers/${id}/audit`),
  getAllUsers:         ()        => apiFetch('GET', '/admin/users'),
}

// ─── UI HELPERS ───────────────────────────────────────────────────────────────
export const UI = {
  show:       (id)        => { const el = document.getElementById(id); if (el) el.style.display = '' },
  hide:       (id)        => { const el = document.getElementById(id); if (el) el.style.display = 'none' },
  setText:    (id, text)  => { const el = document.getElementById(id); if (el) el.textContent = text },
  setLoading: (btnId, on) => {
    const btn = document.getElementById(btnId)
    if (!btn) return
    btn.disabled = on
    btn.textContent = on ? 'Loading…' : btn.dataset.label || 'Submit'
  },
  showError:  (id, msg)   => {
    const el = document.getElementById(id)
    if (el) { el.textContent = msg; el.style.display = msg ? '' : 'none' }
  },

  // Apply uiConfig from /users/me to show/hide elements
  applyUiConfig: (uiConfig) => {
    const { permissions } = uiConfig
    document.querySelectorAll('[data-require-permission]').forEach(el => {
      const perm = el.dataset.requirePermission
      el.style.display = permissions[perm] ? '' : 'none'
    })
  },
}

// ─── REQUIRE AUTH GUARD ───────────────────────────────────────────────────────
// Call this at the top of any page that needs auth
// Returns session { user, profile, uiConfig } or redirects to login
export async function requireAuth(loginPath = '/') {
  if (!Auth.isLoggedIn()) {
    window.location.href = loginPath
    return null
  }
  try {
    const session = await API.getMe()
    UI.applyUiConfig(session.uiConfig)
    return session
  } catch {
    Auth.logout()
    return null
  }
}

// ─── VERIFIED BADGE HELPER ────────────────────────────────────────────────────
export function getVerificationBadge(status) {
  const badges = {
    VERIFIED: { icon: '✓', color: '#10b981', text: 'Verified' },
    PENDING: { icon: '⏳', color: '#f59e0b', text: 'Pending' },
    REJECTED: { icon: '✕', color: '#ef4444', text: 'Rejected' },
    EXPIRED: { icon: '⚠', color: '#6b7280', text: 'Expired' }
  }
  return badges[status] || badges.PENDING
}

// ─── DATE FORMATTING ──────────────────────────────────────────────────────────
export function formatDateUAE(date) {
  return new Date(date).toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function daysUntilExpiry(expiryDate) {
  const now = new Date()
  const expiry = new Date(expiryDate)
  const diff = expiry - now
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
