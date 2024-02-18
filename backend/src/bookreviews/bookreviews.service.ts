import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookReview } from './bookreview.entity';
import { Repository } from 'typeorm';
import { CreateBookReviewInput } from './inputs/create-bookreview.input';
import { Book } from 'src/books/book.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class BookReviewsService {
    constructor(
        @InjectRepository(BookReview)
        private repo: Repository<BookReview>,
        @InjectRepository(Book) private bookRepo: Repository<Book>,
        @InjectRepository(User) private userRepo: Repository<User>,

    ) {}
    findAllByUser(userId: string) {
        return this.repo.find({ where: { userId: userId } });
    }
    findOneByUser(userId: string, bookId: string) {
        return this.repo.findOne({ where: { userId, bookId } });
    }
    findAllByBook(id: string) {
        return this.repo.find({ where: { bookId: id } });
    }
    async create(input: CreateBookReviewInput) {
        const newBookReview = this.repo.create(input);

        newBookReview.body = input.body;
        newBookReview.bookId = input.bookId;
        newBookReview.userId = input.userId;
        newBookReview.rating = input.rating;
        newBookReview.creationDate = new Date();
        newBookReview.lastUpdated = new Date();

        newBookReview.book = await this.bookRepo.findOne({ where: { id: input.bookId } });
        newBookReview.user = await this.userRepo.findOne({ where: { id: input.userId } });

        return this.repo.save(newBookReview);
    }

    remove(id: string) {
        return `This action removes a #${id} bookreview`;
    }
}
