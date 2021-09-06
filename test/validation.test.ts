import app from '../app';
import supertest from 'supertest';

describe('Validation Tests', () => {
  afterAll(() => {
    app.close();
  });

  it('should not allowed to get / route', async () => {
    const res = await supertest(app.getApp()).get('/');

    expect(res.status).toBe(404);
  });

  it('should receive 400 error if request is empty', (done) => {
    supertest(app.getApp())
      .post('/')
      .send({})
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            code: 400,
            msg: 'Bad Request'
          })
        );
        done();
      });
  });

  it('should receive 400 error if request invalid', (done) => {
    supertest(app.getApp())
      .post('/')
      .send({
        startDate: '2015-01-22',
        endDate: '2015-01-2w3',
        minCount: 'two',
        maxCount: 'three'
      })
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            code: 400,
            msg: 'Bad Request'
          })
        );
        done();
      });
  });
});
