import debug from 'debug';

import { RequestDal, RecordDal } from '.';
import Record from '../models/record.model';

const log: debug.IDebugger = debug('records');

class Records {
  constructor() {
    log('Created new instance of RecordDal');
  }

  async findRecords(query: RequestDal): Promise<RecordDal[]> {
    return Record.aggregate([
      {
        $match: {
          createdAt: {
            $gte: query.startDate,
            $lt: query.endDate
          }
        }
      },
      {
        $addFields: {
          totalCount: {
            $reduce: {
              input: '$counts',
              initialValue: 0,
              in: { $add: ['$$value', '$$this'] }
            }
          }
        }
      },
      {
        $match: {
          totalCount: {
            $gte: query.minCount,
            $lt: query.maxCount
          }
        }
      }
    ]).project({ key: 1, createdAt: 1, totalCount: 1, _id: 0 });
  }
}

export default new Records();
