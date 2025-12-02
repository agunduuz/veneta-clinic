-- AlterTable
ALTER TABLE "procedure_pages" ADD COLUMN     "categoriesIntroDescription" TEXT,
ADD COLUMN     "categoriesIntroTitle" TEXT;

-- CreateTable
CREATE TABLE "procedure_about_sections" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "areasTitle" TEXT NOT NULL,
    "advantagesTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_about_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_about_areas" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_about_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_about_advantages" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_about_advantages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_processes" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL DEFAULT 'bg-primary/20',
    "textColor" TEXT NOT NULL DEFAULT 'text-primary',
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_processes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "procedure_about_sections_pageSlug_locale_idx" ON "procedure_about_sections"("pageSlug", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_about_sections_pageSlug_locale_key" ON "procedure_about_sections"("pageSlug", "locale");

-- CreateIndex
CREATE INDEX "procedure_about_areas_pageSlug_locale_active_order_idx" ON "procedure_about_areas"("pageSlug", "locale", "active", "order");

-- CreateIndex
CREATE INDEX "procedure_about_advantages_pageSlug_locale_active_order_idx" ON "procedure_about_advantages"("pageSlug", "locale", "active", "order");

-- CreateIndex
CREATE INDEX "procedure_processes_pageSlug_locale_active_order_idx" ON "procedure_processes"("pageSlug", "locale", "active", "order");
