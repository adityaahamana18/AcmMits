// Standalone Frontend Service (No Backend Server Required)
import { INITIAL_EVENTS, INITIAL_SETTINGS, INITIAL_RESOURCES, INITIAL_ACHIEVEMENTS, INITIAL_GALLERY } from '../mockData';
import { FIXED_TEAM_CATEGORIES } from '../teamData';

const STORAGE_KEYS = {
  EVENTS: 'acm_events_data',
  REGISTRATIONS: 'acm_registrations_data',
  MESSAGES: 'acm_messages_data',
  SETTINGS: 'acm_settings_data',
  APPLICATIONS: 'acm_applications_data'
};

const getStored = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
};

export const api = {
  getSettings: async () => {
    const data = getStored(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    return { success: true, data };
  },

  getAnnouncements: async () => {
    return {
      success: true,
      data: [
        {
          id: 1,
          title: 'Registrations Open for Pixel Prompt & TechPulse 2026!',
          link_url: '/events',
          is_active: true
        }
      ]
    };
  },

  getTeam: async () => {
    return { success: true, data: FIXED_TEAM_CATEGORIES };
  },

  getEvents: async (params = {}) => {
    let events = getStored(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    if (params.featured === 'true') {
      events = events.slice(0, 2);
    }
    return { success: true, data: events };
  },

  getEventDetail: async (id) => {
    const events = getStored(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const event = events.find(e => String(e.id) === String(id)) || events[0];
    return { success: true, data: event };
  },

  registerEvent: async (eventId, regData) => {
    const registrations = getStored(STORAGE_KEYS.REGISTRATIONS, []);
    
    // Duplicate email check
    const existing = registrations.find(r => 
      String(r.event_id) === String(eventId) && 
      r.email.toLowerCase() === regData.email.toLowerCase()
    );

    if (existing) {
      return { success: false, message: 'This email address has already been registered for this event!' };
    }

    const events = getStored(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const ev = events.find(e => String(e.id) === String(eventId));

    const newRecord = {
      id: Date.now(),
      event_id: eventId,
      event_title: ev ? ev.title : 'Event',
      name: regData.name,
      email: regData.email,
      college: regData.college,
      course_year: regData.course_year,
      phone: regData.phone || '',
      team_name: regData.team_name || 'Individual',
      submitted_at: new Date().toISOString()
    };

    registrations.unshift(newRecord);
    setStored(STORAGE_KEYS.REGISTRATIONS, registrations);

    return { 
      success: true, 
      message: `Registration confirmed for ${ev ? ev.title : 'the event'}! See you there.`,
      registration_id: newRecord.id
    };
  },

  getLearningResources: async () => {
    return { success: true, data: INITIAL_RESOURCES };
  },

  getAchievements: async () => {
    return { success: true, data: INITIAL_ACHIEVEMENTS };
  },

  getGallery: async () => {
    return { success: true, data: INITIAL_GALLERY };
  },

  submitContact: async (data) => {
    const messages = getStored(STORAGE_KEYS.MESSAGES, []);
    messages.unshift({
      id: Date.now(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      is_read: false,
      created_at: new Date().toISOString()
    });
    setStored(STORAGE_KEYS.MESSAGES, messages);
    return { 
      success: true, 
      message: 'Thank you for reaching out to MITS ACM Student Chapter! We will get back to you shortly.' 
    };
  },

  // Standalone Client Admin Portal Endpoints
  adminLogin: async ({ username, password }) => {
    if ((username === 'admin' || username === 'acm@mitsgwalior.in') && (password === 'Admin@ACMMits2025!' || password === 'admin')) {
      const mockToken = 'acm_standalone_auth_token_2026';
      return {
        success: true,
        token: mockToken,
        admin: {
          id: 1,
          username: 'admin',
          email: 'acm@mitsgwalior.in',
          role: 'superadmin'
        }
      };
    }
    return { success: false, message: 'Invalid administrative credentials!' };
  },

  adminGetOverview: async () => {
    const events = getStored(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const registrations = getStored(STORAGE_KEYS.REGISTRATIONS, []);
    const messages = getStored(STORAGE_KEYS.MESSAGES, []);

    return {
      success: true,
      stats: {
        total_events: events.length,
        upcoming_events: events.filter(e => e.status === 'Upcoming').length,
        total_team: 11,
        total_resources: INITIAL_RESOURCES.length,
        total_registrations: registrations.length,
        pending_applications: 0,
        unread_messages: messages.filter(m => !m.is_read).length
      },
      recent_registrations: registrations.slice(0, 5),
      recent_applications: [],
      recent_messages: messages.slice(0, 5)
    };
  },

  adminGetEvents: async () => {
    const events = getStored(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const registrations = getStored(STORAGE_KEYS.REGISTRATIONS, []);
    return {
      success: true,
      data: events.map(e => ({
        ...e,
        registration_count: registrations.filter(r => String(r.event_id) === String(e.id)).length
      }))
    };
  },

  adminCreateEvent: async (token, eventData) => {
    const events = getStored(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const newEvent = {
      ...eventData,
      id: Date.now()
    };
    events.unshift(newEvent);
    setStored(STORAGE_KEYS.EVENTS, events);
    return { success: true, data: newEvent };
  },

  adminDeleteEvent: async (token, id) => {
    let events = getStored(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    events = events.filter(e => String(e.id) !== String(id));
    setStored(STORAGE_KEYS.EVENTS, events);
    return { success: true, message: 'Event deleted successfully.' };
  },

  adminGetRegistrations: async () => {
    const registrations = getStored(STORAGE_KEYS.REGISTRATIONS, []);
    return { success: true, data: registrations };
  },

  adminGetTeamMembers: async () => {
    const allMembers = FIXED_TEAM_CATEGORIES.flatMap(c => 
      c.members.map(m => ({ ...m, category_name: c.name }))
    );
    return { success: true, data: allMembers };
  },

  adminGetCategories: async () => {
    return { success: true, data: FIXED_TEAM_CATEGORIES };
  },

  adminGetApplications: async () => {
    return { success: true, data: [] };
  },

  adminGetMessages: async () => {
    const messages = getStored(STORAGE_KEYS.MESSAGES, []);
    return { success: true, data: messages };
  },

  adminMarkMessageRead: async (token, id) => {
    const messages = getStored(STORAGE_KEYS.MESSAGES, []);
    const msg = messages.find(m => String(m.id) === String(id));
    if (msg) msg.is_read = true;
    setStored(STORAGE_KEYS.MESSAGES, messages);
    return { success: true };
  },

  adminGetSettings: async () => {
    const settings = getStored(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    return { success: true, data: settings };
  },

  adminUpdateSettings: async (token, data) => {
    setStored(STORAGE_KEYS.SETTINGS, data);
    return { success: true, message: 'Settings saved successfully.' };
  }
};
