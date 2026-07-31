const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    fs.writeFileSync('err2.txt', "Success! users: " + users.length, 'utf-8');
  } catch (err) {
    fs.writeFileSync('err2.txt', String(err) + "\n\n" + (err.message || ""), 'utf-8');
  } finally {
    await prisma.$disconnect();
  }
}
main();
