export interface ICarDTO {
  title: string;
  description: string;
  price: string;
  isBooked: boolean;
  images: string[];
}

export interface IRentCarDTO {
  id: string;
  title: string;
  userName: string;
  userContact: string;
}
