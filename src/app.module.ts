import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerModule } from './consumer/consumer.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [ConsumerModule, ProducerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
