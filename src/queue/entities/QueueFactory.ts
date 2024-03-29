import { CreateQueueDto } from '../../queue/dto/create-queue.dto';
import { QueueConstructableClass } from '../../Types';
import { IQueue } from './IQueue';
import { QueueClassMapping } from './QueueHelpers';

export class QueueFactory {
  static createQueue(queueDetails: CreateQueueDto): IQueue {
    const { queueKey, queueType } = queueDetails;
    const queueClass: QueueConstructableClass = QueueClassMapping[queueType];
    return new queueClass(queueKey, queueType);
  }
}
