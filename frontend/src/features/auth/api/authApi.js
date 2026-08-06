import { apiClient, setTokens, clearTokens, getAccessToken } from '../../../shared/api/client';

export async function loginUser({ email, password }) {
  const data = await apiClient('/auth/login', {
    method: 'POST',
    json: { email: email.toLowerCase().trim(), password },
  });

  if (data.access_token) {
    setTokens(data);
    const profile = await getMe();
    return { ...data, user: profile };
  }
  return data;
}

export async function registerUser({ name, email, password, role = 'user', preferredLanguage = 'en' }) {
  const data = await apiClient('/auth/register', {
    method: 'POST',
    json: {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      preferred_language: preferredLanguage,
    },
  });

  if (data.access_token) {
    setTokens(data);
  }

  if (!data.user && data.access_token) {
    const profile = await getMe();
    return { ...data, user: profile };
  }

  return data;
}

export async function getMe() {
  return apiClient('/users/me');
}

export function logoutUser() {
  clearTokens();
}

export function getStoredToken() {
  return getAccessToken();
}
