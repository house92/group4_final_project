import { Test, TestingModule } from '@nestjs/testing';
import { Author } from './author.entity';
import { AuthorsService } from './authors.service';
import { mock } from 'node:test';
import { CreateAuthorInput } from './inputs/create-author.input';

describe('AuthorsService', () => {
    let service: AuthorsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthorsService],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find all for authors', () => {
        const result = service.findAll();
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
    });

    it('should find author by id', async () => {
        const authorId = '1';
        const result = service.findById(authorId);
        expect(result).toBeDefined();
        expect((await result).id).toBe(authorId);
    });

    it('should create a new author', () => {
        const CreateAuthorInput: Author = {
            id: '1',
            firstName: 'Mary',
            lastName: 'Shelley',
            dateOfBirth: '01-01-1800',
        };
        const createdAuthor = service.create(CreateAuthorInput);
        expect(createdAuthor).toEqual(CreateAuthorInput);
    });

    it('should update an existing author', () => {
        const existingAuthor: Author = { id: '1', firstName: 'Mary', lastName: 'Shelley', dateOfBirth: '01-01-1800' };
        const updatedAuthorData = { firstName: 'William Shakespeare' };

        service.create(existingAuthor);

        const UpdateAuthorInput = service.update('1', updatedAuthorData);

        expect(UpdateAuthorInput).toEqual({ existingAuthor, updatedAuthorData });
    });
});
