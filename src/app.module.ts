import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from '@infra/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MongoDbConfig, MongoURI } from 'db/configs';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(MongoURI, MongoDbConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.ggl'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
