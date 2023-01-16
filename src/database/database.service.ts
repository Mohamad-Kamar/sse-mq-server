import { Injectable } from '@nestjs/common';
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
  reset() {}
}
