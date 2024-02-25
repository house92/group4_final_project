import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './inputs/create-book.input';
import { UpdateBookInput } from './inputs/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Author } from 'src/authors/author.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private repo: Repository<Book>,
        @InjectRepository(Author) private authorRepo: Repository<Author>,
    ) {}

    findAll() {
        return this.repo.find({ relations: { authors: true } });
    }

    findById(id: string, relations: FindOneOptions<Book>['relations'] = {}) {
        return this.repo.findOne({ where: { id }, relations });
    }

    async create(input: CreateBookInput) {
        const newBook = this.repo.create(input);

        if (input.authorIds) {
            const authors = await this.authorRepo.find({ where: { id: In(input.authorIds) } });
            newBook.authors = authors;
        }

        return this.repo.save(newBook);
    }

    update(id: number, input: UpdateBookInput) {
        return `This action updates a #${id} book`;
    }

    remove(id: number) {
        return `This action removes a #${id} book`;
    }
}
