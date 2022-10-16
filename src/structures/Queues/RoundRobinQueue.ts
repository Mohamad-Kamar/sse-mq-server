import { BehaviorSubject } from 'rxjs';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { IQueue } from './IQueue';
import { Consumer, Consumers } from 'src/Types';
import { v4 as uuidv4 } from 'uuid';

export class RoundRobinQueue implements IQueue {
  consumers: Consumers;
  queueDetails: CreateQueueDto;
  currentIndex: number;

  constructor(queueDetails: CreateQueueDto) {
    this.queueDetails = queueDetails;
    this.consumers = {};
    this.currentIndex = 0;
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
    const currentKeys = Object.keys(this.consumers);
    this.currentIndex = this.currentIndex % currentKeys.length;
    const targetID = currentKeys[this.currentIndex];
    const targetConsumer = this.consumers[targetID];
    targetConsumer.subject.next(new MessageEvent('message', { data: message }));
    this.currentIndex = (this.currentIndex + 1) % currentKeys.length;
  }
}
