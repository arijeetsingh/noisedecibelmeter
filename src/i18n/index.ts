import en from './en';
import es from './es';
import fr from './fr';
import ja from './ja';
import zh from './zh';
import pt from './pt';

export type { Translations } from './en';

export const LOCALES = ['es', 'fr', 'ja', 'zh', 'pt'] as const;
export type Locale = typeof LOCALES[number];

const map = { en, es, fr, ja, zh, pt };

export function getTranslations(lang: string) {
  return map[lang as keyof typeof map] ?? en;
}

export function localePath(lang: string, path: string) {
  const base = lang === 'en' ? '' : `/${lang}`;
  return path ? `${base}/${path}/` : `${base}/`;
}
