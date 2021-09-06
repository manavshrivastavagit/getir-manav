import { Schema, model } from 'mongoose';

const recordSchema: Schema = new Schema({
  key: String,
  createdAt: Date,
  counts: [Number],
  value: String
});

const Record = model('Record', recordSchema);

export default Record;
