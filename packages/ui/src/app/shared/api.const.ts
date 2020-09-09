import { environment } from "../../environments/environment.prod";

const BASE_URL = environment.baseUrl;
const CARS = `${BASE_URL}/cars`;

export const API_PATH = {
  CARS: `${CARS}`,
  CREATE: `${CARS}/create`,
  UPDATE_STATUS: `${CARS}/update-status`,
  EDIT: `${CARS}/edit`,
};
