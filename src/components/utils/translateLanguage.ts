import en from '../lang/en.json';
import ja from '../lang/ja.json';
// interface MyObject {
//     en: {};
//     ja: {};
//   }
export function translateLanguage(key: string, language: 'en' | 'ja') {
  const translations = {
    en,
    ja,
  };
  const selectedLanguage: Record<string, string> = translations[language] || en;
  const translation = selectedLanguage[key] || key;

  return translation;
}
