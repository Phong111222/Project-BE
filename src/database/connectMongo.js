import mongoose from 'mongoose';

class ConnectMongo {
  constructor() {
    this.gfs = null;
  }
  static getConnect() {
    mongoose
      .connect('mongodb://127.0.0.1:27017/social', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('DB connected');
      })
      .catch((err) => console.log(err));
    // const connect = mongoose.connection;
    // connect.once('open', () => {
    //   console.log(process.env.URI);
    //   console.log('DB is connected');
    //   this.gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    //     bucketName: process.env.MONGO_BUCKET,
    //   });
    // });
  }
}

export default ConnectMongo;
