import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@/database/prisma/prisma.service';
import { Author } from '@/author/graphql/models/author';

@Resolver(() => Author)
export class AuthorsResolver {

  constructor(private readonly prisma: PrismaService) { }

  @Query(() => [Author])
  authors(){
    return this.prisma.author.findMany();
  }
}
