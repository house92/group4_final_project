import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateTypeORMModuleOptions } from './db';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BooksModule } from './books/books.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),
        TypeOrmModule.forRoot(generateTypeORMModuleOptions()),
        BooksModule,
    ],
    providers: [],
    exports: [],
})
export class AppModule {}
