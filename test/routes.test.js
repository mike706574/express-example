import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should render properly', async () => {
    await request(app).get('/').expect(200);
  });
});

describe('GET /animals/giraffe', () => {
  it('should render properly with valid parameters', async () => {
    await request(app)
      .get('/animals/giraffe')
      .expect(200);
  });

  it('should not find animal', async () => {
    await request(app).get('/animals/foo').expect(404);
  });
});

describe('GET /404', () => {
  it('should return 404 for non-existent URLs', async () => {
    await request(app).get('/404').expect(404);
    await request(app).get('/notfound').expect(404);
  });
});
