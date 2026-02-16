/**
 * src/services/api.js
 *
 * Client API centralisé pour le backend BrieflyAI sur Railway.
 */

// ── Configuration de l'URL ───────────────────────────────────────────────────
// REMPLACEZ l'URL ci-dessous par l'URL publique générée par Railway (ex: https://synthrss-backend-production.up.railway.app)
const API_BASE ="https://synthssbackend-jilyass3162-5l3wutj5.leapcell.dev";

// ── Gestion du Token ─────────────────────────────────────────────────────────
const TOKEN_KEY = "brieflyai_token";

export const tokenStorage = {
  get:    ()      => localStorage.getItem(TOKEN_KEY),
  set:    (token) => localStorage.setItem(TOKEN_KEY, token),
  remove: ()      => localStorage.removeItem(TOKEN_KEY),
  exists: ()      => !!localStorage.getItem(TOKEN_KEY),
};

// ── Wrapper Core Fetch ───────────────────────────────────────────────────────
async function request(path, options = {}) {
  const headers = { ...options.headers };

  // N'ajoute le Content-Type JSON que si ce n'est pas déjà défini (pour laisser le login gérer le sien)
  if (!headers["Content-Type"] && !(options.body instanceof URLSearchParams)) {
    headers["Content-Type"] = "application/json";
  }

  const token = tokenStorage.get();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = { message: response.statusText };
    }

    return { ok: response.ok, status: response.status, data };
  } catch (networkError) {
    return {
      ok: false,
      status: 0,
      data: { message: "Impossible de joindre le serveur Railway. Vérifiez le CORS ou la connexion." },
    };
  }
}

// ── API Auth ─────────────────────────────────────────────────────────────────

/**
 * Register reste en JSON standard
 */
export async function apiRegister(payload) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Login : Modification pour FastAPI OAuth2
 * FastAPI attend souvent un format 'application/x-www-form-urlencoded' 
 * avec les clés 'username' et 'password'.
 */
export async function apiLogin({ email, password }) {
  // Utilisation de URLSearchParams pour correspondre à OAuth2PasswordRequestForm du backend
  const formData = new URLSearchParams();
  formData.append("username", email); // FastAPI utilise 'username' par défaut pour l'email
  formData.append("password", password);

  const result = await request("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (result.ok && result.data?.access_token) {
    tokenStorage.set(result.data.access_token);
  }

  return result;
}

export function apiLogout() {
  tokenStorage.remove();
}

/**
 * Extraction des erreurs améliorée pour FastAPI
 */
export function extractApiError(data, fallback = "Une erreur est survenue.") {
  if (!data?.detail) return fallback;
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail)) return data.detail.map(e => e.msg).join(". ");
  if (data.detail.message) return data.detail.message;
  return fallback;
}
