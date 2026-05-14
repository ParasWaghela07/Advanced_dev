import cloudinary
from "../config/cloudinary.js";

export const uploadImageService =
async (fileBuffer) => {

  return new Promise(
    (resolve, reject) => {

      const stream =
        cloudinary.uploader.upload_stream(

          {
            folder: "adv-dev"
          },

          (error, result) => {

            if (error) {

              reject(error);

            } else {

              resolve(result);

            }

          }

        );

      stream.end(fileBuffer);

    }
  );

};