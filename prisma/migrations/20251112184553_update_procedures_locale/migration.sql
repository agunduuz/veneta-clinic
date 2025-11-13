/*
  Warnings:

  - A unique constraint covering the columns `[locale,slug]` on the table `procedures` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "procedures_published_idx";

-- DropIndex
DROP INDEX "procedures_slug_key";

-- AlterTable
ALTER TABLE "procedures" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'tr',
ALTER COLUMN "detailLink" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "procedures_locale_published_idx" ON "procedures"("locale", "published");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_locale_slug_key" ON "procedures"("locale", "slug");
