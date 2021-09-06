import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import BaseController from '../controllers/base.controller';
import BodyValidationMiddleware from '../middlewares/body.validation.middleware';

export class BaseRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'BaseRoutes');
  }

  configureRoutes(): express.Application {
    // POST
    this.app
      .route('/')
      .post(
        ...BodyValidationMiddleware.validationRules(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        BaseController.findRecords
      );
    return this.app;
  }
}
