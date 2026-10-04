const { PrismaClient } = require("@prisma/client");
const { categories, technologies } = require("./seed_categories");
const { projectsPart1 } = require("./seed_projects_part1");
const { projectsPart2 } = require("./seed_projects_part2");
const { projectsPart3 } = require("./seed_projects_part3");
const { projectsPart4 } = require("./seed_projects_part4");

const prisma = new PrismaClient();

async function runSeed() {
  console.log("Cleaning database tables...");
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

  console.log("Creating default users...");
  const admin = await prisma.user.create({
    data: {
      email: "admin@brkexperiments.dev",
      name: "BRK Admin",
      passwordHash: "admin123",
      role: "ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      bio: "Chief Systems Architect at BRKExperiments.",
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      email: "builder@brkexperiments.dev",
      name: "Arjun Sharma",
      passwordHash: "builder123",
      role: "USER",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      bio: "Full-stack developer building AI workflows and hardware prototypes.",
    },
  });

  const sarahUser = await prisma.user.create({
    data: {
      email: "sarah.chen@techlab.io",
      name: "Sarah Chen",
      passwordHash: "sarah123",
      role: "USER",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      bio: "Distributed systems researcher & robotics telemetry engineer.",
    },
  });

  console.log("Creating categories...");
  const catMap = {};
  for (const c of categories) {
    const created = await prisma.category.create({ data: c });
    catMap[c.slug] = created.id;
  }

  console.log("Creating technologies...");
  const techMap = {};
  for (const t of technologies) {
    const created = await prisma.technology.create({ data: t });
    techMap[t.slug] = created.id;
  }

  console.log("Creating projects...");
  const allProjects = [
    ...projectsPart1,
    ...projectsPart2,
    ...projectsPart3,
    ...projectsPart4,
  ];

  for (const p of allProjects) {
    const { categorySlug, technologies: pTechs, ...pData } = p;
    const catId = catMap[categorySlug];
    if (!catId) {
      console.warn("Category missing for:", categorySlug);
      continue;
    }

    const createdProject = await prisma.project.create({
      data: {
        ...pData,
        categoryId: catId,
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
  }

  console.log("Creating coupons...");
  await prisma.coupon.create({
    data: {
      code: "LAUNCH20",
      discountType: "PERCENTAGE",
      discountValue: 20,
      minPurchase: 0,
      maxDiscount: 1000,
      active: true,
      usageLimit: 500,
    },
  });

  await prisma.coupon.create({
    data: {
      code: "BRK100",
      discountType: "PERCENTAGE",
      discountValue: 100,
      minPurchase: 0,
      maxDiscount: 10000,
      active: true,
      usageLimit: 1000,
    },
  });

  await prisma.coupon.create({
    data: {
      code: "SPECIAL500",
      discountType: "FIXED",
      discountValue: 500,
      minPurchase: 1500,
      maxDiscount: 500,
      active: true,
      usageLimit: 200,
    },
  });

  console.log("Creating demo orders, entitlements and favorites...");
  const p1 = await prisma.project.findFirst({
    where: { slug: "smart-vision-analytics-engine" },
  });
  const p2 = await prisma.project.findFirst({
    where: { slug: "autonomous-web-research-agent" },
  });
  const p3 = await prisma.project.findFirst({
    where: { slug: "realtime-collaborative-canvas-engine" },
  });

  if (p1 && demoUser) {
    await prisma.order.create({
      data: {
        orderNumber: "BRK-2026-90412",
        userId: demoUser.id,
        totalAmount: 1899,
        discountAmount: 600,
        currency: "INR",
        paymentMethod: "MOCK_INSTANT",
        paymentStatus: "COMPLETED",
        transactionId: "TXN_MOCK_8849129",
        items: {
          create: {
            projectId: p1.id,
            price: 1899,
          },
        },
      },
    });

    await prisma.entitlement.create({
      data: {
        userId: demoUser.id,
        projectId: p1.id,
        licenseKey: "BRK-SVA-COMMERCIAL-9A82-41C2-88B1",
        isActive: true,
      },
    });

    await prisma.review.create({
      data: {
        userId: demoUser.id,
        projectId: p1.id,
        rating: 5,
        title: "Incredible code quality and sub-15ms latency",
        comment:
          "This is hands-down the best video analytics repository I have worked with. Clean Docker setup, TensorRT acceleration was literally plug-and-play on our RTX 4090, and the Next.js telemetry canvas is gorgeous.",
        verifiedPurchase: true,
      },
    });
  }

  if (p2 && demoUser) {
    await prisma.favorite.create({
      data: {
        userId: demoUser.id,
        projectId: p2.id,
      },
    });
  }

  if (p3 && demoUser) {
    await prisma.favorite.create({
      data: {
        userId: demoUser.id,
        projectId: p3.id,
      },
    });
  }

  console.log("Seeding complete! 16 projects, categories, tech, and test accounts ready.");
}

runSeed()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
