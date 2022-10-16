import { CreateQueueDto } from '../../queue/dto/create-queue.dto';
import {
  QueueClasses,
  QueueClassMapping,
  QueueConstructableClass,
} from './QueueTypes';

export class QueueFactory {
  static createQueue(queueDetails: CreateQueueDto): QueueClasses {
    const { queueType } = queueDetails;
    const queueClass: QueueConstructableClass = QueueClassMapping[queueType];
    return new queueClass(queueDetails);
  }
}
