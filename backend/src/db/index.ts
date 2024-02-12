import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { UserAuth } from 'src/user-auths/user-auth.entity';
import { Book } from 'src/books/book.entity';
import { Author } from 'src/authors/author.entity';
import { User } from 'src/user/user.entity';

dotenv.config();

export function generateTypeORMModuleOptions(): DataSourceOptions {
    return {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT) ?? 5432,
        username: 'postgres',
        password: '1234',
        database: process.env.POSTGRES_DATABASE,
        entities: [Book, UserAuth, User, Author],
        synchronize: true,
        migrations: ['dist/migrations/*.js'],
        logging: true,
    };
}

export const AppDataSource = new DataSource(generateTypeORMModuleOptions());
