import { PrismaClient } from '@prisma/client';
import { users } from './users/users-seed';
import { account } from './accounts/accounts-seed';
import { orgEmailDomains, orgs } from './orgs/orgs-seed';

const prisma = new PrismaClient();

async function seed() {
  prisma.$transaction(async (prisma) => {
    console.log('Seeding Account...');
    await prisma.account.upsert({
      where: {
        id: account.id
      },
      update: {},
      create: account
    });
    console.log(`Upserted account: ${account.name}`);

    console.log('Seeding Orgs...');
    await Promise.all(
      orgs.map(async (org) => {
        await prisma.org.upsert({
          where: {
            id: org.id
          },
          update: {},
          create: org
        });
        console.log(`Upserted org row: ${org.name}`);
      })
    );

    console.log('Seeding Org Email Domains...');
    await Promise.all(
      orgEmailDomains.map(async (orgEmailDomain) => {
        await prisma.orgEmailDomain.upsert({
          where: {
            orgId_name: {
              orgId: orgEmailDomain.orgId,
              name: orgEmailDomain.name
            }
          },
          update: {},
          create: orgEmailDomain
        });
        console.log(
          `Upserted org email domain row: ${orgEmailDomain.orgId} / ${orgEmailDomain.name}`
        );
      })
    );

    console.log('Seeding Users...');
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.upsert({
          where: {
            username: user.username
          },
          update: {},
          create: user
        });
        console.log(`Upserted user row: ${user.username}`);
      })
    );
  });
}

(async () => {
  try {
    await seed();
    console.log('Seed success!');
  } catch (e) {
    console.error(e);
    console.log('Seed failed. Transaction rolled back.');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
