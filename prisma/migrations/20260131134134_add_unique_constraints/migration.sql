/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,order]` on the table `SurgicalAdvantage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId,order]` on the table `SurgicalFAQ` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId,order]` on the table `SurgicalProcessStep` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId,order]` on the table `surgical_why_choose_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SurgicalAdvantage_categoryId_order_key" ON "SurgicalAdvantage"("categoryId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "SurgicalFAQ_categoryId_order_key" ON "SurgicalFAQ"("categoryId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "SurgicalProcessStep_categoryId_order_key" ON "SurgicalProcessStep"("categoryId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "surgical_why_choose_items_categoryId_order_key" ON "surgical_why_choose_items"("categoryId", "order");
