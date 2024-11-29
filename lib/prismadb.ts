import { PrismaClient } from "@prisma/client";

// declare namespace global as PrismaClient options default to undefined

declare global {
  var prisma: PrismaClient | undefined;
}
// globalThis property provides a standard way of accessing the global this value
// in both Node.js and the browser

const prismadb = globalThis.prisma || new PrismaClient();

// if the environment is not production, set the globalThis.prisma to the new PrismaClient instance
// this will allow you to access the prisma schema in your development environment

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismadb;
}

// export the prismadb instance

export default prismadb;
