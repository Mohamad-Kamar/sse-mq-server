import { ReplaySubject } from 'rxjs';
import { IQueue } from './IQueue';
import { v4 as uuidv4 } from 'uuid';
import { ConsumerCollection } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { AlreadyExistsError } from '../../structures/Errors/AlreadyExistsError';
import { InstaceConsumerDto } from 'src/consumer/dto/instance-consumer.dto';

export class FanoutQueue implements IQueue {
  consumers: ConsumerCollection;
  queueDetails: CreateQueueDto;
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
    return consumerID;
  }

  getConsumer(consumerID: string): InstaceConsumerDto {
    return this.consumers[consumerID];
  }

  publish(message: string) {
    Object.keys(this.consumers).forEach((consumerID) => {
      const consumerSubject = this.consumers[consumerID].consumerSubject;
      if (consumerSubject)
        consumerSubject.next(new MessageEvent('message', { data: message }));
    });
  }
}
