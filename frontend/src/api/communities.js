import { api } from './client';

export async function createCommunity({ name, description, category, visibility = 'public' }) {
  return api.post('/communities', {
    name,
    description,
    category,
    visibility,
  });
}

export async function listCommunities({ category, visibility } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.set('category', category);
  if (visibility) params.set('visibility', visibility);
  const res = await api.get(`/communities?${params.toString()}`);
  return res?.communities || [];
}

export async function getCommunity(id) {
  return api.get(`/communities/${id}`);
}

export async function joinCommunity(id) {
  return api.post(`/communities/${id}/join`, {});
}

export async function leaveCommunity(id) {
  return api.post(`/communities/${id}/leave`, {});
}

export async function updateCommunity(id, updates) {
  return api.put(`/communities/${id}`, updates);
}
