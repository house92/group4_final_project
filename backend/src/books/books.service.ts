import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './inputs/create-book.input';
import { UpdateBookInput } from './inputs/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Author } from 'src/authors/author.entity';

interface FindAllArgs {
    limit?: number;
    from?: number;
}

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private repo: Repository<Book>,
        @InjectRepository(Author) private authorRepo: Repository<Author>,
    ) {}

    findAll({ limit, from }: FindAllArgs) {
        return this.repo.findAndCount({ take: limit, skip: from, relations: { authors: true } });
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
    async averageRating(bookId: string) {
        const book = await this.repo.findOne({ where: { id: bookId }, relations: ['bookReviews'] });
        if (!book || !book.bookReviews || book.bookReviews.length == 0) {
            return 0;
        }
        const totalRating = book.bookReviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / book.bookReviews.length;
    }
}
