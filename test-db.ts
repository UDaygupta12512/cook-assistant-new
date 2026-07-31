import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Success! Connected to DB, users count:", users.length);
  } catch (err) {
    console.error("Database connection error:");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
