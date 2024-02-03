import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserInput } from './inputs/create-user-input';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser({ email, password, firstName, lastName }: CreateUserInput): Promise<User> {
        const passwordhash = await bcrypt.hash(password, 10);

        return this.userRepository.save({
            email,
            passwordhash,
            firstName,
            lastName,
        });
    }

    async findAll() {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }
}
