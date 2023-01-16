import { ReplaySubject } from 'rxjs';
import { IQueue } from './IQueue';
import { v4 as uuidv4 } from 'uuid';
import { Consumers, Consumer } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { AlreadyExistsError } from '../../structures/Errors/AlreadyExistsError';

export class RoundRobinQueue implements IQueue {
  consumers: Consumers;
  queueDetails: CreateQueueDto;
  currentIndex: number;

  constructor(queueDetails: CreateQueueDto) {
    this.queueDetails = queueDetails;
    this.consumers = {};
    this.currentIndex = 0;
  }

  addConsumer(createConsumerDto: CreateConsumerDto): string {
    const addedSubject = new ReplaySubject<MessageEvent>();
    const { queueKey } = createConsumerDto;
    const consumerID = createConsumerDto.consumerID || uuidv4();
    if (this.consumers[consumerID]) throw new AlreadyExistsError();

    const addedConsumer: Consumer = {
      consumerSubject: addedSubject,
      consumerID,
      queueKey,
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
    if (targetConsumer && targetConsumer.consumerSubject) {
      targetConsumer.consumerSubject.next(
        new MessageEvent('message', { data: message }),
      );
      this.currentIndex = (this.currentIndex + 1) % currentKeys.length;
    }
  }
}
