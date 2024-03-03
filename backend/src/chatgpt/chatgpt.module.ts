import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAI } from 'openai';
import { ChatGptResolver } from './chatgpt.resolver';
import { ChatGptService } from './chatgpt.service';

@Module({
    imports: [TypeOrmModule.forFeature([OpenAI])],
    providers: [ChatGptResolver, ChatGptService],

})
export class ChatGptModule {}
