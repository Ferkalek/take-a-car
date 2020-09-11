import * as path from "path";
import * as fs from "fs";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const pathToSrc = path.resolve("./src");
// export const pathToSrc = path.dirname(process.mainModule.filename);

export const imageFileFilter: MulterOptions["fileFilter"] = (
  req,
  file,
  callback
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

export const getImgAsString = (imgPath) => {
  const pathToUpload = path.join(pathToSrc, "../uploads", imgPath);
  return new Promise<string>((resolv, reject) =>
    fs.readFile(pathToUpload, "base64", (err, str) => {
      if (err) {
        reject(err);
      } else {
        fs.unlink(pathToUpload, (e) => {
          if (e) {
            console.error(e);
          }
        });
        resolv(String(str));
      }
    })
  );
};
