const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateBalaramUser() {
  console.log("Upserting Admin Balaram into database...");

  // Upsert Balaram
  const balaram = await prisma.user.upsert({
    where: { email: "balaram@brkexperiments.dev" },
    update: {
      name: "Balaram",
      passwordHash: "balaram@2008",
      role: "ADMIN",
      avatar: "/creator.jpg",
      bio: "Creator & Lead Hardware Architect @ BRKExperiments.",
    },
    create: {
      email: "balaram@brkexperiments.dev",
      name: "Balaram",
      passwordHash: "balaram@2008",
      role: "ADMIN",
      avatar: "/creator.jpg",
      bio: "Creator & Lead Hardware Architect @ BRKExperiments.",
    },
  });

  // Also update admin@brkexperiments.dev if exists
  await prisma.user.updateMany({
    where: { email: "admin@brkexperiments.dev" },
    data: {
      name: "Balaram",
      passwordHash: "balaram@2008",
      avatar: "/creator.jpg",
    },
  });

  console.log("Admin Balaram configured successfully:", balaram);
  await prisma.$disconnect();
}

updateBalaramUser().catch(console.error);
