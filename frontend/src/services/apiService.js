// API Service for communicating with Python FastAPI Backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Health check endpoint GET /api/health
 */
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

/**
 * Main AI Chat Pipeline Endpoint POST /api/chat
 * Includes Keras classification, web search intelligence, and Wise Old Master persona.
 */
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

/**
 * Keras Intent Classification Endpoint POST /api/classify
 */
export async function classifyPrompt(prompt) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error('Classification failed');
    return await response.json();
  } catch (error) {
    return { category: 'General', confidence: 0.5, vector_norm: 0.0 };
  }
}
