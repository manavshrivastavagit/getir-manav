import { Request } from 'express';
import { RequestDal } from '../dal';

export function buildRequestDal(req: Request): RequestDal {
  const { startDate, endDate, minCount, maxCount } = req.body;
  return {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    minCount: Number(minCount),
    maxCount: Number(maxCount)
  };
}
