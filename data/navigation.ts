export type SubMenuItem = {
  title: string;
  href: string;
};

export type MenuItem = {
  title: string;
  href: string;
  subMenus?: {
    title: string;
    items: SubMenuItem[];
  }[];
};

export const navigationItems: MenuItem[] = [
  {
    title: 'Anasayfa',
    href: '/',
  },
  {
    title: 'Ameliyatlı Estetik',
    href: '',
    subMenus: [
      {
        title: 'Yüz Estetiği',
        items: [
          {
            title: 'Burun Estetiği',
            href: '/ameliyatli-estetik/yuz/burun-estetigi',
          },
          {
            title: 'Yüz Germe',
            href: '/ameliyatli-estetik/yuz/yuz-germe',
          },
          {
            title: 'Badem Göz Estetiği',
            href: '/ameliyatli-estetik/yuz/badem-goz-estetigi',
          },
          // ... diğer yüz estetiği işlemleri
        ],
      },
      {
        title: 'Vücut Estetiği',
        items: [
          {
            title: 'Karın Germe',
            href: '/ameliyatli-estetik/vucut/karin-germe',
          },
          {
            title: 'Liposuction',
            href: '/ameliyatli-estetik/vucut/liposuction',
          },
          // ... diğer vücut estetiği işlemleri
        ],
      },
      {
        title: 'Meme Estetiği',
        items: [
          {
            title: 'Meme Büyütme Ameliyatı',
            href: '/ameliyatli-estetik/meme/buyutme',
          },
          {
            title: 'Meme Küçültme Ameliyatı',
            href: '/ameliyatli-estetik/meme/kucultme',
          },
          // ... diğer meme estetiği işlemleri
        ],
      },
    ],
  },
  {
    title: 'Hakkımızda',
    href: '/hakkimizda',
  },
  {
    title: 'İletişim',
    href: '/iletisim',
  },
];
