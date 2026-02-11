/*
  Warnings:

  - You are about to drop the column `content` on the `page_subcategories` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `page_subcategories` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `page_subcategories` table. All the data in the column will be lost.
  - Added the required column `heroTitle` to the `page_subcategories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "page_subcategories" DROP COLUMN "content",
DROP COLUMN "imageUrl",
DROP COLUMN "title",
ADD COLUMN     "heroDescription" TEXT,
ADD COLUMN     "heroHighlight" TEXT,
ADD COLUMN     "heroImage" TEXT,
ADD COLUMN     "heroImageAlt" TEXT,
ADD COLUMN     "heroTitle" TEXT NOT NULL,
ADD COLUMN     "sections" JSONB;
