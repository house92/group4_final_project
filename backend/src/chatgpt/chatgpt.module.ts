import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAI } from 'openai';

@Module({
    imports: [TypeOrmModule.forFeature([OpenAI])],
})
export class ChatGptModule {}
