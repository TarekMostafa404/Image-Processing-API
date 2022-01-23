import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test image endpoint', () => {
  it('Test endpoint respond with 200', async () => {
    const response = await request.get('/api?name=fjord.jpg');
    expect(response.status).toBe(200);
  });

  it('Test endpoint respond with 404', async () => {
    const response = await request.get('/api?name=zzzzzzzzz.jpg');
    expect(response.status).toBe(404);
  });

});
