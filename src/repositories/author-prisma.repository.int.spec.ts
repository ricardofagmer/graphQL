import { Test, TestingModule } from '@nestjs/testing';
import { AuthorPrismaRepository } from '@/repositories/author-prisma.repository';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { NotFoundError } from 'rxjs';
import { AuthorDataBuilder } from '@/author/helpers/author-data-builder';
import { faker } from '@faker-js/faker';


describe('AuthorPrismaRepository IT', () => {

  let module: TestingModule;
  let repository: AuthorPrismaRepository;
  const prisma = new PrismaClient();


  beforeAll(async () => {
    execSync('npm run prisma:migratetest');
    await prisma.$connect();

    module = await Test.createTestingModule({}).compile();
    repository = new AuthorPrismaRepository(prisma as any);
  });


  beforeEach(async () => {
    // await prisma.author.deleteMany();
  });

  afterAll(async () => {
    await module.close();
  });

  test('should throws an error when id not found', async () => {
    const id = '3310b9d6-53f1-4d89-abc4-26aff0a10dc0';

    await expect(repository.findById(id)).rejects.toThrow(new NotFoundError(
      `Author not found ${id}`,
    ));
  });

  test('should find an author by id', async () => {
    const data = {
      name: 'John Doe',
      email: faker.internet.email(),
    };

    const author = await prisma.author.create({ data });

    const result = await repository.findById(author.id);
    expect(result).toStrictEqual(author);

  });

  it('should find an author by id with faker', async () => {
    const data = AuthorDataBuilder({});

    const author = await prisma.author.create({ data });

    const result = await repository.findById(author.id);
    expect(result).toStrictEqual(author);

  });

  it('should create an author', async () => {
    const data = AuthorDataBuilder({});

    const author = await prisma.author.create({ data });

    expect(author).toMatchObject(data);

  });

});
