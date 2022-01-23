import express from 'express';
import fs from 'fs';
import ImageService from '../../services/ImageService';

const routes = express.Router();

const fullImagesDir = `${__dirname}/fullImages/`;
const resizedImagesDir = `${__dirname}/resizedImages/`;

routes.get('/image', (req, res) => {
  const imageName = `${req.query.name}`;
  const fullImagePath = `${fullImagesDir}${imageName}`;
  const resizedImagePath = `${resizedImagesDir}${imageName}`;

  if (fs.existsSync(resizedImagePath)) {
    res.sendFile(resizedImagePath);
  } else if (!fs.existsSync(fullImagePath)) {
    res.send('Image Not Found');
  } else {
    ImageService.resizeImage(fullImagePath, resizedImagePath)
      .then((_data) => {
        res.sendFile(resizedImagePath);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

export default routes;
