import { ReplaySubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { IQueue } from './IQueue';
import { ConsumerNotFoundError } from '../../structures/Errors/ConsumerNotFoundError';
import { InstanceConsumerCollection } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { AlreadyExistsError } from '../../structures/Errors/AlreadyExistsError';
import { InstaceConsumer } from 'src/consumer/dto/instance-consumer.dto';

export class DirectQueue implements IQueue {
  consumers: InstanceConsumerCollection;
  queueDetails: CreateQueueDto;
  currentID: string;
  constructor(queueDetails: CreateQueueDto) {
    this.queueDetails = queueDetails;
    this.consumers = {};
  }

  getConsumers(): InstanceConsumerCollection {
    return this.consumers;
  }

  addConsumer(addedConsumer: InstaceConsumer): void {
    this.consumers[addedConsumer.consumerID] = addedConsumer;
  }

  getConsumer(consumerID: string): InstaceConsumer {
    return this.consumers[consumerID];
  }

  publish(message: string) {
    if (!this.currentID) return;
    const consumerSubject = this.consumers[this.currentID].consumerSubject;
    if (consumerSubject)
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
