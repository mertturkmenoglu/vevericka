import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV === "development") {
        callback(null, true);
        return;
      }
      const prodRegex = "^https:\\/\\/vevericka\\.vercel\\.app$";
      const isValid = new RegExp(prodRegex, "i").test(origin);
      callback(null, isValid);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);

  if (process.env.NODE_ENV !== "development") {
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
  }
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
