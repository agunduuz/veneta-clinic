export type Language = {
  code: string;
  name: string;
  flag: string;
  rtl?: boolean;
};

export const languages: Language[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', rtl: true },
];
