import { Injectable } from '@nestjs/common';
import { Author } from './authors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorsInput } from './inputs/create-authors.input';

@Injectable()
export class AuthorsService {
    constructor(@InjectRepository(Author) private repo: Repository<Author>) {}

    findAll() {
        return `This action returns all authors`;
    }

    findById(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    create(input: CreateAuthorsInput) {
        const newAuthor = this.repo.create(input);
        return this.repo.save(newAuthor);
    }
}
