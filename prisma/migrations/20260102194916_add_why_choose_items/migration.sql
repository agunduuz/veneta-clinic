-- CreateTable
CREATE TABLE "surgical_why_choose_items" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "surgical_why_choose_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "surgical_why_choose_items" ADD CONSTRAINT "surgical_why_choose_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SurgicalCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
