import { BehaviorSubject } from 'rxjs';
import { IQueue } from './IQueue';
import { v4 as uuidv4 } from 'uuid';
import { Consumers, Consumer } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';

export class FanoutQueue implements IQueue {
  consumers: Consumers;
  queueDetails: CreateQueueDto;
  constructor(queueDetails: CreateQueueDto) {
    this.queueDetails = queueDetails;
    this.consumers = {};
  }

  addConsumer(): Consumer {
    const messageToSend = new MessageEvent('message');
    const addedSubject = new BehaviorSubject(messageToSend);
    const consumerID = uuidv4();
    const addedConsumer: Consumer = {
      consumer: addedSubject,
      consumerID,
    };
    this.consumers[consumerID] = addedConsumer;
    return addedConsumer;
  }

  publish(message: string) {
    Object.keys(this.consumers).forEach((consumerID) => {
      const consumerSubject = this.consumers[consumerID].consumer;
      consumerSubject.next(new MessageEvent('message', { data: message }));
    });
  }
}
