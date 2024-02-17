import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookReview } from './bookreview.entity';
import { User } from 'src/user/user.entity';
import { Book } from 'src/books/book.entity';
import { In, Repository } from 'typeorm';
import { CreateBookReviewInput } from './inputs/create-bookreview.input';

@Injectable()
export class BookReviewsService {
    constructor(
        @InjectRepository(BookReview) private repo: Repository<BookReview>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Book) private bookRepo: Repository<Book>
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
    async create(input: CreateBookReviewInput) {
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
