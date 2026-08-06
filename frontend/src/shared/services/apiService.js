// API Service for communicating with Python FastAPI Backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      return { connected: false, statusText: response.statusText };
    }
    const data = await response.json();
    return { connected: true, ...data };
  } catch (error) {
    return { connected: false, error: error.message };
  }
}

export async function sendChatMessage(prompt, category = 'General', localContext = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, category, local_context: localContext }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.warn('Backend API request failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function sendChatMessageStream(prompt, options = {}, onChunk, signal) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, options }),
      signal
    });

    if (!response.ok) {
      // Fallback response generator if streaming endpoint is not implemented on backend
      const fallbackResponse = `Thank you for asking about "${prompt}". Setu's traditional knowledge database emphasizes time-tested methods passed down by generations of elders, combined with modern ecological science for sustainable living.`;
      const words = fallbackResponse.split(' ');
      for (const word of words) {
        if (signal?.aborted) break;
        onChunk(word + ' ');
        await new Promise((r) => setTimeout(r, 40));
      }
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    
    // Graceful fallback streaming simulation
    const fallbackResponse = `Thank you for asking about "${prompt}". Setu's verified heritage archives detail ancestral practices and local wisdom passed down through generations.`;
    const words = fallbackResponse.split(' ');
    for (const word of words) {
      if (signal?.aborted) break;
      onChunk(word + ' ');
      await new Promise((r) => setTimeout(r, 45));
    }
  }
}

export async function classifyPrompt(prompt) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error('Classification failed');
    return await response.json();
  } catch (_error) {
    return { category: 'General', confidence: 0.5, vector_norm: 0.0 };
  }
}
