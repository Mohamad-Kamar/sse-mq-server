import { BehaviorSubject } from 'rxjs';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { IQueue } from './IQueue';
import { Consumer, Consumers } from 'src/Types';
import { v4 as uuidv4 } from 'uuid';

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
    const addedID = uuidv4();
    const addedConsumer: Consumer = {
      subject: addedSubject,
      id: addedID,
    };
    this.consumers[addedID] = addedConsumer;
    return addedConsumer;
  }
  publish(message: string) {
    Object.keys(this.consumers).forEach((consumerID) => {
      const consumerSubject = this.consumers[consumerID].subject;
      consumerSubject.next(new MessageEvent('message', { data: message }));
    });
  }
}
