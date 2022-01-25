import express from 'express';
import { Request, Response } from 'express';
import fs from 'fs';
import ImageService from '../services/ImageService';
import Utilities from '../services/utilities';

const routes = express.Router();

const fullImagesDir = `${__dirname}/../../assets/fullImages/`;
const resizedImagesDir = `${__dirname}/../../assets/resizedImages/`;

routes.get('/api', async (req: Request, res: Response) => {
  if (isNaN(Number(req.query.width)) || isNaN(Number(req.query.height))) {
    res.status(400).send('invalid dimension values');
  }
  const imageWidth: number = parseInt((req.query.width || '0').toString());
  const imageHeight: number = parseInt((req.query.height || '0').toString());
  const imageName = `${req.query.name}`;

  if (imageWidth === 0 || imageHeight === 0) {
    res.status(400).send('invalid dimention values');
    return;
  }
  const fullImagePath = `${fullImagesDir}${imageName}`;
  const resizedImagePath = `${resizedImagesDir}${imageWidth}_${imageHeight}_${imageName}`;

  if (await Utilities.fileExists(resizedImagePath)) {
    fs.readFile(
      resizedImagePath,
      (err: NodeJS.ErrnoException | null, data: Buffer) => {
        res.type('image/jpg').send(data);
      }
    );
  } else if (!(await Utilities.fileExists(fullImagePath))) {
    res.status(404).send('File Not Found!');
  } else {
    if (!(await Utilities.fileExists(resizedImagesDir))) {
      fs.mkdirSync(resizedImagesDir, { recursive: true });
    }
    ImageService.resizeImage(
      fullImagePath,
      resizedImagePath,
      imageWidth,
      imageHeight
    )
      .then(() => {
        fs.readFile(resizedImagePath, (err, data) => {
          res.type('image/jpg').send(data);
          console.log(resizedImagePath);
          console.log(err);
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

export default routes;
