import { createListicle, getListicles, deleteListicle } from "./backend/services/listicleService";
import { createBestSeller, getBestSellers, deleteBestSeller } from "./backend/services/bestSellerService";
import { createPrintMagazine, getPrintMagazines, deletePrintMagazine } from "./backend/services/printMagazineService";

async function runTests() {
  console.log("=== STARTING BACKEND SERVICE TESTS ===");

  try {
    // 1. Test Listicle Service
    console.log("\n[1] Testing Listicle Service...");
    const listicle = await createListicle({
      name: "Test Listicle",
      domain: "test-listicle.com",
      logoText: "TL",
      logoBg: "#000000",
      logoTextColor: "#ffffff",
      genres: ["Tech"],
      top5Price: "$500",
      top10Price: "$250",
      da: 50,
      dr: 50,
      tat: "1 Week",
      region: ["US"],
      sponsored: true,
      indexed: true,
      doFollow: true,
      exampleUrl: "https://example.com",
      llmAeo: false,
      isActive: true
    });
    console.log("✅ Created Listicle:", listicle.id);

    const listicles = await getListicles({ search: "Test Listicle" });
    if (listicles.items.length > 0) {
      console.log("✅ Fetched Listicle successfully.");
    } else {
      throw new Error("Failed to fetch created listicle");
    }

    await deleteListicle(listicle.id, true);
    console.log("✅ Soft-deleted Listicle.");


    // 2. Test Best Seller Service
    console.log("\n[2] Testing Best Seller Service...");
    const bestSeller = await createBestSeller({
      name: "Test Best Seller",
      domain: "test-bestseller.com",
      logoText: "TBS",
      logoBg: "#ffffff",
      logoTextColor: "#000000",
      genres: ["Business"],
      price: "$1000",
      da: 90,
      dr: 90,
      tat: "2 Days",
      region: ["Global"],
      sponsored: "Discrete",
      indexed: true,
      doFollow: true,
      exampleUrl: "https://bestseller.com",
      llmAeo: true,
      nicheAge18: true,
      nicheHeart: false,
      nicheCannabis: false,
      nicheCopyright: false,
      nicheCasino: true,
      nicheAge18Multiplier: "x2",
      nicheCasinoMultiplier: "x5",
      isActive: true
    });
    console.log("✅ Created Best Seller:", bestSeller.id);

    const bestSellers = await getBestSellers({ search: "Test Best Seller" });
    if (bestSellers.items.length > 0) {
      console.log("✅ Fetched Best Seller successfully.");
    } else {
      throw new Error("Failed to fetch created best seller");
    }

    await deleteBestSeller(bestSeller.id, true);
    console.log("✅ Soft-deleted Best Seller.");


    // 3. Test Print Magazine Service
    console.log("\n[3] Testing Print Magazine Service...");
    const printMagazine = await createPrintMagazine({
      title: "Test Print Magazine",
      domain: "test-print.com",
      websiteUrl: "https://test-print.com",
      fullPagePrice: "$5000",
      spreadPrice: "$9000",
      turnaround: "1 Month",
      circulation: "10,000+",
      isActive: true
    });
    console.log("✅ Created Print Magazine:", printMagazine.id);

    const printMagazines = await getPrintMagazines({ search: "Test Print Magazine" });
    if (printMagazines.items.length > 0) {
      console.log("✅ Fetched Print Magazine successfully.");
    } else {
      throw new Error("Failed to fetch created print magazine");
    }

    await deletePrintMagazine(printMagazine.id, true);
    console.log("✅ Soft-deleted Print Magazine.");

    console.log("\n=== ALL TESTS PASSED SUCCESSFULLY! ===");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ TEST FAILED:");
    console.error(error);
    process.exit(1);
  }
}

runTests();
