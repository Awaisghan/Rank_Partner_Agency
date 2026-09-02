// ============================================================
// Prisma Seed File — Rank Partner
// Seeds: 1 Admin User + Sample data for all 7 sections
// ============================================================

import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ----------------------------------------------------------
  // 1. ADMIN USER
  // ----------------------------------------------------------
  const passwordHash = await bcrypt.hash("Rank@Partner", 12);

  await prisma.user.upsert({
    where: { email: "rankpartner@gmail.com" },
    update: {},
    create: {
      name: "Rank Partner Admin",
      email: "rankpartner@gmail.com",
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
  });
  console.log("✅ Admin user created: rankpartner@gmail.com / Rank@Partner");

  // ----------------------------------------------------------
  // 2. PUBLICATIONS (Sample)
  // ----------------------------------------------------------
  await prisma.publication.createMany({
    data: [
      {
        name: "Daily Mirror",
        domain: "dailymirror.com",
        logoText: "DM",
        logoBg: "#1a1a2e",
        logoTextColor: "#ffffff",
        price: 250,
        da: 92,
        dr: 88,
        tat: "2-3 Days",
        region: ["United Kingdom", "Global"],
        genres: ["News", "Politics"],
        sponsored: false,
        indexed: true,
        doFollow: true,
        llmAeo: true,
        isNew: false,
      },
      {
        name: "Forbes",
        domain: "forbes.com",
        logoText: "F",
        logoBg: "#000000",
        logoTextColor: "#ffffff",
        price: 1500,
        da: 95,
        dr: 92,
        tat: "1 Week",
        region: ["United States", "Global"],
        genres: ["Business", "Finance", "Tech"],
        sponsored: true,
        indexed: true,
        doFollow: false,
        llmAeo: true,
        isNew: false,
      },
      {
        name: "Tech Crunch",
        domain: "techcrunch.com",
        logoText: "TC",
        logoBg: "#0a7c59",
        logoTextColor: "#ffffff",
        price: 800,
        da: 93,
        dr: 90,
        tat: "5-7 Days",
        region: ["United States", "Global"],
        genres: ["Tech", "Startups"],
        sponsored: false,
        indexed: true,
        doFollow: false,
        llmAeo: true,
        isNew: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Publications seeded");

  // ----------------------------------------------------------
  // 3. BROADCAST TELEVISION (Sample)
  // ----------------------------------------------------------
  await prisma.broadcastTelevision.createMany({
    data: [
      {
        affiliate: "ABC News Now",
        exampleUrl: "https://abcnews.go.com",
        calls: "WABC",
        state: "New York",
        market: "News",
        dma: "1",
        segmentType: "Business Minute",
        recordingType: "Satellite",
        time: "6:00 AM",
        rate: "$2,500",
      },
      {
        affiliate: "Fox Business",
        exampleUrl: "https://foxbusiness.com",
        calls: "WNYW",
        state: "New York",
        market: "Business",
        dma: "1",
        segmentType: "Interview",
        recordingType: "In-Studio",
        time: "9:00 AM",
        rate: "$3,200",
      },
      {
        affiliate: "NBC Chicago",
        exampleUrl: "https://nbcchicago.com",
        calls: "WMAQ",
        state: "Illinois",
        market: "News",
        dma: "3",
        segmentType: "News Feature",
        recordingType: "Zoom",
        time: "7:30 AM",
        rate: "$1,800",
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Broadcast Television seeded");

  // ----------------------------------------------------------
  // 4. DIGITAL TELEVISION (Sample)
  // ----------------------------------------------------------
  await prisma.digitalTelevision.createMany({
    data: [
      {
        callSign: "KDAF",
        station: "Dallas Area Fox",
        rate: "$750",
        tat: "1 Week",
        sponsored: true,
        indexed: true,
        segmentLength: "5-10 Minutes",
        location: "Texas",
        programName: "Innovator's Journey",
        interviewType: "Video Call",
        exampleUrl: "https://kdaf.com/example",
      },
      {
        callSign: "KXAN",
        station: "Austin NBC",
        rate: "$900",
        tat: "2 Weeks",
        sponsored: false,
        indexed: true,
        segmentLength: "3-5 Minutes",
        location: "Texas",
        programName: "Austin Business Report",
        interviewType: "In-Person",
        exampleUrl: "https://kxan.com/example",
      },
      {
        callSign: "WSVN",
        station: "Miami Fox",
        rate: "$1,100",
        tat: "1 Week",
        sponsored: true,
        indexed: true,
        segmentLength: "5-10 Minutes",
        location: "Florida",
        programName: "South Florida Today",
        interviewType: "Video Call",
        exampleUrl: "https://wsvn.com/example",
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Digital Television seeded");

  // ----------------------------------------------------------
  // 5. LISTICLES (Sample)
  // ----------------------------------------------------------
  await prisma.listicle.createMany({
    data: [
      {
        name: "Inc. Magazine",
        domain: "inc.com",
        logoText: "INC",
        logoBg: "#ff6b00",
        logoTextColor: "#ffffff",
        genres: ["Business", "Startups"],
        top5Price: "$2,000",
        top10Price: "$3,000",
        da: 88,
        dr: 84,
        tat: "2-3 Weeks",
        region: ["United States"],
        sponsored: false,
        indexed: true,
        doFollow: false,
        llmAeo: true,
      },
      {
        name: "Entrepreneur",
        domain: "entrepreneur.com",
        logoText: "ENT",
        logoBg: "#2563eb",
        logoTextColor: "#ffffff",
        genres: ["Business", "Finance"],
        top5Price: "$1,800",
        top10Price: "$2,500",
        da: 91,
        dr: 87,
        tat: "1-2 Weeks",
        region: ["United States", "Global"],
        sponsored: false,
        indexed: true,
        doFollow: false,
        llmAeo: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Listicles seeded");

  // ----------------------------------------------------------
  // 6. BEST SELLERS (Sample)
  // ----------------------------------------------------------
  await prisma.bestSeller.createMany({
    data: [
      {
        name: "Miami Weekly",
        domain: "miamiweekly.com",
        logoText: "MW",
        logoBg: "#0f172a",
        logoTextColor: "#ffffff",
        genres: ["News"],
        price: "$100",
        da: 57,
        dr: 41,
        tat: "1 Day",
        region: ["Florida", "United States"],
        sponsored: "Discrete",
        indexed: true,
        doFollow: false,
        llmAeo: true,
        nicheAge18: false,
        nicheHeart: true,
        nicheCannabis: false,
        nicheCopyright: false,
        nicheCasino: false,
      },
      {
        name: "LA Weekly",
        domain: "laweekly.com",
        logoText: "LA",
        logoBg: "#7c3aed",
        logoTextColor: "#ffffff",
        genres: ["Entertainment", "Lifestyle"],
        price: "$150",
        da: 62,
        dr: 48,
        tat: "2 Days",
        region: ["California", "United States"],
        sponsored: "Yes",
        indexed: true,
        doFollow: false,
        llmAeo: false,
        nicheAge18: true,
        nicheHeart: false,
        nicheCannabis: true,
        nicheCopyright: false,
        nicheCasino: false,
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Best Sellers seeded");

  // ----------------------------------------------------------
  // 7. PRINT MAGAZINES (Sample)
  // ----------------------------------------------------------
  await prisma.printMagazine.createMany({
    data: [
      {
        title: "Billboard USA",
        domain: "billboard.com",
        websiteUrl: "https://billboard.com",
        fullPagePrice: "$7,500",
        spreadPrice: "$15,000",
        turnaround: "1-2 Months",
        circulation: "50,000+",
      },
      {
        title: "Rolling Stone",
        domain: "rollingstone.com",
        websiteUrl: "https://rollingstone.com",
        fullPagePrice: "$9,000",
        spreadPrice: "$18,000",
        turnaround: "6-8 Weeks",
        circulation: "200,000+",
      },
      {
        title: "Forbes Magazine",
        domain: "forbes.com",
        websiteUrl: "https://forbes.com/magazine",
        fullPagePrice: "$12,000",
        spreadPrice: "$24,000",
        turnaround: "2-3 Months",
        circulation: "500,000+",
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Print Magazines seeded");

  // ----------------------------------------------------------
  // 8. SOCIAL POSTS (Sample)
  // ----------------------------------------------------------
  await prisma.socialPost.createMany({
    data: [
      {
        name: "Variety",
        category: "Entertainment",
        logoText: "V",
        logoBg: "#b91c1c",
        logoTextColor: "#ffffff",
        platforms: ["instagram", "facebook"],
        price: "$500",
        tat: "3-5 Days",
        exampleUrl: "https://variety.com/example",
      },
      {
        name: "ESPN",
        category: "Sports",
        logoText: "ESPN",
        logoBg: "#cc0000",
        logoTextColor: "#ffffff",
        platforms: ["instagram", "x", "facebook"],
        price: "$800",
        tat: "2-3 Days",
        exampleUrl: "https://espn.com/example",
      },
      {
        name: "Bloomberg",
        category: "Business",
        logoText: "BLB",
        logoBg: "#1e40af",
        logoTextColor: "#ffffff",
        platforms: ["linkedin", "x"],
        price: "$1,200",
        tat: "5-7 Days",
        exampleUrl: "https://bloomberg.com/example",
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Social Posts seeded");

  console.log("\n🎉 Database seeding complete!");
  console.log("📧 Admin Login: rankpartner@gmail.com");
  console.log("🔑 Admin Password: Rank@Partner");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
