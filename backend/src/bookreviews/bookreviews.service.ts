import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookReview } from './bookreview.entity';
import { Repository } from 'typeorm';
import { CreateBookReviewInput } from './inputs/create-bookreview.input';

@Injectable()
export class BookReviewsService {
    constructor(
        @InjectRepository(BookReview)
        private repo: Repository<BookReview>,
    ) {}
    findAllByUser(userId: string) {
        return this.repo.find({ where: { userId } });
    }
    findOneByUser(userId: string, bookId: string) {
        return this.repo.findOne({ where: { userId, bookId } });
    }
    findAllByBook(bookId: string) {
        return this.repo.find({ where: { bookId } });
    }
    create(input: CreateBookReviewInput) {
        const newBookReview = this.repo.create(input);

        newBookReview.body = input.body;
        newBookReview.bookId = input.bookId;
        newBookReview.userId = input.userId;
        newBookReview.rating = input.rating;
        newBookReview.creationDate = new Date();
        newBookReview.lastUpdated = new Date();

        return this.repo.save(newBookReview);
    }

    remove(id: string) {
        return `This action removes a #${id} bookreview`;
    }
}
