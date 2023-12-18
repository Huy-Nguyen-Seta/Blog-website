export const i18n = {
    defaultLocale: 'en',
    locales: [ 'ja', 'en'],
} as const;

export type Locale = typeof i18n['locales'][number];