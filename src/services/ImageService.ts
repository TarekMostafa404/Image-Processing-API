import sharp from 'sharp';

class ImageService {
  public static resizeImage(
    fullImagePath: string,
    resizedImagePath: string,
    width: number,
    height: number
  ): Promise<sharp.OutputInfo> {
    return sharp(fullImagePath)
      .resize(width, height)
      .jpeg()
      .toFile(resizedImagePath);
  }
}

export default ImageService;
