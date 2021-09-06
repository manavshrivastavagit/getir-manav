import './src/config';
import mongo from './src/config/mongo';
import app from './app';

export default mongo.retry().then(() => app.listen());
