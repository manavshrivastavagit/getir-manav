import debug from 'debug';
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import { BaseRoutes } from './src/routes/base.routes';
const log: debug.IDebugger = debug('app');
import swaggerUi from 'swagger-ui-express';
import fs = require('fs');

class App {
  public app: express.Application;

  public port: number = Number(process.env.PORT || 4000);
  public server: http.Server;

  private serverMessage = `Server running at http://localhost:${this.port}`;

   /* Swagger files start */
   private swaggerFile: any = ("./src/openAPI/swagger.json");
   private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
   private swaggerDocument = JSON.parse(this.swaggerData);
   /* Swagger files end */

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.app.use(express.json());

    // handling CORS Requests
    this.app.use(cors());

    // swagger docs
    this.app.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(this.swaggerDocument));

    // Routes
    log(new BaseRoutes(this.app).getName() + ' registered');

     // handling undefined routes
     this.app.use("*", (req, res, next) => {
      res.status(404).send("Make sure url is correct!");
  });
  }

  public getApp() {
    return this.app;
  }

  public listen() {
    return this.server.listen(this.port, () => {
      console.log(this.serverMessage);
    });
  }

  public close() {
    return this.server.close();
  }
}

export default new App();
