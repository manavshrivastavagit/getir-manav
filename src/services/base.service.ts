import debug from 'debug';
import { Request, Response } from 'express';
import RecordDao from '../dal/records';
import { RequestDal } from '../dal/request';
import { ServiceInterface } from './service.interface';
import { buildRequestDal } from '../utils';

const log: debug.IDebugger = debug('services:base.service');

class BaseService implements ServiceInterface {
  async findRecords(request: Request, response: Response): Promise<any> {
    const requestDal: RequestDal = buildRequestDal(request);

    return RecordDao.findRecords(requestDal)
      .then((res) => {
        log(`Records received [${res.length}]`);
        response.status(200).json({
          code: 0,
          msg: 'Success',
          records: res
        });
      })
      .catch((err) => {
        log(`Error: ${err.message}`);
        response.status(500).json({
          code: 500,
          msg: 'Unable to connect to server!',
          error: err.message
        });
      });
  }
}

export default new BaseService();
