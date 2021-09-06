import express from 'express';
import debug from 'debug';
import { body, validationResult } from 'express-validator';

const log: debug.IDebugger = debug('middlewares:body.validation');

class BodyValidationMiddleware {
  verifyBodyFieldsErrors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log(
        `Validation error [${errors.array().length}]  req : ${JSON.stringify(
          req.body
        )}`
      );
      return res
        .status(400)
        .json({ code: 400, msg: 'Bad Request', error: errors.array() });
    }
    next();
  }

  validationRules() {
    return [
      body('startDate')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('must be a date with YYYY-MM-DD format'),
      body('endDate')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('must be a date with YYYY-MM-DD format'),
      body('endDate')
        .custom((val, { req }) => new Date(val) > new Date(req.body.startDate))
        .withMessage('endDate must be greater than startDate'),
      body('startDate')
        .custom((val, { req }) => new Date(val) < new Date(req.body.endDate))
        .withMessage('startDate must be lower than endDate'),
      body('minCount').isNumeric().withMessage('must be a valid number'),
      body('maxCount').isNumeric().withMessage('must be a valid number'),
      body('minCount')
        .custom((val, { req }) => val < req.body.maxCount)
        .withMessage('minCount must be lower than maxCount'),
      body('maxCount')
        .custom((val, { req }) => val > req.body.minCount)
        .withMessage('maxCount must be greater than minCount')
    ];
  }
}

export default new BodyValidationMiddleware();
