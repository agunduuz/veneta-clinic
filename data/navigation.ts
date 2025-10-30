// data/navigation.ts
export type SubMenuItem = {
  titleKey: string;
  href: {
    tr: string;
    en: string;
  };
};

export type MenuItem = {
  titleKey: string;
  href: {
    tr: string;
    en: string;
  };
  subMenus?: SubMenuItem[];
};

// ✅ Single source of truth - dil bazlı href'ler
export const navigationItems: MenuItem[] = [
  {
    titleKey: "nav.home",
    href: {
      tr: "/",
      en: "/en/",
    },
  },
  {
    titleKey: "nav.surgicalAesthetics",
    href: {
      tr: "/ameliyatli-estetik",
      en: "/en/surgical-aesthetics",
    },
    subMenus: [
      {
        titleKey: "nav.facialAesthetics",
        href: {
          tr: "/ameliyatli-estetik/yuz",
          en: "/en/surgical-aesthetics/facial", // ✅ CLEAN
        },
      },
      {
        titleKey: "nav.rhinoplasty",
        href: {
          tr: "/ameliyatli-estetik/burun-estetigi",
          en: "/en/surgical-aesthetics/rhinoplasty", // ✅ FIXED: Removed "facial-" prefix
        },
      },
      {
        titleKey: "nav.faceLift",
        href: {
          tr: "/ameliyatli-estetik/yuz-germe",
          en: "/en/surgical-aesthetics/face-lift", // ✅ FIXED: Removed "facial-" prefix
        },
      },
      {
        titleKey: "nav.eyelidSurgery",
        href: {
          tr: "/ameliyatli-estetik/goz-kapagi-estetigi",
          en: "/en/surgical-aesthetics/eye-bag-surgery", // ✅ FIXED: Removed "facial-" prefix
        },
      },
      {
        titleKey: "nav.bodyAesthetics",
        href: {
          tr: "/ameliyatli-estetik/vucut",
          en: "/en/surgical-aesthetics/body", // ✅ CLEAN
        },
      },
      {
        titleKey: "nav.tummyTuck",
        href: {
          tr: "/ameliyatli-estetik/karin-germe",
          en: "/en/surgical-aesthetics/tummy-tuck", // ✅ FIXED: Removed "body-" prefix
        },
      },
      {
        titleKey: "nav.liposuction",
        href: {
          tr: "/ameliyatli-estetik/liposuction",
          en: "/en/surgical-aesthetics/liposuction", // ✅ FIXED: Removed "body-" prefix
        },
      },
      {
        titleKey: "nav.breastAesthetics",
        href: {
          tr: "/ameliyatli-estetik/meme",
          en: "/en/surgical-aesthetics/breast", // ✅ CLEAN
        },
      },
      {
        titleKey: "nav.breastAugmentation",
        href: {
          tr: "/ameliyatli-estetik/meme-buyutme",
          en: "/en/surgical-aesthetics/augmentation", // ✅ FIXED: Removed "breast-" prefix
        },
      },
      {
        titleKey: "nav.breastReduction",
        href: {
          tr: "/ameliyatli-estetik/meme-kucultme",
          en: "/en/surgical-aesthetics/reduction", // ✅ FIXED: Removed "breast-" prefix
        },
      },
    ],
  },
  {
    titleKey: "nav.laserHairRemoval",
    href: {
      tr: "/lazer-epilasyon",
      en: "/en/laser-hair-removal",
    },
  },
  {
    titleKey: "nav.hairTransplant",
    href: {
      tr: "/sac-ekimi",
      en: "/en/hair-transplant",
    },
  },
  {
    titleKey: "nav.about",
    href: {
      tr: "/hakkimizda",
      en: "/en/about",
    },
  },
  {
    titleKey: "nav.customerReviews",
    href: {
      tr: "https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2",
      en: "https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2",
    },
  },
  {
    titleKey: "nav.contact",
    href: {
      tr: "/iletisim",
      en: "/en/contact",
    },
  },
];
