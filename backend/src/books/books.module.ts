import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [BooksResolver, BooksService],
})
export class BooksModule {}
