import sharp from "sharp";

class ImageService {
  public static resizeImage(fullImagePath: string, resizedImagePath: string): Promise<sharp.OutputInfo> {
    return sharp(fullImagePath)
      .resize(200, 200)
      .jpeg()
      .toFile(resizedImagePath);
  }
}

export default ImageService;
