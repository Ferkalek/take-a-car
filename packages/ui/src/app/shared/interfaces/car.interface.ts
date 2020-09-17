export interface ICarDTO {
  _id?: string;
  isBooked: boolean;
  title: string;
  description: string;
  price: string;
  images: string[];
}

export interface IDataFromCar {
  title: string;
  id: string;
}

export interface IRentCarDTO extends IDataFromCar {
  userName: string;
  userContact: string;
}
