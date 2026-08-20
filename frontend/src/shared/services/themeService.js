// Website Theme Preference Service for Setu

const THEME_KEY = 'setu_website_theme_preference';

export const THEME_PRESETS = [
  {
    id: 'saffron',
    name: 'Saffron Heritage',
    description: 'Signature warm saffron and cream aesthetic',
    bgPreview: '#FFF7ED',
    accentPreview: '#F97316',
    borderPreview: '#FED7AA',
    badge: 'Default'
  },
  {
    id: 'dark',
    name: 'Midnight Dark',
    description: 'Sleek dark mode for nighttime reading & high contrast',
    bgPreview: '#0F172A',
    accentPreview: '#F97316',
    borderPreview: '#334155',
    badge: 'Dark'
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    description: 'Calming botanical green inspired by nature & craft',
    bgPreview: '#F0FDF4',
    accentPreview: '#059669',
    borderPreview: '#A7F3D0',
    badge: 'Green'
  },
  {
    id: 'indigo',
    name: 'Royal Indigo',
    description: 'Rich deep indigo blue for a classic modern feel',
    bgPreview: '#EEF2FF',
    accentPreview: '#4F46E5',
    borderPreview: '#C7D2FE',
    badge: 'Indigo'
  }
];

export function getSavedThemePreference() {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw) {
      const found = THEME_PRESETS.find((t) => t.id === raw);
      if (found) return found.id;
    }
  } catch (err) {
    console.error('Error reading theme preference:', err);
  }
  return 'saffron';
}

export function applyThemePreference(themeId) {
  const validTheme = THEME_PRESETS.some((t) => t.id === themeId) ? themeId : 'saffron';

  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('data-theme', validTheme);
    document.body.setAttribute('data-theme', validTheme);

    if (validTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  try {
    localStorage.setItem(THEME_KEY, validTheme);
  } catch (err) {
    console.error('Error saving theme preference:', err);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('setu-theme-changed', { detail: validTheme }));
  }

  return validTheme;
}

// Auto-initialize theme on module load
if (typeof window !== 'undefined') {
  applyThemePreference(getSavedThemePreference());
}
