import { environment } from "../../environments/environment.prod";

const BASIC_URL = environment.basicUrl;

export const API_PATH = {
  GET_FILE: BASIC_URL + "file-worker",
  CARS: BASIC_URL + "/cars",
};
