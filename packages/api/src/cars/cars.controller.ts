import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { ICarDTO } from "./car.interface";
import { FilesInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, getImgAsString } from "../utils/file-uploading.utils";

@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  findAll(): Promise<ICarDTO[]> {
    return this.carsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<ICarDTO> {
    return this.carsService.findOne(id);
  }

  @Post("create")
  @UseInterceptors(
    FilesInterceptor("files[]", 5, {
      fileFilter: imageFileFilter,
      limits: {
        fieldSize: 1 * 1024 * 1024, // 1 MB (max file size)
      },
    })
  )
  async create(@UploadedFiles() images: any[], @Body() car) {
    const imgs = await Promise.all(
      images.map((img) => getImgAsString(img.filename))
    );

    const { title, description, price } = car;
    const carItem = {
      title,
      description,
      price,
      isBooked: false,
      images: imgs,
    };
    return this.carsService.create(carItem);
  }

  @Put("edit/:id")
  @UseInterceptors(
    FilesInterceptor("files[]", 5, {
      fileFilter: imageFileFilter,
      limits: {
        fieldSize: 1 * 1024 * 1024,
      },
    })
  )
  async update(
    @Param("id") id: string,
    @UploadedFiles() newImages: any[],
    @Body() car
  ): Promise<ICarDTO> {
    const existImgs = [];

    for (let key in car) {
      if (key.indexOf("image_") !== -1) {
        existImgs.push(car[key]);
      }
    }

    const imgs = await Promise.all(
      newImages.map((img) => getImgAsString(img.filename))
    );

    const { title, description, price, isBooked } = car;
    const carItem = {
      title,
      description,
      price,
      isBooked,
      images: [...existImgs, ...imgs],
    };
    return this.carsService.update(id, carItem);
  }

  @Put("update-status/:id")
  updateStatus(
    @Param("id") id: string,
    @Body() car: ICarDTO
  ): Promise<ICarDTO> {
    return this.carsService.update(id, car);
  }

  @Delete(":id")
  delete(@Param() param): Promise<ICarDTO> {
    return this.carsService.delete(param.id);
  }
}
