-- AlterTable
ALTER TABLE "procedure_pages" ADD COLUMN     "advantages" JSONB,
ADD COLUMN     "categorySlugEN" TEXT,
ADD COLUMN     "categorySlugTR" TEXT,
ADD COLUMN     "customFaqs" JSONB,
ADD COLUMN     "gallery" JSONB,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "parentSlug" TEXT,
ADD COLUMN     "processSteps" JSONB,
ADD COLUMN     "seoContent" TEXT;

-- CreateIndex
CREATE INDEX "procedure_pages_categorySlugTR_categorySlugEN_idx" ON "procedure_pages"("categorySlugTR", "categorySlugEN");

-- CreateIndex
CREATE INDEX "procedure_pages_parentSlug_locale_active_idx" ON "procedure_pages"("parentSlug", "locale", "active");
