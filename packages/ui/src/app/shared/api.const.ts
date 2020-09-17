import { environment } from "../../environments/environment";

const BASE_URL = environment.baseUrl;
const CARS = `${BASE_URL}/cars`;

export const API_PATH = {
  CARS: `${CARS}`,
  CREATE: `${CARS}/create`,
  UPDATE_STATUS: `${CARS}/update-status`,
  EDIT: `${CARS}/edit`,
  SEND_EMAIL: `${CARS}/sendemail`,
};
