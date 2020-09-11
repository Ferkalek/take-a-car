import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // delete these
  // app.use(bodyParser.json({ limit: "50mb" }));
  // app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
