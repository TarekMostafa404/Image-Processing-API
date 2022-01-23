import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('gets the home endpoint', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(200);
    // done();
  });
});
