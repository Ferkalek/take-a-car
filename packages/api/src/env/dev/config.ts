import * as dotenv from "dotenv";
dotenv.config();

export default {
  mongoURL: `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASS}@cluster0-4fmlh.mongodb.net/takeacar?retryWrites=true&w=majority`,
  sendGridApiKey: process.env.SENDGRID_API_KEY,
};
