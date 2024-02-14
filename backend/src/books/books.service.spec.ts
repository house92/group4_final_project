import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';

describe('BooksService', () => {
    let service: BooksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksService],
        }).compile();

        service = module.get<BooksService>(BooksService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find all for id', () => {
        const result = service.findAll();
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: '1',
                }),
            ]),
        );
    });

    it('should get all authors', () => {
        const result = service.findAll();
        expect(result.length).toEqual([service['books'].length]);
    });
});
