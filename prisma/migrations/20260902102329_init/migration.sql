-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "logoText" TEXT NOT NULL,
    "logoBg" TEXT NOT NULL DEFAULT '#000000',
    "logoTextColor" TEXT NOT NULL DEFAULT '#ffffff',
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "tag" TEXT,
    "price" INTEGER NOT NULL,
    "da" INTEGER NOT NULL,
    "dr" INTEGER NOT NULL,
    "tat" TEXT NOT NULL,
    "region" TEXT[],
    "genres" TEXT[],
    "sponsored" BOOLEAN NOT NULL DEFAULT false,
    "indexed" BOOLEAN NOT NULL DEFAULT true,
    "doFollow" BOOLEAN NOT NULL DEFAULT false,
    "exampleUrl" TEXT,
    "llmAeo" BOOLEAN NOT NULL DEFAULT false,
    "nicheAge18" BOOLEAN NOT NULL DEFAULT false,
    "nicheHeart" BOOLEAN NOT NULL DEFAULT false,
    "nicheCannabis" BOOLEAN NOT NULL DEFAULT false,
    "nicheCopyright" BOOLEAN NOT NULL DEFAULT false,
    "nicheCasino" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BroadcastTelevision" (
    "id" TEXT NOT NULL,
    "affiliate" TEXT NOT NULL,
    "exampleUrl" TEXT,
    "calls" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "dma" TEXT NOT NULL,
    "segmentType" TEXT NOT NULL,
    "recordingType" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BroadcastTelevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DigitalTelevision" (
    "id" TEXT NOT NULL,
    "callSign" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "tat" TEXT NOT NULL,
    "sponsored" BOOLEAN NOT NULL DEFAULT true,
    "indexed" BOOLEAN NOT NULL DEFAULT true,
    "segmentLength" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "interviewType" TEXT NOT NULL,
    "exampleUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DigitalTelevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "tag" TEXT,
    "logoText" TEXT NOT NULL,
    "logoBg" TEXT NOT NULL DEFAULT '#000000',
    "logoTextColor" TEXT NOT NULL DEFAULT '#ffffff',
    "genres" TEXT[],
    "top5Price" TEXT NOT NULL,
    "top10Price" TEXT NOT NULL,
    "da" INTEGER NOT NULL,
    "dr" INTEGER NOT NULL,
    "tat" TEXT NOT NULL,
    "region" TEXT[],
    "sponsored" BOOLEAN NOT NULL DEFAULT false,
    "indexed" BOOLEAN NOT NULL DEFAULT true,
    "doFollow" BOOLEAN NOT NULL DEFAULT false,
    "exampleUrl" TEXT,
    "llmAeo" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BestSeller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "logoText" TEXT NOT NULL,
    "logoBg" TEXT NOT NULL DEFAULT '#000000',
    "logoTextColor" TEXT NOT NULL DEFAULT '#ffffff',
    "genres" TEXT[],
    "price" TEXT NOT NULL,
    "da" INTEGER NOT NULL,
    "dr" INTEGER NOT NULL,
    "tat" TEXT NOT NULL,
    "region" TEXT[],
    "sponsored" TEXT NOT NULL DEFAULT 'Discrete',
    "indexed" BOOLEAN NOT NULL DEFAULT true,
    "doFollow" BOOLEAN NOT NULL DEFAULT false,
    "exampleUrl" TEXT,
    "llmAeo" BOOLEAN NOT NULL DEFAULT false,
    "nicheAge18" BOOLEAN NOT NULL DEFAULT false,
    "nicheHeart" BOOLEAN NOT NULL DEFAULT false,
    "nicheCannabis" BOOLEAN NOT NULL DEFAULT false,
    "nicheCopyright" BOOLEAN NOT NULL DEFAULT false,
    "nicheCasino" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BestSeller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrintMagazine" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "fullPagePrice" TEXT,
    "spreadPrice" TEXT,
    "turnaround" TEXT NOT NULL,
    "circulation" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrintMagazine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialPost" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "logoText" TEXT NOT NULL,
    "logoBg" TEXT NOT NULL DEFAULT '#000000',
    "logoTextColor" TEXT NOT NULL DEFAULT '#ffffff',
    "platforms" TEXT[],
    "price" TEXT NOT NULL,
    "tat" TEXT NOT NULL,
    "exampleUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "Publication_isActive_idx" ON "Publication"("isActive");

-- CreateIndex
CREATE INDEX "Publication_price_idx" ON "Publication"("price");

-- CreateIndex
CREATE INDEX "Publication_da_idx" ON "Publication"("da");

-- CreateIndex
CREATE INDEX "BroadcastTelevision_isActive_idx" ON "BroadcastTelevision"("isActive");

-- CreateIndex
CREATE INDEX "BroadcastTelevision_affiliate_idx" ON "BroadcastTelevision"("affiliate");

-- CreateIndex
CREATE INDEX "DigitalTelevision_isActive_idx" ON "DigitalTelevision"("isActive");

-- CreateIndex
CREATE INDEX "DigitalTelevision_callSign_idx" ON "DigitalTelevision"("callSign");

-- CreateIndex
CREATE INDEX "Listicle_isActive_idx" ON "Listicle"("isActive");

-- CreateIndex
CREATE INDEX "Listicle_name_idx" ON "Listicle"("name");

-- CreateIndex
CREATE INDEX "BestSeller_isActive_idx" ON "BestSeller"("isActive");

-- CreateIndex
CREATE INDEX "BestSeller_name_idx" ON "BestSeller"("name");

-- CreateIndex
CREATE INDEX "PrintMagazine_isActive_idx" ON "PrintMagazine"("isActive");

-- CreateIndex
CREATE INDEX "PrintMagazine_title_idx" ON "PrintMagazine"("title");

-- CreateIndex
CREATE INDEX "SocialPost_isActive_idx" ON "SocialPost"("isActive");

-- CreateIndex
CREATE INDEX "SocialPost_category_idx" ON "SocialPost"("category");
