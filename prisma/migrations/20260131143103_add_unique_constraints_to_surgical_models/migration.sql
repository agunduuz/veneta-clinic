/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,order]` on the table `surgical_features` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "surgical_features_categoryId_order_key" ON "surgical_features"("categoryId", "order");
