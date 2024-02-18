import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserAuth } from 'src/user-auth/user-auth.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        @InjectRepository(User) private userAuthRepo: Repository<UserAuth>,
    ) {}

    async create(_input: CreateUserInput, _userAuth?: UserAuth): Promise<User> {
        const { userAuthId, ...input } = _input;
        let userAuth = _userAuth;

        if (!userAuth) {
            userAuth = await this.userAuthRepo.findOne({ where: { id: userAuthId } });
        }

        if (!userAuth) {
            throw new Error(`UserService::create() - cannot find user auth with id: ${userAuthId}`);
        }

        const user = await this.repo.save({
            ...input,
            userAuth,
        });

        return user;
    }

    findAll() {
        return `This action returns all user`;
    }

    findById(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    update(input: UpdateUserInput) {
        return `This action updates a #${input.id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
