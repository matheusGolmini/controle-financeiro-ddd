import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from '@infra/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/finance_api'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.ggl'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
