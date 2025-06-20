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
      },
      {
        title: 'Burun Estetiği',
        href: '/ameliyatli-estetik/burun-estetigi',
      },
      {
        title: 'Yüz Germe',
        href: '/ameliyatli-estetik/yuz-germe',
      },
      {
        title: 'Göz Kapak Estetiği',
        href: '/ameliyatli-estetik/goz-kapagi-estetigi',
      },
      {
        title: 'Vücut Estetiği',
        href: '/ameliyatli-estetik/vucut',
      },
      {
        title: 'Karın Germe',
        href: '/ameliyatli-estetik/karin-germe',
      },
      {
        title: 'Liposuction',
        href: '/ameliyatli-estetik/liposuction',
      },
      {
        title: 'Meme Estetiği',
        href: '/ameliyatli-estetik/meme',
      },
      {
        title: 'Meme Büyütme Ameliyatı',
        href: '/ameliyatli-estetik/meme-buyutme',
      },
      {
        title: 'Meme Küçültme Ameliyatı',
        href: '/ameliyatli-estetik/meme-kucultme',
      },
    ],
  },
  {
    title: 'Lazer Epilasyon',
    href: '/lazer-epilasyon',
  },
  {
    title: 'Saç Ekimi',
    href: '/sac-ekimi',
  },
  {
    title: 'Hakkımızda',
    href: '/hakkimizda',
  },
  {
    title: 'Müşteri Yorumları',
    href: 'https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2',
  },
  {
    title: 'İletişim',
    href: '/iletisim',
  },
];

// English navigation data
export const englishNavigationItems: MenuItem[] = [
  {
    title: 'Home',
    href: '/en',
  },
  {
    title: 'Surgical Aesthetics',
    href: '/en/surgical-aesthetics',
    subMenus: [
      {
        title: 'Facial Aesthetics',
        href: '/en/surgical-aesthetics/facial',
      },
      {
        title: 'Rhinoplasty',
        href: '/en/surgical-aesthetics/facial-rhinoplasty',
      },
      {
        title: 'Face Lift',
        href: '/en/surgical-aesthetics/facial-face-lift',
      },
      {
        title: 'Eye Bag Surgery',
        href: '/en/surgical-aesthetics/facial-eye-bag-surgery',
      },
      {
        title: 'Body Aesthetics',
        href: '/en/surgical-aesthetics/body',
      },
      {
        title: 'Tummy Tuck',
        href: '/en/surgical-aesthetics/body-tummy-tuck',
      },
      {
        title: 'Liposuction',
        href: '/en/surgical-aesthetics/body-liposuction',
      },
      {
        title: 'Breast Aesthetics',
        href: '/en/surgical-aesthetics/breast',
      },
      {
        title: 'Breast Augmentation',
        href: '/en/surgical-aesthetics/breast-augmentation',
      },
      {
        title: 'Breast Reduction',
        href: '/en/surgical-aesthetics/breast-reduction',
      },
    ],
  },
  {
    title: 'Laser Hair Removal',
    href: '/en/laser-hair-removal',
  },
  {
    title: 'Hair Transplant',
    href: '/en/hair-transplant',
  },
  {
    title: 'About Us',
    href: '/en/about',
  },
  {
    title: 'Customer Reviews',
    href: 'https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2',
  },
  {
    title: 'Contact',
    href: '/en/contact',
  },
];
