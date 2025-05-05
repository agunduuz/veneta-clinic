export type SubMenuItem = {
  title: string;
  href: string;
};

export type MenuItem = {
  title: string;
  href: string;
  subMenus?: {
    title: string;
    href: string | '';
    items: SubMenuItem[] | [];
  }[];
};

export const navigationItems: MenuItem[] = [
  {
    title: 'Anasayfa',
    href: '/',
  },
  {
    title: 'Ameliyatlı Estetik',
    href: '/ameliyatli-estetik',
    subMenus: [
      {
        title: 'Yüz Estetiği',
        href: '/ameliyatli-estetik/yuz',
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
        href: '/ameliyatli-estetik/vucut',
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
        href: '/ameliyatli-estetik/meme',
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
  // {
  //   title: 'Ameliyatsız Estetik',
  //   href: '/ameliyatsiz-estetik',
  //   subMenus: [
  //     {
  //       title: 'Dolgu Uygulamaları',
  //       href: '/ameliyatsiz-estetik/dolgu',
  //       items: [
  //         {
  //           title: 'Burun Dolgusu',
  //           href: '/ameliyatsiz-estetik/dolgu/burun-dolgusu',
  //         },
  //         {
  //           title: 'Dudak Dolgusu',
  //           href: '/ameliyatsiz-estetik/dolgu/dudak-dolgusu',
  //         },
  //         {
  //           title: 'Göz Altı Işık Dolgusu',
  //           href: '/ameliyatsiz-estetik/dolgu/goz-alti-isik-dolgusu',
  //         },
  //         // ... diğer yüz estetiği işlemleri
  //       ],
  //     },
  //     {
  //       title: 'Mezoterapi',
  //       href: '/ameliyatsiz-estetik/mezoterapi',
  //       items: [
  //         {
  //           title: 'Saç Mezoterapisi',
  //           href: '/ameliyatsiz-estetik/mezoterapi/sac-mezoterapisi',
  //         },
  //         {
  //           title: 'Leke Mezoterapisi',
  //           href: '/ameliyatsiz-estetik/mezoterapi/leke-mezoterapisi',
  //         },
  //         // ... diğer vücut estetiği işlemleri
  //       ],
  //     },
  //     {
  //       title: 'Terleme Tedavisi',
  //       href: '/ameliyatsiz-estetik/terleme-tedavisi',
  //       items: [],
  //     },
  //     {
  //       title: 'Eksozom Tedavisi',
  //       href: '/ameliyatsiz-estetik/eksozom-tedavisi',
  //       items: [],
  //     },
  //   ],
  // },
  {
    title: 'Hakkımızda',
    href: '/about',
  },
  {
    title: 'İletişim',
    href: '/contact',
  },
];
