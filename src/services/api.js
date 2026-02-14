/**
 * src/services/api.js
 *
 * Centralised API client for the BrieflyAI backend.
 * All fetch calls live here so the pages stay clean and backend URL
 * changes only need to happen in one place.
 */

// ── Base URL ─────────────────────────────────────────────────────────────────
// In production, change this to your deployed backend URL or use an env var:
//   REACT_APP_API_URL=https://api.brieflyai.com
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

// ── Token helpers ─────────────────────────────────────────────────────────────
const TOKEN_KEY = "brieflyai_token";

export const tokenStorage = {
  get:    ()      => localStorage.getItem(TOKEN_KEY),
  set:    (token) => localStorage.setItem(TOKEN_KEY, token),
  remove: ()      => localStorage.removeItem(TOKEN_KEY),
  exists: ()      => !!localStorage.getItem(TOKEN_KEY),
};

// ── Core fetch wrapper ───────────────────────────────────────────────────────
/**
 * Perform a JSON API request.
 *
 * @param {string} path   - API path, e.g. "/api/auth/login"
 * @param {object} options - fetch options (method, body, etc.)
 * @returns {Promise<{ ok: boolean, status: number, data: any }>}
 *
 * The returned object always has:
 *   .ok     — true if HTTP 2xx
 *   .status — the HTTP status code
 *   .data   — parsed JSON body
 */
async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };

  // Attach Bearer token if one is stored
  const token = tokenStorage.get();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let data = null;
  let status = 0;

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    status = response.status;

    // Try to parse JSON — some error responses have a body, some don't
    try {
      data = await response.json();
    } catch {
      data = { message: response.statusText };
    }

    return { ok: response.ok, status, data };
  } catch (networkError) {
    // Network failure (server down, CORS misconfiguration, etc.)
    return {
      ok: false,
      status: 0,
      data: {
        message:
          "Cannot reach the server. Please check your connection or try again later.",
      },
    };
  }
}

// ── Auth API ─────────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register
 *
 * @param {{ full_name: string, email: string, password: string, interests: string[] }} payload
 * @returns {Promise<{ ok: boolean, status: number, data: any }>}
 */
export async function apiRegister(payload) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/auth/login
 *
 * On success, automatically stores the JWT in localStorage.
 *
 * @param {{ email: string, password: string }} payload
 * @returns {Promise<{ ok: boolean, status: number, data: any }>}
 */
export async function apiLogin(payload) {
  const result = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Auto-store the token on successful login
  if (result.ok && result.data?.access_token) {
    tokenStorage.set(result.data.access_token);
  }

  return result;
}

/**
 * Logout — clear the stored token.
 */
export function apiLogout() {
  tokenStorage.remove();
}

/**
 * Extract a human-readable error message from an API response.
 *
 * The backend returns errors in two shapes:
 *   { "detail": { "code": "...", "message": "..." } }   ← custom errors
 *   { "detail": [ { "msg": "...", "loc": [...] } ] }    ← Pydantic validation errors
 *   { "detail": "plain string" }                        ← FastAPI defaults
 *
 * @param {any} data - the parsed JSON error body
 * @param {string} fallback - message to return if parsing fails
 */
export function extractApiError(data, fallback = "Something went wrong. Please try again.") {
  if (!data?.detail) return fallback;

  const detail = data.detail;

  // Custom structured error: { code, message }
  if (typeof detail === "object" && !Array.isArray(detail) && detail.message) {
    return detail.message;
  }

  // Pydantic validation errors array
  if (Array.isArray(detail)) {
    return detail.map((e) => e.msg || e.message || JSON.stringify(e)).join(". ");
  }

  // Plain string
  if (typeof detail === "string") {
    return detail;
  }

  return fallback;
}
