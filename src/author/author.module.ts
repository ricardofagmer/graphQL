import { Module } from '@nestjs/common';
import { AuthorsResolver } from './graphql/resolvers/authors.resolver';
import { DatabaseModule } from '@/database/database.module';
import { PrismaService } from '@/database/prisma/prisma.service';
import { AuthorPrismaRepository } from '@/repositories/author-prisma.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthorsResolver,
    {
      provide: 'PrismaService',
      useClass: PrismaService
    },
    {
      provide: 'AuthorsRepository',
      useFactory: (prisma: PrismaService) => {
        return new AuthorPrismaRepository(prisma);
      },
      inject: [PrismaService],
    }
  ]
})
export class AuthorModule {}
