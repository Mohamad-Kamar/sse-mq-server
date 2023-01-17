import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { QueueCollection } from '../Types';

@Injectable()
export class DatabaseService {
  queues: QueueCollection;
  constructor() {
    this.queues = {};
  }
  getQueue(queueKey: string): CreateQueueDto {
    const found: CreateQueueDto = this.queues[queueKey];
    return found;
  }

  addQueue(queueObject: CreateQueueDto): boolean {
    const queueKey = queueObject.queueKey;
    this.queues[queueKey] = queueObject;
    return true;
  }
  reset() {}
}
