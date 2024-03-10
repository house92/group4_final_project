import { Injectable } from '@nestjs/common';
import { Author } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateAuthorInput } from './inputs/create-author.input';
import { UpdateAuthorInput } from './inputs/update-author.input';
import { Book } from 'src/books/book.entity';

interface FindAllArgs {
    limit?: number;
    from?: number;
}

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author) private repo: Repository<Author>,
        @InjectRepository(Book) private bookRepo: Repository<Book>,
    ) {}

    findAll({ limit, from }: FindAllArgs) {
        return this.repo.findAndCount({ take: limit, skip: from });
    }

    findById(id: string) {
        return this.repo.findOne({ where: { id }, relations: { books: true } });
    }

    async create(input: CreateAuthorInput) {
        const { bookIds, ...rest } = input;
        const newAuthor = await this.repo.save(rest);

        if (bookIds) {
            const books = await this.bookRepo.find({ where: { id: In(bookIds) } });
            newAuthor.books = books;

            await this.repo.save(newAuthor);
        }

        return newAuthor;
    }
    async update(_input: UpdateAuthorInput) {
        const { id, ...input } = _input;

        const author = await this.repo.findOne({ where: { id } });

        if (!author) {
            throw new Error(`Author with ID ${id} not found`);
        }

        const updatedAuthor: Author = { ...author, ...input };
        return this.repo.save(updatedAuthor);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}