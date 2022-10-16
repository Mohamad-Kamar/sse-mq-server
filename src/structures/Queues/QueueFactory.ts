import { QueueConstructableClass } from 'src/Types';
import { CreateQueueDto } from '../../queue/dto/create-queue.dto';
import { IQueue } from './IQueue';
import { QueueClassMapping } from './QueueHelpers';

export class QueueFactory {
  static createQueue(queueDetails: CreateQueueDto): IQueue {
    const { queueType } = queueDetails;
    const queueClass: QueueConstructableClass = QueueClassMapping[queueType];
    return new queueClass(queueDetails);
  }
}
