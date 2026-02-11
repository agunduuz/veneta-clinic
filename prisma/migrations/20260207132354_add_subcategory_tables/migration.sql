-- CreateTable
CREATE TABLE "page_subcategories" (
    "id" TEXT NOT NULL,
    "parentSlug" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,

    CONSTRAINT "page_subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_subcategories" (
    "id" TEXT NOT NULL,
    "parentSlug" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroTitleHighlight" TEXT,
    "heroDescription" TEXT,
    "heroButtonReviews" TEXT,
    "heroButtonPhone" TEXT,
    "heroImage" TEXT,
    "heroImageAlt" TEXT,
    "deviceTitle" TEXT,
    "deviceDescription" TEXT,
    "deviceFeaturesTitle" TEXT,
    "deviceAdvantagesTitle" TEXT,
    "pricingTitle" TEXT,
    "pricingDescription" TEXT,
    "pricingCallText" TEXT,
    "whyUsTitle" TEXT,
    "faqTitle" TEXT,
    "ctaTitle" TEXT,
    "ctaDescription" TEXT,
    "ctaButtonPhone" TEXT,
    "ctaButtonWhatsApp" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,

    CONSTRAINT "procedure_subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_subcategory_features" (
    "id" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_subcategory_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_subcategory_device_items" (
    "id" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_subcategory_device_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_subcategory_treatment_areas" (
    "id" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_subcategory_treatment_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_subcategory_pricing" (
    "id" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priceText" TEXT NOT NULL,
    "colorScheme" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_subcategory_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_subcategory_why_us" (
    "id" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "colorScheme" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_subcategory_why_us_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_subcategory_faqs" (
    "id" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_subcategory_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_subcategories_parentSlug_slug_locale_key" ON "page_subcategories"("parentSlug", "slug", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_subcategories_parentSlug_slug_locale_key" ON "procedure_subcategories"("parentSlug", "slug", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_subcategory_features_subcategoryId_order_key" ON "procedure_subcategory_features"("subcategoryId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_subcategory_device_items_subcategoryId_type_order_key" ON "procedure_subcategory_device_items"("subcategoryId", "type", "order");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_subcategory_treatment_areas_subcategoryId_order_key" ON "procedure_subcategory_treatment_areas"("subcategoryId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_subcategory_pricing_subcategoryId_order_key" ON "procedure_subcategory_pricing"("subcategoryId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_subcategory_why_us_subcategoryId_order_key" ON "procedure_subcategory_why_us"("subcategoryId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_subcategory_faqs_subcategoryId_order_key" ON "procedure_subcategory_faqs"("subcategoryId", "order");

-- AddForeignKey
ALTER TABLE "procedure_subcategory_features" ADD CONSTRAINT "procedure_subcategory_features_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "procedure_subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedure_subcategory_device_items" ADD CONSTRAINT "procedure_subcategory_device_items_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "procedure_subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedure_subcategory_treatment_areas" ADD CONSTRAINT "procedure_subcategory_treatment_areas_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "procedure_subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedure_subcategory_pricing" ADD CONSTRAINT "procedure_subcategory_pricing_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "procedure_subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedure_subcategory_why_us" ADD CONSTRAINT "procedure_subcategory_why_us_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "procedure_subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedure_subcategory_faqs" ADD CONSTRAINT "procedure_subcategory_faqs_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "procedure_subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
