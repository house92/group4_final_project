import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:8000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Authentication'],
        credentials: true,
    });

    const authGuard: AuthGuard = app.get(AuthGuard);
    app.useGlobalGuards(authGuard);

    await app.listen(3000);
}
bootstrap();
