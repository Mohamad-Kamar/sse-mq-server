import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Global()
@Module({
  controllers: [DatabaseController],
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
