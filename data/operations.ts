// data/operations.ts
export type OperationData = {
  title: string;
  description: string;
  advantages: string[];
  process: Array<{
    step: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  image: string;
  images: string[];
};

type OperationsMap = {
  [key: string]: OperationData;
};

// TR Operations Data
export const trOperations: OperationsMap = {
  yuz: {
    title: "Yüz Estetiği",
    description:
      "Yüz estetiği, yüz hatlarını gençleştirmek ve daha dengeli bir görünüm elde etmek için yapılan cerrahi işlemlerdir.",
    advantages: [
      "Gençleşmiş yüz görünümü",
      "Daha dengeli yüz hatları",
      "Artırılmış özgüven",
      "Doğal sonuçlar",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description:
          "Uzman doktorumuzla yüz analizi ve kişiselleştirilmiş tedavi planı hazırlama.",
      },
      {
        step: "Operasyon Günü",
        description:
          "Modern ameliyathane koşullarında güvenli yüz estetiği operasyonu.",
      },
      {
        step: "İyileşme Süreci",
        description:
          "Düzenli kontroller ve profesyonel takip ile hızlı iyileşme süreci.",
      },
    ],
    faqs: [
      {
        question: "Yüz estetiği ne kadar sürer?",
        answer: "Operasyon süresi 2-4 saat arasında değişmektedir.",
      },
      {
        question: "İyileşme süreci nasıl geçer?",
        answer:
          "İlk 1-2 hafta şişlik ve morluklar görülebilir, 3-4 hafta içinde normal yaşantıya dönülebilir.",
      },
      {
        question: "Sonuçlar kalıcı mı?",
        answer: "Evet, yüz estetiği sonuçları uzun yıllar kalıcıdır.",
      },
    ],
    image: "/images/goz-kapagi.jpeg",
    images: [],
  },
  "burun-estetigi": {
    title: "Burun Estetiği",
    description:
      "Burun estetiği, burnun şeklini düzeltmek ve fonksiyonel sorunları gidermek amacıyla yapılan cerrahi işlemdir.",
    advantages: [
      "Daha dengeli burun görünümü",
      "İyileştirilmiş nefes alma",
      "Yüz ile uyumlu burun",
      "Artırılmış özgüven",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description:
          "Burun analizi, 3D görüntüleme ve kişiselleştirilmiş tedavi planı.",
      },
      {
        step: "Operasyon Günü",
        description:
          "Açık veya kapalı teknikle güvenli burun estetiği operasyonu.",
      },
      {
        step: "İyileşme Süreci",
        description:
          "7. günde tampon çıkarılır, 2 hafta içinde normal yaşantıya dönülebilir.",
      },
    ],
    faqs: [
      {
        question: "Burun estetiği ne kadar sürer?",
        answer: "Operasyon süresi 1-2 saat arasında değişmektedir.",
      },
      {
        question: "Burnun tam şeklini alması ne kadar sürer?",
        answer: "Burnun tam şeklini alması 6-12 ay sürebilir.",
      },
      {
        question: "Açık mı kapalı mı teknik daha iyi?",
        answer:
          "Her iki teknik de etkilidir, hastanın durumuna göre doktor karar verir.",
      },
    ],
    image: "/images/burun-estetigi.jpg",
    images: [],
  },
  "yuz-germe": {
    title: "Yüz Germe",
    description:
      "Yüz germe, yaşlanma belirtilerini azaltmak ve daha genç bir görünüm elde etmek için yapılan cerrahi işlemdir.",
    advantages: [
      "Belirgin gençleşme etkisi",
      "Sarkık dokuların düzeltilmesi",
      "Daha sıkı yüz hatları",
      "Uzun süreli sonuçlar",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description:
          "Yüz analizi ve yaşlanma belirtilerinin değerlendirilmesi.",
      },
      {
        step: "Operasyon Günü",
        description: "Minimal kesi ile güvenli yüz germe operasyonu.",
      },
      {
        step: "İyileşme Süreci",
        description:
          "2-3 hafta içinde şişlikler azalır, 1 ay içinde normal yaşantıya dönülebilir.",
      },
    ],
    faqs: [
      {
        question: "Yüz germe ne kadar sürer?",
        answer: "Operasyon süresi 2-3 saat arasında değişmektedir.",
      },
      {
        question: "Sonuçlar ne kadar sürer?",
        answer: "Yüz germe sonuçları 5-10 yıl sürebilir.",
      },
      {
        question: "İz kalır mı?",
        answer: "Kesiler saç çizgisinde gizlenir, minimal iz kalır.",
      },
    ],
    image: "/images/yuz-germe.jpg",
    images: [],
  },
  "goz-kapagi-estetigi": {
    title: "Göz Kapak Estetiği",
    description:
      "Göz kapak estetiği, göz çevresini daha çekici hale getirmek için yapılan cerrahi işlemdir.",
    advantages: [
      "Daha çekici göz görünümü",
      "Göz çevresi gençleşmesi",
      "Daha büyük göz efekti",
      "Doğal sonuçlar",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description: "Göz çevresi analizi ve kişiselleştirilmiş tedavi planı.",
      },
      {
        step: "Operasyon Günü",
        description: "Hassas teknikle güvenli göz kapak estetiği.",
      },
      {
        step: "İyileşme Süreci",
        description:
          "1 hafta içinde dikişler alınır, 2-3 hafta içinde normal görünüm.",
      },
    ],
    faqs: [
      {
        question: "Göz kapak estetiği ne kadar sürer?",
        answer: "Operasyon süresi 1-1.5 saat arasında değişmektedir.",
      },
      {
        question: "İyileşme süreci nasıl geçer?",
        answer:
          "İlk günlerde şişlik ve morluklar görülebilir, 1 hafta içinde azalır.",
      },
      {
        question: "Sonuçlar kalıcı mı?",
        answer: "Evet, göz kapak estetiği sonuçları kalıcıdır.",
      },
    ],
    image: "/images/goz-kapagi-1.jpeg",
    images: [
      "/images/goz-kapagi-1.jpeg",
      "/images/goz-kapagi-2.jpeg",
      "/images/goz-kapagi-3.jpeg",
      "/images/goz-kapagi-4.jpeg",
      "/images/goz-kapagi-5.jpeg",
      "/images/goz-kapagi-6.jpeg",
    ],
  },
  vucut: {
    title: "Vücut Estetiği",
    description:
      "Vücut estetiği, vücut şeklini iyileştirmek ve daha dengeli bir görünüm elde etmek için yapılan cerrahi işlemlerdir.",
    advantages: [
      "İyileştirilmiş vücut şekli",
      "Daha dengeli oranlar",
      "Artırılmış özgüven",
      "Uzun süreli sonuçlar",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description:
          "Vücut analizi ve hedef belirleme ile kişiselleştirilmiş plan.",
      },
      {
        step: "Operasyon Günü",
        description: "Modern tekniklerle güvenli vücut estetiği operasyonu.",
      },
      {
        step: "İyileşme Süreci",
        description: "2-4 hafta içinde normal aktivitelere dönülebilir.",
      },
    ],
    faqs: [
      {
        question: "Vücut estetiği ne kadar sürer?",
        answer: "Operasyon süresi 2-4 saat arasında değişmektedir.",
      },
      {
        question: "Spor yapabilir miyim?",
        answer: "2-3 ay sonra hafif sporlara başlanabilir.",
      },
      {
        question: "Sonuçlar ne kadar sürer?",
        answer: "Sağlıklı yaşam tarzı ile sonuçlar kalıcıdır.",
      },
    ],
    image: "/images/vucut-estetigi.jpg",
    images: [],
  },
  "karin-germe": {
    title: "Karın Germe",
    description:
      "Karın germe, karın bölgesindeki fazla deri ve yağ dokusunu alarak daha sıkı bir görünüm elde etmek için yapılan işlemdir.",
    advantages: [
      "Sıkılaşmış karın bölgesi",
      "Düzleşmiş karın",
      "İyileştirilmiş duruş",
      "Artırılmış özgüven",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description:
          "Karın bölgesi analizi ve kişiselleştirilmiş tedavi planı.",
      },
      {
        step: "Operasyon Günü",
        description:
          "Güvenli karın germe operasyonu ile fazla deri ve yağ alınması.",
      },
      {
        step: "İyileşme Süreci",
        description: "3-4 hafta içinde normal aktivitelere dönülebilir.",
      },
    ],
    faqs: [
      {
        question: "Karın germe ne kadar sürer?",
        answer: "Operasyon süresi 2-3 saat arasında değişmektedir.",
      },
      {
        question: "İz kalır mı?",
        answer: "Kesi kasık çizgisinde gizlenir, zamanla belirginliği azalır.",
      },
      {
        question: "Hamilelik sonrası yapılabilir mi?",
        answer: "Evet, doğumdan 6 ay sonra yapılabilir.",
      },
    ],
    image: "/images/karin-germe.jpg",
    images: [],
  },
  liposuction: {
    title: "Liposuction",
    description:
      "Liposuction, vücudun belirli bölgelerindeki fazla yağ dokusunu alarak daha dengeli bir vücut şekli elde etmek için yapılan işlemdir.",
    advantages: [
      "Hedefli yağ alma",
      "Daha dengeli vücut şekli",
      "Hızlı sonuç",
      "Minimal iz",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description: "Vücut analizi ve hedef bölgelerin belirlenmesi.",
      },
      {
        step: "Operasyon Günü",
        description: "Modern liposuction teknikleri ile güvenli yağ alma.",
      },
      {
        step: "İyileşme Süreci",
        description: "1-2 hafta içinde normal aktivitelere dönülebilir.",
      },
    ],
    faqs: [
      {
        question: "Liposuction ne kadar sürer?",
        answer: "Operasyon süresi 1-3 saat arasında değişmektedir.",
      },
      {
        question: "Yağ geri gelir mi?",
        answer: "Sağlıklı yaşam tarzı ile yağ geri gelmez.",
      },
      {
        question: "Hangi bölgelere uygulanabilir?",
        answer: "Karın, bel, kalça, bacak, kol gibi bölgelere uygulanabilir.",
      },
    ],
    image: "/images/liposuction.jpeg",
    images: [],
  },
  meme: {
    title: "Meme Estetiği",
    description:
      "Meme estetiği, memelerin şeklini, boyutunu ve simetrisini iyileştirmek için yapılan cerrahi işlemlerdir.",
    advantages: [
      "İyileştirilmiş meme şekli",
      "Daha dengeli oranlar",
      "Artırılmış özgüven",
      "Doğal görünüm",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description: "Meme analizi ve kişiselleştirilmiş tedavi planı.",
      },
      {
        step: "Operasyon Günü",
        description: "Güvenli meme estetiği operasyonu.",
      },
      {
        step: "İyileşme Süreci",
        description: "2-3 hafta içinde normal aktivitelere dönülebilir.",
      },
    ],
    faqs: [
      {
        question: "Meme estetiği ne kadar sürer?",
        answer: "Operasyon süresi 2-3 saat arasında değişmektedir.",
      },
      {
        question: "Emzirebilir miyim?",
        answer: "Çoğu durumda emzirme fonksiyonu korunur.",
      },
      {
        question: "Sonuçlar kalıcı mı?",
        answer: "Evet, meme estetiği sonuçları kalıcıdır.",
      },
    ],
    image: "/images/meme-estetigi.jpg",
    images: [],
  },
  "meme-buyutme": {
    title: "Meme Büyütme Ameliyatı",
    description:
      "Meme büyütme, memelerin boyutunu artırmak ve daha dolgun bir görünüm elde etmek için yapılan cerrahi işlemdir.",
    advantages: [
      "Artırılmış meme boyutu",
      "Daha dolgun görünüm",
      "İyileştirilmiş oranlar",
      "Artırılmış özgüven",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description: "Meme analizi, implant seçimi ve kişiselleştirilmiş plan.",
      },
      {
        step: "Operasyon Günü",
        description: "Güvenli meme büyütme operasyonu ile implant yerleştirme.",
      },
      {
        step: "İyileşme Süreci",
        description: "2-3 hafta içinde normal aktivitelere dönülebilir.",
      },
    ],
    faqs: [
      {
        question: "Meme büyütme ne kadar sürer?",
        answer: "Operasyon süresi 1-2 saat arasında değişmektedir.",
      },
      {
        question: "Hangi implant türü daha iyi?",
        answer:
          "Her implant türünün avantajları vardır, doktor önerisi önemlidir.",
      },
      {
        question: "Sonuçlar doğal mı?",
        answer: "Evet, modern tekniklerle doğal sonuçlar elde edilir.",
      },
    ],
    image: "/images/meme-buyutme.jpg",
    images: [],
  },
  "meme-kucultme": {
    title: "Meme Küçültme Ameliyatı",
    description:
      "Meme küçültme, büyük memeleri küçültmek ve daha dengeli bir görünüm elde etmek için yapılan cerrahi işlemdir.",
    advantages: [
      "Küçültülmüş meme boyutu",
      "Daha dengeli oranlar",
      "Azaltılmış sırt ağrısı",
      "İyileştirilmiş yaşam kalitesi",
    ],
    process: [
      {
        step: "İlk Konsültasyon",
        description: "Meme analizi ve hedef boyut belirleme.",
      },
      {
        step: "Operasyon Günü",
        description: "Güvenli meme küçültme operasyonu.",
      },
      {
        step: "İyileşme Süreci",
        description: "3-4 hafta içinde normal aktivitelere dönülebilir.",
      },
    ],
    faqs: [
      {
        question: "Meme küçültme ne kadar sürer?",
        answer: "Operasyon süresi 2-3 saat arasında değişmektedir.",
      },
      {
        question: "Emzirebilir miyim?",
        answer: "Çoğu durumda emzirme fonksiyonu korunur.",
      },
      {
        question: "İz kalır mı?",
        answer: "İzler zamanla belirginliğini kaybeder.",
      },
    ],
    image: "/images/meme-kucultme.jpg",
    images: [],
  },
};

