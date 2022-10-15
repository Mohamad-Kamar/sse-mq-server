import { CreateQueueDto } from '../queue/dto/create-queue.dto';
import {
  QueueClasses,
  QueueClassMapping,
  QueueConstructableClasses,
} from './QueueTypes';

export class QueueFactory {
  createQueue(queueDetails: CreateQueueDto): QueueClasses {
    const { queueType } = queueDetails;
    const queueClass: QueueConstructableClasses = QueueClassMapping[queueType];
    return new queueClass(queueDetails);
  }
}
