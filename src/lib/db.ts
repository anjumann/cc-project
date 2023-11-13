import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateShortCode = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortCode = "";

  for (let i = 0; i < 6; i++) {
    shortCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return shortCode;
};

const findShortLink = async (originalLink: string) => {
  const data = await prisma.url.findUnique({
    where: {
      original: originalLink,
    },
  });

  return data;
};

const findShortCode =async (shortCode:string) => {
  const data = await prisma.url.findUnique({
    where: {
      shorten: shortCode,
    },
    
  });

  return data;
}

const createShortLink = async (originalLink: string) => {
  if (!originalLink) {
    throw new Error("Original link cannot be empty");
  }

  const existingMapping = await findShortLink(originalLink);

  if (existingMapping) {
    console.log("Existing mapping found", existingMapping);
    return existingMapping;
  }

  let shortLink: string | undefined; // Initialize as undefined

  // Generate a new short link and ensure it's unique
  while (!shortLink) {
    const potentialShortLink = generateShortCode();
    const existingShortLink = await prisma.url.findUnique({
      where: {
        shorten: potentialShortLink,
      },
    });
    if (!existingShortLink) {
      shortLink = potentialShortLink;
    }
  }

  const newShort = await prisma.url.create({
    data: {
      original: originalLink,
      shorten: shortLink,
    },
  });

  console.log("Short link created", newShort);
  return newShort;
};

export { createShortLink, findShortLink, findShortCode };
