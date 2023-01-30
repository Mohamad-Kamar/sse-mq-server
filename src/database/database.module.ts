import { Module, Global } from '@nestjs/common';
import { DatabaseService as DatabaseServiceClass } from './database.service';
import { DatabaseController } from './database.controller';

const DatabaseService = {
  provide: DatabaseServiceClass,
  useFactory: async () => {
    const db = new DatabaseServiceClass();
    await db.loadStorage();
    return db;
  },
};

@Global()
@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
