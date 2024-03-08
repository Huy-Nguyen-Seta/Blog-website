import en from '../lang/en.json';
import ja from '../lang/ja.json';
import vi from '../lang/vi.json'

export function translateLanguage(key: string, language: 'en' | 'ja' | 'vi') {
  const translations = {
    en,
    ja,
    vi
  };
  const selectedLanguage: Record<string, string> = translations[language] || en;
  const translation = selectedLanguage[key] || key;

  return translation;
}
