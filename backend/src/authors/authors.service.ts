import { Injectable } from '@nestjs/common';
import { Author } from './authors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorsInput } from './inputs/create-authors.input';
import { UpdateAuthorInput } from './inputs/update-authors.input';


@Injectable()
export class AuthorsService {
    constructor(@InjectRepository(Author) private repo: Repository<Author>) {}

    findAll() {
        return this.repo.find();
    }

    findById(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    create(input: CreateAuthorsInput) {
        const newAuthor = this.repo.create(input);
        return this.repo.save(newAuthor);
    }
    update(id: string, input: UpdateAuthorInput) {
        const unchangedAuthor = this.repo.findOne({ where: { id } });
        if (!unchangedAuthor) {
            throw new Error(`Author with ID ${id} not found`);
        }
        const updatedAuthor = Object.assign(unchangedAuthor, input);
        return this.repo.save(updatedAuthor);
        
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
