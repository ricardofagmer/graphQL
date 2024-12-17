import { IAuthorRepository, SearchParams, SearchResult } from '@/interfaces/author.repository';
import { ICreateAuthor } from '@/interfaces/create-author.interface';


export class AuthorPrismaRepository implements IAuthorRepository {
  sortableFields: string[] = ['name', 'email', 'createdAt'];

  create(data: ICreateAuthor): Promise<Author> {
    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  findByEmail(email: string): Promise<Author> {
    return Promise.resolve(undefined);
  }

  findById(id: string): Promise<Author> {
    return Promise.resolve(undefined);
  }

  get(id: string): Promise<Author> {
    return Promise.resolve(undefined);
  }

  search(params: SearchParams): Promise<SearchResult> {
    return Promise.resolve(undefined);
  }

  update(author: Author): Promise<Author> {
    return Promise.resolve(undefined);
  }


}