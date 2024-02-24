import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserAuth } from './user-auth.entity';
import { CreateUserAuthInput } from './inputs/create-user-auth-input';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(UserAuth)
        private readonly userRepository: Repository<UserAuth>,
    ) {}

    async createUser({ email, password }: CreateUserAuthInput): Promise<UserAuth> {
        const passwordhash = await bcrypt.hash(password, 10);

        return this.userRepository.save({
            email,
            passwordhash,
        });
    }

    async findAll() {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<UserAuth | null> {
        return this.userRepository.findOneBy({ id });
    }

    async findByEmail(email: string, relations: FindOneOptions<UserAuth>['relations'] = {}): Promise<UserAuth | null> {
        return this.userRepository.findOne({ where: { email }, relations });
    }
}
