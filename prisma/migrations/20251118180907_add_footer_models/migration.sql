-- CreateTable
CREATE TABLE "footer_content" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneSecondary" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mapLink" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "twitterUrl" TEXT,
    "linkedinUrl" TEXT,
    "youtubeUrl" TEXT,
    "copyrightText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_link_groups" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_link_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_links" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "footer_content_locale_key" ON "footer_content"("locale");

-- CreateIndex
CREATE INDEX "footer_link_groups_locale_active_order_idx" ON "footer_link_groups"("locale", "active", "order");

-- CreateIndex
CREATE UNIQUE INDEX "footer_link_groups_locale_slug_key" ON "footer_link_groups"("locale", "slug");

-- CreateIndex
CREATE INDEX "footer_links_groupId_active_order_idx" ON "footer_links"("groupId", "active", "order");

-- AddForeignKey
ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "footer_link_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
