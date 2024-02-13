import { Test, TestingModule } from '@nestjs/testing';
import { Author } from './author.entity';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';

const mockAuthor: Author = {
    id: '1',
    firstName: 'Mary',
    lastName: 'Shelley',
    dateOfBirth: '08-30-1787',
};

const mockServiceAuthor = {
    findById: jest.fn((id: string): Author => mockAuthor),
    findAll: jest.fn((): Author[] => [mockAuthor]),
};

describe('AuthorsResolver', () => {
    let resolver: AuthorsResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthorsResolver, { provide: AuthorsService, useValue: mockServiceAuthor }],
        }).compile();

        resolver = module.get<AuthorsResolver>(AuthorsResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should query for author by id', ()=> {
        const result = resolver.getAuthor('1');
        expect(result.id).toEqual(1);
    });

    it('should query for all authors', ()=> {
        const result = resolver.listAuthors();
        expect(Array.isArray(result)).toEqual(true);
    });
});
