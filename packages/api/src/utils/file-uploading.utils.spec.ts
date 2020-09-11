import { imageFileFilter } from "./file-uploading.utils";

describe("FileUploadUtilits", () => {
  describe("imageFileFilter", () => {
    it("Test 1: should be true when name.png", async () => {
      await new Promise((r) =>
        imageFileFilter(
          null,
          {
            originalname: "name.png",
          } as any,
          (err, result) => {
            expect(result).toBeTruthy();
            r();
          }
        )
      );
    });

    it("Test 2: should be false when pass file.exe", async () => {
      await new Promise((r) =>
        imageFileFilter(
          null,
          {
            originalname: "file.exe",
          } as any,
          (err, result) => {
            expect(result).toBeFalsy();
            r();
          }
        )
      );
    });
  });
});
