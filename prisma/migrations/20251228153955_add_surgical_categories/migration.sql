-- CreateTable
CREATE TABLE "SurgicalCategory" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "heroImage" TEXT,
    "patientsCount" TEXT NOT NULL DEFAULT '15,000+',
    "experienceYears" TEXT NOT NULL DEFAULT '15+',
    "rating" TEXT NOT NULL DEFAULT '4.9/5',
    "galleryImages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurgicalCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurgicalAdvantage" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SurgicalAdvantage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurgicalProcessStep" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SurgicalProcessStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurgicalFAQ" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SurgicalFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SurgicalCategory_locale_published_active_idx" ON "SurgicalCategory"("locale", "published", "active");

-- CreateIndex
CREATE UNIQUE INDEX "SurgicalCategory_slug_locale_key" ON "SurgicalCategory"("slug", "locale");

-- CreateIndex
CREATE INDEX "SurgicalAdvantage_categoryId_order_idx" ON "SurgicalAdvantage"("categoryId", "order");

-- CreateIndex
CREATE INDEX "SurgicalProcessStep_categoryId_order_idx" ON "SurgicalProcessStep"("categoryId", "order");

-- CreateIndex
CREATE INDEX "SurgicalFAQ_categoryId_order_idx" ON "SurgicalFAQ"("categoryId", "order");

-- AddForeignKey
ALTER TABLE "SurgicalAdvantage" ADD CONSTRAINT "SurgicalAdvantage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SurgicalCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurgicalProcessStep" ADD CONSTRAINT "SurgicalProcessStep_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SurgicalCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurgicalFAQ" ADD CONSTRAINT "SurgicalFAQ_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SurgicalCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
