import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';
import { IQueue } from '../queue/entities/IQueue';
import { DBQueues, DBQueue } from '../Types';

@Injectable()
export class DatabaseService {
  queues: DBQueues;
  getQueue(queueKey: string): DBQueue {
    const found: DBQueue = this.queues[queueKey];
    return found;
  }

  addQueue(queueObject: IQueue): DBQueue {
    const addedID = uuidv4();
    const newQueue: DBQueue = {
      queueID: addedID,
      queue: queueObject,
    };
    this.queues[queueObject.queueDetails.queueKey] = newQueue;
    return newQueue;
  }

  create(createDatabaseDto: CreateDatabaseDto) {
    return 'This action adds a new database';
  }

  findAll() {
    return `This action returns all database`;
  }

  findOne(id: number) {
    return `This action returns a #${id} database`;
  }

  update(id: number, updateDatabaseDto: UpdateDatabaseDto) {
    return `This action updates a #${id} database`;
  }

  remove(id: number) {
    return `This action removes a #${id} database`;
  }
}
