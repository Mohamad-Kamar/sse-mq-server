import { Injectable } from '@nestjs/common';
import { IQueue } from '../queue/entities/IQueue';
import { QueueCollection } from '../Types';

@Injectable()
export class DatabaseService {
  queues: QueueCollection;
  constructor() {
    this.queues = {};
  }
  getQueue(queueKey: string): IQueue {
    const found: IQueue = this.queues[queueKey];
    return found;
  }

  addQueue(queueObject: IQueue): boolean {
    const queueKey = queueObject.queueDetails.queueKey;
    this.queues[queueKey] = queueObject;
    return true;
  }
  reset() {}
}
