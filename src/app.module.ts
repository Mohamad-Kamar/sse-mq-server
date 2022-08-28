import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerModule } from './consumer/consumer.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConsumerModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
