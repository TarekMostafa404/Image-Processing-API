import supertest from 'supertest';
import app from '../index';
import ImageService from '../services/ImageService';

const request = supertest(app);

describe('Test image endpoint', () => {
  it('Test endpoint respond with 200', async () => {
    const response = await request.get(
      '/api?name=fjord.jpg&width=400&height=400'
    );
    expect(response.status).toBe(200);
  });

  it('Test endpoint respond with 400 - invalid width', async () => {
    const response = await request.get(
      '/api?name=fjord.jpg&width=0&height=400'
    );
    expect(response.status).toBe(400);
  });

  it('Test endpoint respond with 400 - invalid height', async () => {
    const response = await request.get(
      '/api?name=fjord.jpg&width=400&height=0'
    );
    expect(response.status).toBe(400);
  });

  it('Test endpoint respond with 404 - invalid image name', async () => {
    const response = await request.get(
      '/api?name=zzzzzzzzz.jpg&width=300&height=400'
    );
    expect(response.status).toBe(404);
  });
});

describe('Test image processing working', () => {
  it('Test if the function exists', () => {
    expect(ImageService.resizeImage).toBeDefined();
  });

  it('Test if the function works', async () => {
    const width = 300;
    const height = 300;

    const result = await ImageService.resizeImage(
      `${__dirname}/../../assets/fullImages/fjord.jpg`,
      `${__dirname}/../../assets/resizedImages/${width}_${height}_fjord.jpg`,
      width,
      height
    );
    expect(result.width === width && result.height === height).toBe(true);
  });
});
