import mongoose from 'mongoose';
import {Constants} from '../constant'

//db connection settings here.
const MONGO_URI = Constants.MONGO_URI;
console.info(`Listening on port ${Constants.MONGO_PORT}`);
mongoose.connect(MONGO_URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => console.info('Connected to Mongo via Mongoose'));

//connection error message when failed to connect.
mongoose.connection.on('error', (err) => console.error('Unable to connect to Mongo via Mongoose', err));