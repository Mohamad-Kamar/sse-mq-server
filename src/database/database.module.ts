import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Module({
  controllers: [DatabaseController],
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
