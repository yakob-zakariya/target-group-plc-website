import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(
    "admin123",
    10
  );

  const admin = await prisma.user.upsert({
    where: { email: "admin@targetgroup.com" },
    update: {},
    create: {
      email: "admin@targetgroup.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("Created admin user:", admin.email);

  // Create hero slides
  const heroSlides = [
    {
      title: "Building Ethiopia's Future",
      subtitle:
        "Your trusted partner in construction materials, agriculture, and trade",
      image: "/images/hero/construction.jpg",
      buttonText: "Our Services",
      buttonLink: "/services",
      order: 1,
    },
    {
      title: "Agricultural Excellence",
      subtitle:
        "Supporting Ethiopia's agricultural growth with quality products",
      image: "/images/hero/agro.jpg",
      buttonText: "Learn More",
      buttonLink: "/services/agro-industry",
      order: 2,
    },
    {
      title: "Global Trade Partners",
      subtitle:
        "Connecting Ethiopian businesses to the world",
      image: "/images/hero/trade.jpg",
      buttonText: "Import & Export",
      buttonLink: "/services/import-export",
      order: 3,
    },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.upsert({
      where: { id: `slide-${slide.order}` },
      update: slide,
      create: {
        id: `slide-${slide.order}`,
        ...slide,
      },
    });
  }
  console.log("Created hero slides");

  // Create services
  const services = [
    {
      id: "svc-construction",
      name: "Construction Materials",
      slug: "construction-materials",
      description:
        "Premium quality construction materials imported from trusted global suppliers.",
      image: "/images/services/construction.jpg",
      icon: "Building2",
      order: 1,
    },
    {
      id: "svc-agro",
      name: "Agro Industry",
      slug: "agro-industry",
      description:
        "Supporting Ethiopia's agricultural sector with processing and export services.",
      image: "/images/services/agro.jpg",
      icon: "Factory",
      order: 2,
    },
    {
      id: "svc-trade",
      name: "Import & Export",
      slug: "import-export",
      description:
        "Facilitating international trade with reliable logistics and partnerships.",
      image: "/images/services/trade.jpg",
      icon: "Ship",
      order: 3,
    },
    {
      id: "svc-education",
      name: "Education",
      slug: "education",
      description:
        "Investing in Ethiopia's future through quality educational initiatives.",
      image: "/images/services/education.jpg",
      icon: "GraduationCap",
      order: 4,
    },
    {
      id: "svc-it",
      name: "IT Services",
      slug: "it-services",
      description:
        "Modern technology solutions for businesses across Ethiopia.",
      image: "/images/services/it.jpg",
      icon: "Monitor",
      order: 5,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log("Created services");

  // Create team members
  const teamMembers = [
    {
      id: "team-1",
      name: "Abebe Kebede",
      role: "CEO & Founder",
      image: "/images/team/ceo.jpg",
      order: 1,
    },
    {
      id: "team-2",
      name: "Tigist Haile",
      role: "Operations Director",
      image: "/images/team/director.jpg",
      order: 2,
    },
    {
      id: "team-3",
      name: "Dawit Mengistu",
      role: "Finance Manager",
      image: "/images/team/finance.jpg",
      order: 3,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: member,
      create: member,
    });
  }
  console.log("Created team members");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
