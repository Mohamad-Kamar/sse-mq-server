import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { IQueue } from './IQueue';
import { ConsumerNotFoundError } from '../../structures/Errors/ConsumerNotFoundError';
import { Consumers, Consumer } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { AlreadyExistsError } from '../../structures/Errors/AlreadyExistsError';

export class DirectQueue implements IQueue {
  consumers: Consumers;
  queueDetails: CreateQueueDto;
  currentID: string;
  constructor(queueDetails: CreateQueueDto) {
    this.queueDetails = queueDetails;
    this.consumers = {};
  }

  addConsumer(createConsumerDto: CreateConsumerDto): string {
    const messageToSend = new MessageEvent('message');
    const addedSubject = new BehaviorSubject(messageToSend);
    const { queueKey } = createConsumerDto;
    const consumerID = createConsumerDto.consumerID || uuidv4();
    if (this.consumers[consumerID]) throw new AlreadyExistsError();

    const addedConsumer: Consumer = {
      consumer: addedSubject,
      consumerID,
      queueKey,
    };
    this.consumers[consumerID] = addedConsumer;
    this.currentID ? (this.currentID = consumerID) : null;
    return consumerID;
  }

  getConsumer(consumerID: string): Consumer {
    return this.consumers[consumerID];
  }

  publish(message: string) {
    if (!this.currentID) return;
    const consumerSubject = this.consumers[this.currentID].consumer;
    consumerSubject.next(new MessageEvent('message', { data: message }));
  }

  setID(consumerID: string): void {
    if (this.consumers.hasOwnProperty(consumerID)) this.currentID = consumerID;
    else
      throw new ConsumerNotFoundError(
        `No Consumer with ID ${consumerID} in Queue ${this.queueDetails.queueKey}`,
      );
  }
  getID(): string {
    return this.currentID;
  }
}
