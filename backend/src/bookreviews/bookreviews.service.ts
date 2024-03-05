import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookReview } from './bookreview.entity';
import { Equal, Repository } from 'typeorm';
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
        @InjectRepository(BookReview) private reviewRepo: Repository<BookReview>,
    ) {}
    findAllByUser(userId: string) {
        return this.repo.find({ where: { user: { id: Equal(userId) } }, relations: { book: true } });
    }
    findOneByUser(userId: string, bookId: string) {
        return this.repo.findOne({ where: { user: { id: Equal(userId) }, book: { id: Equal(bookId) }} });
    }
    findAllByBook(bookId: string) {
        return this.repo.find({ where: { book: { id: Equal(bookId) } }, relations: { user: true } });
    }
    findAll() {
        return this.repo.find({ relations: { book: true, user: true } });
    }
    async create(input: CreateBookReviewInput) {
        const newBookReview = this.repo.create(input);

        newBookReview.body = input.body;
        newBookReview.rating = input.rating;
        newBookReview.creationDate = new Date();
        newBookReview.lastUpdated = new Date();

        const book = await this.bookRepo.findOne({ where: { id: input.bookId } });
        if (!book) {
            throw new Error(`Could not find book with id: ${input.bookId}`);
        }

        const user = await this.userRepo.findOne({ where: { id: input.userId } });
        if (!user) {
            throw new Error(`Could not find user with id: ${input.userId}`);
        }

        newBookReview.book = book;
        newBookReview.user = user;

        return this.repo.save(newBookReview);
    }

    remove(id: string) {
        return `This action removes a #${id} bookreview`;
    }

    async calculateAggregateScore(bookId: string) {
        const reviews = await this.reviewRepo.find({ where: { bookId } });
        if (reviews.length == 0) {
            return 0;
        }
        const totalScore = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalScore / reviews.length;
    }
}
