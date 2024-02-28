import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { UserAuth } from 'src/user-auth/user-auth.entity';
import { Book } from 'src/books/book.entity';
import { Author } from 'src/authors/author.entity';
import { User } from 'src/user/user.entity';
import { BookReview } from 'src/bookreviews/bookreview.entity';

dotenv.config();

export function generateTypeORMModuleOptions(): DataSourceOptions {
    return {
        type: 'postgres',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'postgres',
        entities: [Book, UserAuth, User, Author, BookReview],
        synchronize: true,
        migrations: ['dist/migrations/*.js'],
        logging: true,
    };
}

export const AppDataSource = new DataSource(generateTypeORMModuleOptions());
