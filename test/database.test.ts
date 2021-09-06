import '../src/config/environment';
import RecordRepository from '../src/dal/records';
import MongooseService from '../src/config/mongo';

beforeAll(async () => {
  await MongooseService.retry();
});

afterAll(async () => {
  await MongooseService.disconnectDB();
});

describe('Data - Records Test', () => {
  it('should return empty response from mongo', async () => {
    const res = await RecordRepository.findRecords({
      startDate: new Date('1991-01-01'),
      endDate: new Date('1992-01-01'),
      minCount: 1000,
      maxCount: 5000
    });

    expect(res).toEqual([]);
  });

  it('should return existing records from mongo', async () => {
    const res = await RecordRepository.findRecords({
      startDate: new Date('2016-01-01'),
      endDate: new Date('2017-01-01'),
      minCount: 1000,
      maxCount: 2000
    });

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: expect.any(String),
          createdAt: expect.any(Date),
          totalCount: expect.any(Number)
        })
      ])
    );
  });
});
