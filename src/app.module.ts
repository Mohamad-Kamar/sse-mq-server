import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { QueueController } from './queue/queue.controller';
import { ConsumerController } from './consumer/consumer.controller';
import { ProducerController } from './producer/producer.controller';
import { ConsumerModule } from './consumer/consumer.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [
    DatabaseModule,
    QueueModule,
    ConsumerModule,
    ProducerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
  ],
  controllers: [AppController, QueueController, ConsumerController, ProducerController],
  providers: [AppService],
})
export class AppModule {}
