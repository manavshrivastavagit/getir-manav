import express from 'express';

import BaseService from '../services/base.service';

class BaseController {
  // Find records with given query parameters
  async findRecords(request: express.Request, response: express.Response) {
    return BaseService.findRecords(request, response);
  }
}

export default new BaseController();
