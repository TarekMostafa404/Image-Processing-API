import sharp from 'sharp';

class ImageService {
  public static resizeImage(
    fullImagePath: string,
    resizedImagePath: string
  ): Promise<sharp.OutputInfo> {
    return sharp(fullImagePath)
      .resize(400, 400)
      .jpeg()
      .toFile(resizedImagePath);
  }
}

export default ImageService;
