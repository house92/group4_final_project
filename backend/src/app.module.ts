import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserAuthModule } from './user-auths/user-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateTypeORMModuleOptions } from './db';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { UserModule } from './user/user.module';

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
    ],
    exports: [],
})
export class AppModule {}
