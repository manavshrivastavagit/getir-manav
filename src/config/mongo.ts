import mongoose from 'mongoose';
import debug from 'debug';
const log: debug.IDebugger = debug('config:mongodb');

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 2000,
    useFindAndModify: false
  };

  constructor() {
    log('mongoose ready to connect');
  }

  getMongoose() {
    return mongoose;
  }

  retry = async () => {
    log(`MongoDB Connection String is : ${process.env.MONGODB_CONNECTION}`);
    log('Connecting MongoDB...');
    await mongoose
      .connect(process.env.MONGODB_CONNECTION || '', this.mongooseOptions)
      .then(() => {
        log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 1;
        log(
          `MongoDB connection unsuccessful retrying ${++this
            .count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.retry, retrySeconds * 1000);
      });
  };

  disconnectDB = async () => {
    return this.getMongoose().disconnect();
  };
}
export default new MongooseService();
