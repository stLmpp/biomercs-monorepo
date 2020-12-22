import './app/polyfills/polyfills';
import './app/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './app/environment/environment';
import * as helmet from 'helmet';
import * as expressRateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ValidationModule } from './app/validation/validation.module';
import { registerRequestContext } from './app/async-hooks';
import { AUTH_USER_CONTEXT_TOKEN } from './app/auth/auth-user-context-token';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  useContainer(app.select(ValidationModule), { fallbackOnErrors: true });

  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));
  app.useGlobalInterceptors(
    registerRequestContext(AUTH_USER_CONTEXT_TOKEN, context => context.switchToHttp().getRequest().user)
  );

  if (!environment.production) {
    app.enableCors();
    const options = new DocumentBuilder()
      .setTitle('Api')
      .setVersion('1.0')
      .addBearerAuth({
        scheme: 'bearer',
        type: 'http',
        bearerFormat: 'JWT',
      })
      .build();
    const document = SwaggerModule.createDocument(app, options, {});
    SwaggerModule.setup('help', app, document, {
      customCss: `.swagger-ui .scheme-container { position: sticky; top: 0; z-index: 1; margin-bottom: 0; padding: 0.25rem 0; }`,
    });
  } else {
    app.use(
      expressRateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
      })
    );
  }

  await app.listen(environment.port, environment.host);
}

bootstrap()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('API initialized!');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
