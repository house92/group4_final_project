import { Test, TestingModule } from '@nestjs/testing';
import { BookReviewsResolver } from './bookreviews.resolver';
import { BookReviewsService } from './bookreviews.service';

describe('BooksResolver', () => {
    let resolver: BookReviewsResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BookReviewsResolver, BookReviewsService],
        }).compile();

        resolver = module.get<BookReviewsResolver>(BookReviewsResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
