import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from 'src/users/user.entity';
import { Book } from 'src/books/book.entity';
import { Author } from 'src/authors/authors.entity';

dotenv.config();

export function generateTypeORMModuleOptions(): DataSourceOptions {
    return {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT) ?? 5432,
        username: 'postgres',
        password: '1234',
        database: process.env.POSTGRES_DATABASE,
        entities: [Book, User, Author],
        synchronize: true,
        migrations: ['dist/migrations/*.js'],
    };
}

export const AppDataSource = new DataSource(generateTypeORMModuleOptions());
