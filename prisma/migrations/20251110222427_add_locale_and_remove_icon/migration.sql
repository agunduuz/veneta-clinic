/*
  Warnings:

  - You are about to drop the column `icon` on the `features` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locale]` on the table `about_section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locale]` on the table `cta_section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locale]` on the table `hero_section` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "about_section" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'tr';

-- AlterTable
ALTER TABLE "cta_section" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'tr';

-- AlterTable
ALTER TABLE "features" DROP COLUMN "icon",
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'tr';

-- AlterTable
ALTER TABLE "hero_section" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'tr';

-- CreateIndex
CREATE UNIQUE INDEX "about_section_locale_key" ON "about_section"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "cta_section_locale_key" ON "cta_section"("locale");

-- CreateIndex
CREATE INDEX "features_locale_idx" ON "features"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "hero_section_locale_key" ON "hero_section"("locale");
