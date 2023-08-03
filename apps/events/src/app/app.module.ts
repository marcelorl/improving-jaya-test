import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Issue, IssueSchema } from '../schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/jaya'),
    MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }]),
    ClientsModule.register([
      {
        name: 'EVENT_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'event',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'event-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
