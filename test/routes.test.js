import request from 'supertest';
import app from '../src/app.js';

describe('root', () => {
  it('should render properly', async () => {
    await request(app).get('/').expect(200);
  });
});

describe('animals', () => {
  const giraffe = {name: 'giraffe',
                   home: 'savannah',
                   size: 'big'};
  it('should not find giraffe', async () => {
    await request(app)
      .get('/api/animals/giraffe')
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('should create giraffe', async () => {
    await request(app).post('/api/animals')
      .set('Accept', 'application/json')
      .send(giraffe)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(giraffe);
  });

  it('should get giraffe', async () => {
    await request(app)
      .get('/api/animals/giraffe')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(giraffe);
  });
});

describe('not found', () => {
  it('should 404', async () => {
    await request(app)
      .get('/nothing')
      .expect(404)
      .expect({error: ''});
  });
});
