const API_BASE = '/api';

export const api = {
  // Public
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },
  getAnnouncements: async () => {
    const res = await fetch(`${API_BASE}/announcements`);
    return res.json();
  },
  getTeam: async () => {
    const res = await fetch(`${API_BASE}/team`);
    return res.json();
  },
  getEvents: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/events${query ? `?${query}` : ''}`);
    return res.json();
  },
  getEventDetail: async (id) => {
    const res = await fetch(`${API_BASE}/events/${id}`);
    return res.json();
  },
  registerEvent: async (id, data) => {
    const res = await fetch(`${API_BASE}/events/${id}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLearningResources: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/learning-resources${query ? `?${query}` : ''}`);
    return res.json();
  },
  getAchievements: async () => {
    const res = await fetch(`${API_BASE}/achievements`);
    return res.json();
  },
  getGallery: async () => {
    const res = await fetch(`${API_BASE}/gallery`);
    return res.json();
  },
  submitJoinApplication: async (data) => {
    const res = await fetch(`${API_BASE}/join-us`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  submitContact: async (data) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin Auth & Protected Endpoints
  adminLogin: async (credentials) => {
    const res = await fetch(`${API_BASE}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },
  adminGetOverview: async (token) => {
    const res = await fetch(`${API_BASE}/admin/overview`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  // Admin Team
  adminGetCategories: async (token) => {
    const res = await fetch(`${API_BASE}/admin/team-categories`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminCreateCategory: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/team-categories`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminDeleteCategory: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/team-categories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminGetTeamMembers: async (token) => {
    const res = await fetch(`${API_BASE}/admin/team-members`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminCreateTeamMember: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/team-members`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminUpdateTeamMember: async (token, id, data) => {
    const res = await fetch(`${API_BASE}/admin/team-members/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminDeleteTeamMember: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/team-members/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  // Admin Events
  adminGetEvents: async (token) => {
    const res = await fetch(`${API_BASE}/admin/events`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminCreateEvent: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/events`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminUpdateEvent: async (token, id, data) => {
    const res = await fetch(`${API_BASE}/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminDeleteEvent: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/events/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  // Admin Registrations
  adminGetRegistrations: async (token, eventId = null) => {
    const url = eventId ? `${API_BASE}/admin/registrations?event_id=${eventId}` : `${API_BASE}/admin/registrations`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  // Admin Learning Resources
  adminGetResources: async (token) => {
    const res = await fetch(`${API_BASE}/admin/learning-resources`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminCreateResource: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/learning-resources`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminDeleteResource: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/learning-resources/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  // Admin Achievements
  adminGetAchievements: async (token) => {
    const res = await fetch(`${API_BASE}/admin/achievements`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminCreateAchievement: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/achievements`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminDeleteAchievement: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/achievements/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  // Admin Gallery
  adminGetGalleryAlbums: async (token) => {
    const res = await fetch(`${API_BASE}/admin/gallery-albums`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminCreateGalleryAlbum: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/gallery-albums`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminDeleteGalleryAlbum: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/gallery-albums/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminAddGalleryImage: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/gallery-images`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  // Admin Applications
  adminGetApplications: async (token) => {
    const res = await fetch(`${API_BASE}/admin/applications`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminUpdateApplicationStatus: async (token, id, status) => {
    const res = await fetch(`${API_BASE}/admin/applications/${id}/status`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  // Admin Messages
  adminGetMessages: async (token) => {
    const res = await fetch(`${API_BASE}/admin/contact-messages`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminMarkMessageRead: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/contact-messages/${id}/read`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  // Admin Settings
  adminGetSettings: async (token) => {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  adminUpdateSettings: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

