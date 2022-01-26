import exp from 'constants';
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

describe('check if the image processing function exists', () => {
  it('check if the function exists', () => {
    expect(ImageService.resizeImage).toBeDefined();
  });
});
