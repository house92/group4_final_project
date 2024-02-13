import { Test, TestingModule } from '@nestjs/testing';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { Book } from './book.entity';

const mockBook: Book = {
    id: '1',
    title: 'Frankenstein',
    coverImage: 'https://en.wikipedia.org/wiki/Frankenstein#/media/File:Frankenstein_1818_edition_title_page.jpg',
};

const mockServiceBook = {
    findById: jest.fn((id: string): Book => mockBook),
    findAll: jest.fn((): Book[] => [mockBook]),
};

describe('BooksResolver', () => {
    let resolver: BooksResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksResolver, { provide: BooksService, useValue: mockServiceBook }],
        }).compile();

        resolver = module.get<BooksResolver>(BooksResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should query for author by id', ()=> {
        const result = resolver.getBook('1');
        expect(result.id).toEqual(1);
    });

    it('should query for all authors', ()=> {
        const result = resolver.listBooks();
        expect(Array.isArray(result)).toEqual(true);
    });
});
