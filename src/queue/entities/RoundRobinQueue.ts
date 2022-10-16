import { BehaviorSubject } from 'rxjs';
import { IQueue } from './IQueue';
import { v4 as uuidv4 } from 'uuid';
import { Consumers, Consumer } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';

export class RoundRobinQueue implements IQueue {
  consumers: Consumers;
  queueDetails: CreateQueueDto;
  currentIndex: number;

  constructor(queueDetails: CreateQueueDto) {
    this.queueDetails = queueDetails;
    this.consumers = {};
    this.currentIndex = 0;
  }

  addConsumer(): string {
    const messageToSend = new MessageEvent('message');
    const addedSubject = new BehaviorSubject(messageToSend);
    const consumerID = uuidv4();
    const addedConsumer: Consumer = {
      consumer: addedSubject,
      consumerID,
    };
    this.consumers[consumerID] = addedConsumer;
    return consumerID;
  }

  getConsumer(consumerID: string): Consumer {
    return this.consumers[consumerID];
  }

  publish(message: string) {
    const currentKeys = Object.keys(this.consumers);
    this.currentIndex = this.currentIndex % currentKeys.length;
    const targetID = currentKeys[this.currentIndex];
    const targetConsumer = this.consumers[targetID];
    targetConsumer.consumer.next(
      new MessageEvent('message', { data: message }),
    );
    this.currentIndex = (this.currentIndex + 1) % currentKeys.length;
  }
}
