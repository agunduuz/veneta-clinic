-- CreateTable
CREATE TABLE "header_nav_items" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "parentId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "header_nav_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "header_nav_items_locale_active_order_idx" ON "header_nav_items"("locale", "active", "order");

-- CreateIndex
CREATE INDEX "header_nav_items_parentId_idx" ON "header_nav_items"("parentId");

-- AddForeignKey
ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "header_nav_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
