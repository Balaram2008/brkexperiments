const { PrismaClient } = require("@prisma/client");
const { hardwareCategories, hardwareTechnologies } = require("./hardware_categories");
const { esp32Projects } = require("./seed_esp32");
const { arduinoUnoProjects } = require("./seed_uno");
const { arduinoNanoProjects } = require("./seed_nano");
const { arduinoMegaProjects } = require("./seed_mega");
const { esp8266Projects } = require("./seed_esp8266");

const prisma = new PrismaClient();

async function runMasterHardwareSeed() {
  console.log("=================================================");
  console.log("BRKEXPERIMENTS — HARDWARE ENGINEERING LAB SEEDER");
  console.log("=================================================");

  console.log("[1/6] Cleaning existing database records...");
  await prisma.downloadLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.entitlement.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.projectTechnology.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("[2/6] Seeding Users with requested credentials...");
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@brkexperiments.dev",
      name: "BRK Admin",
      passwordHash: "admin123",
      role: "ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      bio: "Chief Systems Architect at BRKExperiments Hardware Lab.",
    },
  });

  const makerUser = await prisma.user.create({
    data: {
      email: "brkexperiments@gmail.com",
      name: "BRK Maker",
      passwordHash: "maker123",
      role: "USER",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      bio: "Hardware Creator & Embedded Firmware Developer @ BRKExperiments.",
    },
  });

  const builderUser = await prisma.user.create({
    data: {
      email: "builder@brkexperiments.dev",
      name: "Arjun Sharma",
      passwordHash: "builder123",
      role: "USER",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      bio: "IoT Builder, Robotics Enthusiast & Firmware Explorer.",
    },
  });

  console.log("[3/6] Seeding Hardware Engineering Categories...");
  const catMap = {};
  for (const c of hardwareCategories) {
    const created = await prisma.category.create({ data: c });
    catMap[c.slug] = created.id;
  }

  console.log("[4/6] Seeding Hardware Technologies...");
  const techMap = {};
  for (const t of hardwareTechnologies) {
    const created = await prisma.technology.create({ data: t });
    techMap[t.slug] = created.id;
  }

  console.log("[5/6] Seeding 35 Complete Hardware Project Packages...");
  const allProjects = [
    ...esp32Projects,
    ...arduinoUnoProjects,
    ...arduinoNanoProjects,
    ...arduinoMegaProjects,
    ...esp8266Projects,
  ];

  console.log(`Total projects to insert: ${allProjects.length}`);

  let insertedCount = 0;
  for (const p of allProjects) {
    const { categorySlug, technologies: pTechs, ...pData } = p;
    const catId = catMap[categorySlug] || catMap["esp32"] || Object.values(catMap)[0];

    const createdProject = await prisma.project.create({
      data: {
        ...pData,
        categoryId: catId,
        price: 0,
        discountPrice: 0,
        currency: "INR",
        rating: 4.8 + Math.random() * 0.2,
        reviewCount: Math.floor(12 + Math.random() * 45),
        purchaseCount: Math.floor(150 + Math.random() * 850),
      },
    });

    if (pTechs && Array.isArray(pTechs)) {
      for (const tSlug of pTechs) {
        const tId = techMap[tSlug];
        if (tId) {
          await prisma.projectTechnology.create({
            data: {
              projectId: createdProject.id,
              technologyId: tId,
            },
          });
        }
      }
    }

    insertedCount++;
  }

  console.log(`Successfully seeded ${insertedCount} hardware projects!`);

  console.log("[6/6] Creating default entitlements and initial reviews...");
  const firstProject = await prisma.project.findFirst({
    where: { slug: "esp32-wifi-home-automation" },
  });

  if (firstProject) {
    await prisma.entitlement.create({
      data: {
        userId: makerUser.id,
        projectId: firstProject.id,
        licenseKey: "BRK-HW-ESP32-HOME-FREE-001",
        isActive: true,
      },
    });

    await prisma.entitlement.create({
      data: {
        userId: builderUser.id,
        projectId: firstProject.id,
        licenseKey: "BRK-HW-ESP32-HOME-FREE-002",
        isActive: true,
      },
    });

    await prisma.review.create({
      data: {
        userId: builderUser.id,
        projectId: firstProject.id,
        rating: 5,
        title: "Flawless Wi-Fi relay control and tested .ino sketch",
        comment:
          "Built this in under an hour! The asynchronous web server response is instant, optocoupled relays kept my ESP32 completely safe from electrical noise, and the pinout diagram was 100% accurate. Subscribed on YouTube as well!",
        verifiedPurchase: true,
      },
    });

    await prisma.favorite.create({
      data: {
        userId: makerUser.id,
        projectId: firstProject.id,
      },
    });
  }

  const robotProject = await prisma.project.findFirst({
    where: { slug: "arduino-obstacle-avoiding-robot" },
  });
  if (robotProject) {
    await prisma.review.create({
      data: {
        userId: makerUser.id,
        projectId: robotProject.id,
        rating: 5,
        title: "Best autonomous rover guide on the internet",
        comment:
          "The ultrasonic sweep logic and distance comparison works like a charm. Tested with 2x 18650 cells. The serial monitor output makes debugging effortless.",
        verifiedPurchase: true,
      },
    });
  }

  console.log("=================================================");
  console.log("✅ ALL 35 HARDWARE PROJECTS SUCCESSFULLY SEEDED!");
  console.log("Ready credentials:");
  console.log(" - Admin: admin@brkexperiments.dev / admin123");
  console.log(" - Maker: brkexperiments@gmail.com / maker123");
  console.log(" - Builder: builder@brkexperiments.dev / builder123");
  console.log("=================================================");
}

runMasterHardwareSeed()
  .catch((err) => {
    console.error("Hardware seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
