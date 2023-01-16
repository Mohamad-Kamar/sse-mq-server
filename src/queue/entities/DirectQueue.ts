import { ReplaySubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { IQueue } from './IQueue';
import { ConsumerNotFoundError } from '../../structures/Errors/ConsumerNotFoundError';
import { ConsumerCollection } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { AlreadyExistsError } from '../../structures/Errors/AlreadyExistsError';
import { InstaceConsumerDto } from 'src/consumer/dto/instance-consumer.dto';

export class DirectQueue implements IQueue {
  consumers: ConsumerCollection;
  queueDetails: CreateQueueDto;
  currentID: string;
  constructor(queueDetails: CreateQueueDto) {
    this.queueDetails = queueDetails;
    this.consumers = {};
  }

  addConsumer(createConsumerDto: CreateConsumerDto): string {
    const addedSubject = new ReplaySubject<MessageEvent>();
    const { queueKey } = createConsumerDto;
    const consumerID = createConsumerDto.consumerID || uuidv4();
    if (this.consumers[consumerID]) throw new AlreadyExistsError();

    const addedConsumer: InstaceConsumerDto = {
      consumerSubject: addedSubject,
      consumerID,
      queueKey,
    };
    this.consumers[consumerID] = addedConsumer;
    this.currentID ? (this.currentID = consumerID) : null;
    return consumerID;
  }

  getConsumer(consumerID: string): InstaceConsumerDto {
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
