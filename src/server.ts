import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function server() {
  try {
    await mongoose.connect(config.mongodb_url as string);

    console.log('Database is connected');

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();
