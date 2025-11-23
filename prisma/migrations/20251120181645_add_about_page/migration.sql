-- CreateTable
CREATE TABLE "about_page" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "headerTitle" TEXT NOT NULL,
    "headerTitleHighlight" TEXT NOT NULL,
    "headerSubtitle" TEXT NOT NULL,
    "headerDescription" TEXT NOT NULL,
    "headerButtonServices" TEXT NOT NULL,
    "headerButtonContact" TEXT NOT NULL,
    "headerImage" TEXT NOT NULL,
    "headerExperienceYears" TEXT NOT NULL,
    "headerExperienceText" TEXT NOT NULL,
    "featuresTitle" TEXT NOT NULL,
    "featuresTitleHighlight" TEXT NOT NULL,
    "featuresSubtitle" TEXT NOT NULL,
    "missionDoctorImage" TEXT NOT NULL,
    "missionQuote" TEXT NOT NULL,
    "missionTitle" TEXT NOT NULL,
    "missionSubtitle" TEXT NOT NULL,
    "missionDescription1" TEXT NOT NULL,
    "missionDescription2" TEXT NOT NULL,
    "stat1Value" TEXT NOT NULL,
    "stat1Label" TEXT NOT NULL,
    "stat2Value" TEXT NOT NULL,
    "stat2Label" TEXT NOT NULL,
    "stat3Value" TEXT NOT NULL,
    "stat3Label" TEXT NOT NULL,
    "stat4Value" TEXT NOT NULL,
    "stat4Label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_features" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "about_page_locale_key" ON "about_page"("locale");

-- CreateIndex
CREATE INDEX "about_features_locale_active_order_idx" ON "about_features"("locale", "active", "order");
