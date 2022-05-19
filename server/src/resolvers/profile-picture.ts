const fs = require("fs");
import { UploadResult } from "../types/Upload";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Resolver, Mutation, Arg } from "type-graphql";
import isArray from "lodash/isArray";

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => UploadResult)
  async addProfilePicture(
    @Arg("file", () => GraphQLUpload) fileInput: FileUpload
  ): Promise<UploadResult> {
    let readableStreams = [];
    if (isArray(fileInput)) {
      readableStreams = await Promise.all(fileInput);
    } else {
      readableStreams[0] = await fileInput;
    }
    const pipedStreams = readableStreams.map((readStreamInstance: any) => {
      const { filename, createReadStream } = readStreamInstance;
      fs.mkdirSync(`./public/images`, { recursive: true });

      const writableStream = fs.createWriteStream(
        `./public/images/${filename}`,
        {
          autoClose: true,
        }
      );

      return new Promise<string>((resolve, reject) => {
        createReadStream()
          .pipe(writableStream)
          .on("error", (error: any) => {
            reject(error);
          })
          .on("finish", () => {
            resolve(filename);
          });
      });
    });
    const results = await Promise.all(pipedStreams);

    return {
      url: `${process.env.URL}/images/${results[0]}`,
    };
  }
}
