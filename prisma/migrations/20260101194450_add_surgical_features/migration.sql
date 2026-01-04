-- CreateTable
CREATE TABLE "surgical_features" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "surgical_features_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "surgical_features" ADD CONSTRAINT "surgical_features_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SurgicalCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
