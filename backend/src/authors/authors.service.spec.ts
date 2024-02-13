import { Test, TestingModule } from '@nestjs/testing';
import { Author } from './author.entity';
import { AuthorsService } from './authors.service';
import { mock } from 'node:test';

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

    it('should find all for id', ()=> {
       const result = service.findAll();
       expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: '1',
            }),
        ]),
       );
    });

    it('should get all authors', ()=> {
        const result = service.findAll();
        expect(result.length).toEqual([service['posts'].length]);
    })

});
