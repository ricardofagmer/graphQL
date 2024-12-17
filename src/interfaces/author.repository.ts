import { ICreateAuthor } from '@/interfaces/create-author.interface';


export type SearchParams = {
   page?: number;
   perPage?: number
   filter?: string;
   sort?: string;
   sortDir?: 'ASC' | 'DESC';
}

export type SearchResult = {
   items: Author[];
   currentPage: number;
   perPage: number;
   lastPage: number;
   total: number;
}

export interface IAuthorRepository {
   sortableFields: Array<string>;
}
export interface IAuthorRepository {
   create(data: ICreateAuthor): Promise<Author>;
   update(author: Author): Promise<Author>;
   delete(id: string): Promise<void>;
   findById(id: string): Promise<Author>;
   findByEmail(email: string): Promise<Author>;
   search(params: SearchParams): Promise<SearchResult>;
   get(id: string): Promise<Author>;
}