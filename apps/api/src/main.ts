import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Routing Prefix: /api/v1
  app.setGlobalPrefix('api/v1');

  // Enable Cross-Origin Resource Sharing (CORS) for Frontend
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global DTO Validation Pipe with transformation & whitelist filtering
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Swagger / OpenAPI Specification
  const config = new DocumentBuilder()
    .setTitle('TIE PropTech API')
    .setDescription(
      'Modular Architecture, Home Configuration & Construction Tracking Platform API.\n\n' +
        'Visually & architecturally inspired by Huts.com Warm Editorial Minimalism.\n\n' +
        'Core Endpoints:\n' +
        '- Catalog: Housing Solutions (8 use-cases), Standard Plans (8 modular designs with dual-image assets), and Realized Portfolio Projects.\n' +
        '- Estimator: Stateless Pro-Forma calculation engine and PostgreSQL JSONB estimate storage.\n' +
        '- Field Reports: 6-stage construction progress tracker (Site Analysis -> Budget & Program -> Standard Selection -> Custom Modification -> Permitting -> Construction) with budget variance metrics.'
    )
    .setVersion('1.0.0')
    .addTag('Catalog (Solutions, Standards & Portfolio)', 'Architectural housing solutions, pre-engineered standards, and realized case studies')
    .addTag('Estimator (Pro-Forma Calculation & Configuration Engine)', 'Stateless construction pro-forma calculator and JSONB brief submissions')
    .addTag('Field Reports (6-Stage Construction Progress Tracker)', 'Client-facing 6-stage construction milestone tracker with budget variance metrics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'TIE PropTech API — Swagger Documentation',
    customCss: `
      .topbar { background-color: #2C4A3E !important; }
      .swagger-ui .topbar .topbar-wrapper a span { color: #F7F5F0 !important; font-family: "Plus Jakarta Sans", sans-serif; font-weight: 700; }
      .swagger-ui { background-color: #F7F5F0; }
      .swagger-ui .opblock.opblock-post { border-color: #2C4A3E; background: rgba(44, 74, 62, 0.05); }
      .swagger-ui .opblock.opblock-get { border-color: #D46A43; background: rgba(212, 106, 67, 0.05); }
    `,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`====================================================`);
  console.log(`🌲 TIE PropTech API is running on: http://localhost:${port}/api/v1`);
  console.log(`📐 Interactive Swagger UI is available at: http://localhost:${port}/api/docs`);
  console.log(`====================================================`);
}

bootstrap();