// EN Operations Data
export const enOperations: OperationsMap = {
  facial: {
    title: "Facial Aesthetics",
    description:
      "Facial aesthetics are surgical procedures performed to rejuvenate facial features and achieve a more balanced appearance.",
    advantages: [
      "Rejuvenated facial appearance",
      "More balanced facial features",
      "Increased self-confidence",
      "Natural results",
    ],
    process: [
      {
        step: "Initial Consultation",
        description:
          "Facial analysis and personalized treatment plan with our expert doctor.",
      },
      {
        step: "Surgery Day",
        description:
          "Safe facial aesthetics surgery under modern operating room conditions.",
      },
      {
        step: "Recovery Process",
        description:
          "Rapid recovery process with regular check-ups and professional follow-up.",
      },
    ],
    faqs: [
      {
        question: "How long does facial aesthetics surgery take?",
        answer: "Surgery duration varies between 2-4 hours.",
      },
      {
        question: "How does the recovery process go?",
        answer:
          "Swelling and bruising may occur in the first 1-2 weeks, normal life can resume within 3-4 weeks.",
      },
      {
        question: "Are the results permanent?",
        answer:
          "Yes, facial aesthetics results are long-lasting for many years.",
      },
    ],
    image: "/images/goz-kapagi.jpeg",
    images: [],
  },
  rhinoplasty: {
    title: "Rhinoplasty",
    description:
      "Rhinoplasty is a surgical procedure performed to correct the shape of the nose and resolve functional problems.",
    advantages: [
      "More balanced nose appearance",
      "Improved breathing",
      "Nose in harmony with face",
      "Increased self-confidence",
    ],
    process: [
      {
        step: "Initial Consultation",
        description:
          "Nose analysis, 3D imaging and personalized treatment plan.",
      },
      {
        step: "Surgery Day",
        description: "Safe rhinoplasty surgery with open or closed technique.",
      },
      {
        step: "Recovery Process",
        description:
          "Packing is removed on day 7, normal life can resume within 2 weeks.",
      },
    ],
    faqs: [
      {
        question: "How long does rhinoplasty take?",
        answer: "Surgery duration varies between 1-2 hours.",
      },
      {
        question: "How long does it take for the nose to take its final shape?",
        answer: "The nose may take 6-12 months to take its final shape.",
      },
      {
        question: "Which technique is better, open or closed?",
        answer:
          "Both techniques are effective, the doctor decides based on the patient's condition.",
      },
    ],
    image: "/images/burun-estetigi.jpg",
    images: [],
  },
  "face-lift": {
    title: "Face Lift",
    description:
      "Face lift is a surgical procedure performed to reduce signs of aging and achieve a more youthful appearance.",
    advantages: [
      "Significant rejuvenation effect",
      "Correction of sagging tissues",
      "Tighter facial features",
      "Long-lasting results",
    ],
    process: [
      {
        step: "Initial Consultation",
        description: "Facial analysis and evaluation of aging signs.",
      },
      {
        step: "Surgery Day",
        description: "Safe face lift surgery with minimal incision.",
      },
      {
        step: "Recovery Process",
        description:
          "Swelling decreases within 2-3 weeks, normal life can resume within 1 month.",
      },
    ],
    faqs: [
      {
        question: "How long does face lift surgery take?",
        answer: "Surgery duration varies between 2-3 hours.",
      },
      {
        question: "How long do the results last?",
        answer: "Face lift results can last 5-10 years.",
      },
      {
        question: "Will there be scars?",
        answer:
          "Incisions are hidden in the hairline, minimal scarring occurs.",
      },
    ],
    image: "/images/yuz-germe.jpg",
    images: [],
  },
  "eye-bag-surgery": {
    title: "Eye Bag Surgery",
    description:
      "Eye bag surgery is a surgical procedure performed to make the eye area more attractive.",
    advantages: [
      "More attractive eye appearance",
      "Eye area rejuvenation",
      "Larger eye effect",
      "Natural results",
    ],
    process: [
      {
        step: "Initial Consultation",
        description: "Eye area analysis and personalized treatment plan.",
      },
      {
        step: "Surgery Day",
        description: "Safe eye bag surgery with delicate technique.",
      },
      {
        step: "Recovery Process",
        description:
          "Stitches are removed within 1 week, normal appearance within 2-3 weeks.",
      },
    ],
    faqs: [
      {
        question: "How long does eye bag surgery take?",
        answer: "Surgery duration varies between 1-1.5 hours.",
      },
      {
        question: "How does the recovery process go?",
        answer:
          "Swelling and bruising may occur in the first days, decreases within 1 week.",
      },
      {
        question: "Are the results permanent?",
        answer: "Yes, eye bag surgery results are permanent.",
      },
    ],
    image: "/images/goz-kapagi-1.jpeg",
    images: [
      "/images/goz-kapagi-1.jpeg",
      "/images/goz-kapagi-2.jpeg",
      "/images/goz-kapagi-3.jpeg",
      "/images/goz-kapagi-4.jpeg",
      "/images/goz-kapagi-5.jpeg",
      "/images/goz-kapagi-6.jpeg",
    ],
  },
  body: {
    title: "Body Aesthetics",
    description:
      "Body aesthetics are surgical procedures performed to improve body shape and achieve a more balanced appearance.",
    advantages: [
      "Improved body shape",
      "More balanced proportions",
      "Increased self-confidence",
      "Long-lasting results",
    ],
    process: [
      {
        step: "Initial Consultation",
        description: "Body analysis and goal setting with personalized plan.",
      },
      {
        step: "Surgery Day",
        description: "Safe body aesthetics surgery with modern techniques.",
      },
      {
        step: "Recovery Process",
        description: "Normal activities can resume within 2-4 weeks.",
      },
    ],
    faqs: [
      {
        question: "How long does body aesthetics surgery take?",
        answer: "Surgery duration varies between 2-4 hours.",
      },
      {
        question: "Can I exercise?",
        answer: "Light sports can be started 2-3 months later.",
      },
      {
        question: "How long do the results last?",
        answer: "Results are permanent with a healthy lifestyle.",
      },
    ],
    image: "/images/vucut-estetigi.jpg",
    images: [],
  },
  "tummy-tuck": {
    title: "Tummy Tuck",
    description:
      "Tummy tuck is a procedure performed to remove excess skin and fat tissue from the abdominal area to achieve a tighter appearance.",
    advantages: [
      "Tightened abdominal area",
      "Flattened abdomen",
      "Improved posture",
      "Increased self-confidence",
    ],
    process: [
      {
        step: "Initial Consultation",
        description: "Abdominal area analysis and personalized treatment plan.",
      },
      {
        step: "Surgery Day",
        description:
          "Safe tummy tuck surgery with removal of excess skin and fat.",
      },
      {
        step: "Recovery Process",
        description: "Normal activities can resume within 3-4 weeks.",
      },
    ],
    faqs: [
      {
        question: "How long does tummy tuck surgery take?",
        answer: "Surgery duration varies between 2-3 hours.",
      },
      {
        question: "Will there be scars?",
        answer:
          "Incision is hidden in the groin line, visibility decreases over time.",
      },
      {
        question: "Can it be done after pregnancy?",
        answer: "Yes, it can be done 6 months after childbirth.",
      },
    ],
    image: "/images/karin-germe.jpg",
    images: [],
  },
  liposuction: {
    title: "Liposuction",
    description:
      "Liposuction is a procedure performed to remove excess fat tissue from specific areas of the body to achieve a more balanced body shape.",
    advantages: [
      "Targeted fat removal",
      "More balanced body shape",
      "Quick results",
      "Minimal scarring",
    ],
    process: [
      {
        step: "Initial Consultation",
        description: "Body analysis and determination of target areas.",
      },
      {
        step: "Surgery Day",
        description: "Safe fat removal with modern liposuction techniques.",
      },
      {
        step: "Recovery Process",
        description: "Normal activities can resume within 1-2 weeks.",
      },
    ],
    faqs: [
      {
        question: "How long does liposuction take?",
        answer: "Surgery duration varies between 1-3 hours.",
      },
      {
        question: "Will the fat come back?",
        answer: "Fat does not return with a healthy lifestyle.",
      },
      {
        question: "Which areas can it be applied to?",
        answer:
          "Can be applied to areas such as abdomen, waist, hips, legs, arms.",
      },
    ],
    image: "/images/liposuction.jpeg",
    images: [],
  },
  breast: {
    title: "Breast Aesthetics",
    description:
      "Breast aesthetics are surgical procedures performed to improve the shape, size and symmetry of breasts.",
    advantages: [
      "Improved breast shape",
      "More balanced proportions",
      "Increased self-confidence",
      "Natural appearance",
    ],
    process: [
      {
        step: "Initial Consultation",
        description: "Breast analysis and personalized treatment plan.",
      },
      {
        step: "Surgery Day",
        description: "Safe breast aesthetics surgery.",
      },
      {
        step: "Recovery Process",
        description: "Normal activities can resume within 2-3 weeks.",
      },
    ],
    faqs: [
      {
        question: "How long does breast aesthetics surgery take?",
        answer: "Surgery duration varies between 2-3 hours.",
      },
      {
        question: "Can I breastfeed?",
        answer: "Breastfeeding function is preserved in most cases.",
      },
      {
        question: "Are the results permanent?",
        answer: "Yes, breast aesthetics results are permanent.",
      },
    ],
    image: "/images/meme-estetigi.jpg",
    images: [],
  },
  augmentation: {
    title: "Breast Augmentation",
    description:
      "Breast augmentation is a surgical procedure performed to increase breast size and achieve a fuller appearance.",
    advantages: [
      "Increased breast size",
      "Fuller appearance",
      "Improved proportions",
      "Increased self-confidence",
    ],
    process: [
      {
        step: "Initial Consultation",
        description:
          "Breast analysis, implant selection and personalized plan.",
      },
      {
        step: "Surgery Day",
        description: "Safe breast augmentation surgery with implant placement.",
      },
      {
        step: "Recovery Process",
        description: "Normal activities can resume within 2-3 weeks.",
      },
    ],
    faqs: [
      {
        question: "How long does breast augmentation take?",
        answer: "Surgery duration varies between 1-2 hours.",
      },
      {
        question: "Which implant type is better?",
        answer:
          "Each implant type has advantages, doctor recommendation is important.",
      },
      {
        question: "Are the results natural?",
        answer: "Yes, natural results are achieved with modern techniques.",
      },
    ],
    image: "/images/meme-buyutme.jpg",
    images: [],
  },
  reduction: {
    title: "Breast Reduction",
    description:
      "Breast reduction is a surgical procedure performed to reduce large breasts and achieve a more balanced appearance.",
    advantages: [
      "Reduced breast size",
      "More balanced proportions",
      "Reduced back pain",
      "Improved quality of life",
    ],
    process: [
      {
        step: "Initial Consultation",
        description: "Breast analysis and target size determination.",
      },
      {
        step: "Surgery Day",
        description: "Safe breast reduction surgery.",
      },
      {
        step: "Recovery Process",
        description: "Normal activities can resume within 3-4 weeks.",
      },
    ],
    faqs: [
      {
        question: "How long does breast reduction take?",
        answer: "Surgery duration varies between 2-3 hours.",
      },
      {
        question: "Can I breastfeed?",
        answer: "Breastfeeding function is preserved in most cases.",
      },
      {
        question: "Will there be scars?",
        answer: "Scars lose their prominence over time.",
      },
    ],
    image: "/images/meme-kucultme.jpg",
    images: [],
  },
};
