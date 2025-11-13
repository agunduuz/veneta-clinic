/*
  Warnings:

  - You are about to drop the column `detailLink` on the `blog_posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locale,slug]` on the table `blog_posts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "blog_posts_slug_key";

-- AlterTable
ALTER TABLE "blog_posts" DROP COLUMN "detailLink",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'tr',
ADD COLUMN     "readTime" TEXT;

-- CreateIndex
CREATE INDEX "blog_posts_locale_idx" ON "blog_posts"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_locale_slug_key" ON "blog_posts"("locale", "slug");
