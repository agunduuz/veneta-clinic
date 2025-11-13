/*
  Warnings:

  - You are about to drop the column `location` on the `testimonials` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `testimonials` table. All the data in the column will be lost.
  - Added the required column `procedure` to the `testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "testimonials_published_idx";

-- AlterTable
ALTER TABLE "testimonials" DROP COLUMN "location",
DROP COLUMN "published",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'tr',
ADD COLUMN     "procedure" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "testimonials_locale_idx" ON "testimonials"("locale");

-- CreateIndex
CREATE INDEX "testimonials_active_idx" ON "testimonials"("active");
