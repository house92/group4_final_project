import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
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

    it('should get all users', () => {
        const result = service.findAll();
        expect(result.length).toEqual([service['users'].length]);
    });
});
