// Local Storage & JSON File History Service

const RECENT_CHATS_KEY = 'ai_setu_recent_chats';
const CACHE_KEY = 'ai_setu_chat_cache';
const SAVED_CHATS_KEY = 'ai_setu_saved_chat_sessions';

const DEFAULT_RECENT_CHATS = [];

export function loadSavedChats() {
  try {
    const data = localStorage.getItem(SAVED_CHATS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error loading saved chats:', err);
    return [];
  }
}

export function saveChatsToStorage(chats) {
  try {
    localStorage.setItem(SAVED_CHATS_KEY, JSON.stringify(chats));
  } catch (err) {
    console.error('Error saving chats to storage:', err);
  }
}

export function getRecentChats() {
  try {
    const data = localStorage.getItem(RECENT_CHATS_KEY);
    if (!data) {
      localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(DEFAULT_RECENT_CHATS));
      return DEFAULT_RECENT_CHATS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading recent chats:', err);
    return DEFAULT_RECENT_CHATS;
  }
}

export function addRecentChat(title, category = 'General') {
  try {
    const current = getRecentChats();
    const cleanTitle = title.length > 32 ? title.substring(0, 32) + '...' : title;
    const existingIndex = current.findIndex(c => c.title.toLowerCase() === cleanTitle.toLowerCase());
    
    let updated;
    if (existingIndex >= 0) {
      const item = current[existingIndex];
      updated = [item, ...current.filter((_, idx) => idx !== existingIndex)];
    } else {
      const newChat = {
        id: Date.now().toString(),
        title: cleanTitle,
        timestamp: 'Just now',
        category
      };
      updated = [newChat, ...current];
    }

    localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error adding recent chat:', err);
    return getRecentChats();
  }
}

export function deleteChatById(id) {
  try {
    const current = getRecentChats();
    const updated = current.filter(c => c.id !== id);
    localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting chat:', err);
    return getRecentChats();
  }
}

export function clearRecentChats() {
  try {
    localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify([]));
    return [];
  } catch (err) {
    console.error('Error clearing chats:', err);
    return [];
  }
}

export function getAllHistory() {
  try {
    const cacheRaw = localStorage.getItem(CACHE_KEY);
    if (!cacheRaw) {
      localStorage.setItem(CACHE_KEY, JSON.stringify({}));
      return [];
    }

    const cache = JSON.parse(cacheRaw);
    const demoIds = ['hist_1', 'hist_2', 'hist_3', 'hist_4'];
    const keys = Object.keys(cache).filter(key => {
      const item = cache[key];
      return item && !demoIds.includes(item.id);
    });

    return keys.map((key, idx) => ({
      id: cache[key].id || `hist_${idx}_${Date.now()}`,
      query: cache[key].query || key,
      response: cache[key].response,
      category: cache[key].category || 'General',
      source: cache[key].source || 'Local Storage Cache',
      timestamp: cache[key].savedAt || new Date().toISOString()
    }));
  } catch (err) {
    console.error('Error fetching history:', err);
    return [];
  }
}

export function deleteHistoryItem(queryToDelete) {
  try {
    const cacheRaw = localStorage.getItem(CACHE_KEY);
    if (!cacheRaw) return [];
    
    const cache = JSON.parse(cacheRaw);
    const normalizedKey = queryToDelete.trim().toLowerCase();
    
    delete cache[normalizedKey];
    
    Object.keys(cache).forEach(k => {
      if (cache[k].query && cache[k].query.toLowerCase() === normalizedKey) {
        delete cache[k];
      }
    });

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    return getAllHistory();
  } catch (err) {
    console.error('Error deleting history item:', err);
    return getAllHistory();
  }
}

export function deleteHistoryAndChat(id, queryTitle) {
  try {
    if (id) {
      deleteChatById(id);
    }
    if (queryTitle) {
      deleteHistoryItem(queryTitle);
    }
    return {
      recentChats: getRecentChats(),
      allHistory: getAllHistory()
    };
  } catch (err) {
    console.error('Error deleting history and chat:', err);
    return {
      recentChats: getRecentChats(),
      allHistory: getAllHistory()
    };
  }
}

export function clearLocalStorageCache() {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({}));
    return [];
  } catch (err) {
    console.error('Error clearing cache:', err);
    return [];
  }
}

export function searchLocalStorage(query) {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const normalizedQuery = query.trim().toLowerCase();
    const demoIds = ['hist_1', 'hist_2', 'hist_3', 'hist_4'];
    
    if (cache[normalizedQuery]) {
      const item = cache[normalizedQuery];
      if (item && !demoIds.includes(item.id)) {
        return { found: true, data: item };
      }
    }

    const matchedKey = Object.keys(cache).find(k => {
      const item = cache[k];
      if (item && demoIds.includes(item.id)) return false;
      return k.includes(normalizedQuery) || normalizedQuery.includes(k);
    });

    if (matchedKey) {
      return { found: true, data: cache[matchedKey] };
    }

    return { found: false };
  } catch (err) {
    console.error('Error searching local storage:', err);
    return { found: false };
  }
}

export function saveToLocalStorageCache(query, response, category = 'General', extraData = {}) {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const normalizedQuery = query.trim().toLowerCase();
    cache[normalizedQuery] = {
      id: `hist_${Date.now()}`,
      query,
      response,
      category: extraData.category || category,
      source: extraData.source || 'FastAPI Backend Engine',
      points: extraData.points || null,
      kerasMetadata: extraData.kerasMetadata || extraData.keras_metadata || null,
      persona: extraData.persona || 'Wise Old Master',
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.error('Error saving to local storage:', err);
  }
}

export function exportHistoryAsJSON() {
  try {
    const historyData = getAllHistory();
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(historyData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'history.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (err) {
    console.error('Error exporting history JSON:', err);
  }
}

export function importHistoryFromJSON(jsonArray) {
  try {
    if (!Array.isArray(jsonArray)) return getAllHistory();
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    
    jsonArray.forEach((item) => {
      if (item.query && item.response) {
        const key = item.query.trim().toLowerCase();
        cache[key] = {
          id: item.id || `hist_${Date.now()}`,
          query: item.query,
          response: item.response,
          category: item.category || 'General',
          source: item.source || 'Local Storage Cache',
          savedAt: item.timestamp || new Date().toISOString()
        };
      }
    });

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    return getAllHistory();
  } catch (err) {
    console.error('Error importing history JSON:', err);
    return getAllHistory();
  }
}
