import { ICarDTO } from "src/app/shared/interfaces/car.interface";
import { image_1 } from "./imgs/img_1_str";
import { image_2 } from "./imgs/img_2_str";
import { image_3 } from "./imgs/img_3_str";

export const cars: ICarDTO[] = [
  {
    description: "Normal description",
    isBooked: false,
    price: "152.34",
    title: "Mercedes",
    _id: "5f2d7ae36e8d78594a2d75d0",
    images: [image_1, image_3],
  },
  {
    description: "Lorsd sd 3rw losd",
    isBooked: null,
    price: "45.77",
    title: "normal name!!!",
    _id: "5f2d876ac964d259fbe76a37",
    images: [image_2],
  },
  {
    description: "New version of BMW hybid",
    images: [image_3, image_2, image_1],
    isBooked: null,
    price: "234",
    title: "AbraCadabra",
    _id: "5f588e7a6d3bc62c112ab9cb",
  },
];
