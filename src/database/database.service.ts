import { Injectable } from '@nestjs/common';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';
import { IQueue } from '../queue/entities/IQueue';
import { DBQueues, DBQueue } from '../Types';

@Injectable()
export class DatabaseService {
  queues: DBQueues;
  constructor() {
    this.queues = {};
  }
  getQueue(queueKey: string): DBQueue {
    const found: DBQueue = this.queues[queueKey];
    return found;
  }

  addQueue(queueObject: IQueue): DBQueue {
    const queueKey = queueObject.queueDetails.queueKey;
    const newQueue: DBQueue = {
      queue: queueObject,
      queueKey,
    };
    this.queues[queueKey] = newQueue;
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
