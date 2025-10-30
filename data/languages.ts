// data/languages.ts
export type Language = {
  code: string;
  name: string;
  flag: string;
  rtl?: boolean;
};

export const languages: Language[] = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
];
