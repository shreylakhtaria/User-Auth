import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { join } from 'path';

// here module is a decorator function that takes an object as an argument
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://shreylakhatariacode:pSjpnYP0SIejA67U@cluster0.ikzkwv8.mongodb.net/user-auth',
    ),
    UserModule,
  ],
})
export class AppModule {}
