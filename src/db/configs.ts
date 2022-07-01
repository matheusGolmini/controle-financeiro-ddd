import { MongooseModuleOptions } from '@nestjs/mongoose';

export const MongoDbConfig: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'finance_db',
};

/*mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}*/
export const MongoURI = 'mongodb://root:mongo@localhost:27017';
