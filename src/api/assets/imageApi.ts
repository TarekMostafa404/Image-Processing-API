import express from 'express';
import fs from 'fs';
import ImageService from '../../services/ImageService';

const routes = express.Router();

const fullImagesDir = `${__dirname}/fullImages/`;
const resizedImagesDir = `${__dirname}/resizedImages/`;

routes.get('/api', (req, res) => {
  const imageName = `${req.query.name}`;
  const fullImagePath = `${fullImagesDir}${imageName}`;
  const resizedImagePath = `${resizedImagesDir}${imageName}`;

  if (fs.existsSync(resizedImagePath)) {
    res.status(200).sendFile(resizedImagePath);
  } else if (!fs.existsSync(fullImagePath)) {

    res.status(404).send(fullImagePath);
  } else {
    if (!fs.existsSync(resizedImagePath)) {
      fs.mkdirSync(resizedImagePath,{recursive: true});
    }
    ImageService.resizeImage(fullImagePath, resizedImagePath)
      .then(() => {
        res.sendFile(resizedImagePath);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

export default routes;
