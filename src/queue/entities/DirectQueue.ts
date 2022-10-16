import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { IQueue } from './IQueue';
import { ConsumerNotFoundError } from '../../structures/Errors/ConsumerNotFoundError';
import { Consumers, Consumer } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';

export class DirectQueue implements IQueue {
  consumers: Consumers;
  queueDetails: CreateQueueDto;
  currentID: string;
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
      consumerID: addedID,
    };
    this.consumers[addedID] = addedConsumer;
    this.currentID ? (this.currentID = addedID) : null;
    return addedConsumer;
  }
  publish(message: string) {
    if (!this.currentID) return;
    const consumerSubject = this.consumers[this.currentID].subject;
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
