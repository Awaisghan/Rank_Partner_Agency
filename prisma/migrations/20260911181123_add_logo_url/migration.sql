-- AlterTable
ALTER TABLE "BestSeller" ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "nicheAge18Multiplier" TEXT,
ADD COLUMN     "nicheCannabisMultiplier" TEXT,
ADD COLUMN     "nicheCasinoMultiplier" TEXT,
ADD COLUMN     "nicheCopyrightMultiplier" TEXT,
ADD COLUMN     "nicheHeartMultiplier" TEXT,
ALTER COLUMN "logoText" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Listicle" ADD COLUMN     "logoUrl" TEXT,
ALTER COLUMN "logoText" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "nicheAge18Multiplier" TEXT,
ADD COLUMN     "nicheCannabisMultiplier" TEXT,
ADD COLUMN     "nicheCasinoMultiplier" TEXT,
ADD COLUMN     "nicheCopyrightMultiplier" TEXT,
ADD COLUMN     "nicheHeartMultiplier" TEXT,
ALTER COLUMN "logoText" SET DEFAULT '';

-- AlterTable
ALTER TABLE "SocialPost" ADD COLUMN     "logoUrl" TEXT,
ALTER COLUMN "logoText" SET DEFAULT '';
