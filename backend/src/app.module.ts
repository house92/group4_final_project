import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateTypeORMModuleOptions } from './db';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { UserModule } from './user/user.module';
import { BookReviewsModule } from './bookreviews/bookreviews.module';
import { ChatGptModule } from './chatgpt/chatgpt.module';

@Module({
    imports: [
        AuthModule,
        UserAuthModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),
        TypeOrmModule.forRoot(generateTypeORMModuleOptions()),
        BooksModule,
        AuthorsModule,
        UserModule,
        BookReviewsModule,
        ChatGptModule,
    ],
    exports: [],
})
export class AppModule {}
