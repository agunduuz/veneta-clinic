-- CreateTable
CREATE TABLE "contact_page" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "headerTitle" TEXT NOT NULL,
    "headerDescription" TEXT NOT NULL,
    "headerButtonText" TEXT NOT NULL,
    "headerImage" TEXT NOT NULL,
    "formTitle" TEXT NOT NULL,
    "formDescription" TEXT NOT NULL,
    "happyCustomersText" TEXT NOT NULL,
    "reviewsRating" TEXT NOT NULL,
    "reviewsText" TEXT NOT NULL,
    "reviewsLink" TEXT NOT NULL,
    "addressLabel" TEXT NOT NULL,
    "addressText" TEXT NOT NULL,
    "addressLink" TEXT NOT NULL,
    "phoneLabel" TEXT NOT NULL,
    "phoneText" TEXT NOT NULL,
    "phoneLink" TEXT NOT NULL,
    "hoursLabel" TEXT NOT NULL,
    "hoursText" TEXT NOT NULL,
    "formTitleBox" TEXT NOT NULL,
    "formSubtitle" TEXT NOT NULL,
    "firstNamePlaceholder" TEXT NOT NULL,
    "lastNamePlaceholder" TEXT NOT NULL,
    "emailPlaceholder" TEXT NOT NULL,
    "phonePlaceholder" TEXT NOT NULL,
    "messagePlaceholder" TEXT NOT NULL,
    "submitButtonText" TEXT NOT NULL,
    "submittingButtonText" TEXT NOT NULL,
    "successMessage" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "emailRecipient" TEXT NOT NULL,
    "emailSubject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_page_locale_key" ON "contact_page"("locale");

-- CreateIndex
CREATE INDEX "contact_submissions_status_createdAt_idx" ON "contact_submissions"("status", "createdAt");
