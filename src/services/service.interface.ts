import express from 'express';

export interface ServiceInterface {
  // Retrive records with given params in request body
  findRecords: (
    request: express.Request,
    response: express.Response
  ) => Promise<any>;
}
