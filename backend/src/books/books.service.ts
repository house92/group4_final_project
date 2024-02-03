import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './inputs/create-book.input';
import { UpdateBookInput } from './inputs/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

    findAll() {
        return `This action returns all books`;
    }

    findById(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    create(input: CreateBookInput) {
        const newBook = this.repo.create(input);
        return this.repo.save(newBook);
    }

    update(id: number, input: UpdateBookInput) {
        return `This action updates a #${id} book`;
    }

    remove(id: number) {
        return `This action removes a #${id} book`;
    }
}
