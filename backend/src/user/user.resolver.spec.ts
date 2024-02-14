import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserResolver', () => {
    let resolver: UserResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserResolver, UserService],
        }).compile();

        resolver = module.get<UserResolver>(UserResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
    it('should query for user by id', ()=> {
        const result = resolver.findOne(1);
        expect(result.id).toEqual(1);
    });

    it('should query for all authors', ()=> {
        const result = resolver.findAll();
        expect(Array.isArray(result)).toEqual(true);
    });
});
