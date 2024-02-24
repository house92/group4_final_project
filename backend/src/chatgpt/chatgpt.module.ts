import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/authors/author.entity';
import { BookReview } from 'src/bookreviews/bookreview.entity';
import { OpenAI } from 'openai';

@Module({
    imports: [TypeOrmModule.forFeature([OpenAI])],
})
export class ChatGptModule {}
