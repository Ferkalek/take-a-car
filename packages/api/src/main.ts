import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  console.log("MONGO_USER_NAME", process.env.MONGO_USER_NAME);
  console.log("MONGO_PASS", process.env.MONGO_PASS);

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
