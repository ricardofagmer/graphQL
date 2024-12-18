import { IAuthorRepository, SearchParams, SearchResult } from '@/interfaces/author.interface';
import { ICreateAuthor } from '@/interfaces/create-author.interface';
import { Author } from '@/author/graphql/models/author';
import { PrismaService } from '@/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/errors/not-found.erros';


export class AuthorPrismaRepository implements IAuthorRepository {
  sortableFields: string[] = ['name', 'email', 'createdAt'];

  constructor(private prisma: PrismaService) {
  }

  async create(data: ICreateAuthor): Promise<Author> {
    return this.prisma.author.create({ data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.author.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<Author> {
    const author = await this.prisma.author.findUnique({ where: { email } });
    if (!author) {
      throw new NotFoundError(`Author not found ${email}`);
    }
    return author;
  }

  async findById(id: string): Promise<Author> {
    return await this.get(id);
  }

  async get(id: string): Promise<Author> {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundError(`Author not found ${id}`);
    }

    return author;
  }

  async search(params: SearchParams): Promise<SearchResult> {
    const { page = 1, perPage = 15, filter, sort, sortDir } = params;
    const sortable = this.sortableFields.includes(sort) || false;
    const orderByField = sortable ? sort : 'createdAt';
    const orderByDir = sortable ? sortDir : 'DESC';

    const count = await this.prisma.author.count({
      ...(filter && {
          where: {
            OR: [
              { name: { contains: filter, mode: 'insensitive' } },
              { email: { contains: filter, mode: 'insensitive' } },
            ],
          },
        }
      ),
    });

    const authors = await this.prisma.author.findMany({
      ...(filter && {
          where: {
            OR: [
              { name: { contains: filter, mode: 'insensitive' } },
              { email: { contains: filter, mode: 'insensitive' } },
            ],
          },
        }
      ),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: page > 0 ? (page - 1) * perPage : 1,
      take: perPage > 0 ? perPage : 15,
    });

    return {
      items: authors,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(count / perPage),
      total: count,
    };

  }

  async update(author: Author): Promise<Author> {
    await this.get(author.id);
    return this.prisma.author.update({
      data: author,
      where: { id: author.id },
    })
  }


}
