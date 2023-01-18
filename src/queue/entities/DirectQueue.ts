import { IQueue } from './IQueue';
import { ConsumerNotFoundError } from '../../structures/Errors/ConsumerNotFoundError';
import { InstanceConsumerCollection } from '../../Types';
import { InstaceConsumer } from '../../consumer/dto/instance-consumer.dto';

export class DirectQueue implements IQueue {
  consumers: InstanceConsumerCollection;
  queueKey: string;
  queueType: string;
  currentConsumerID: string;
  constructor(queueKey: string, queueType: string) {
    this.queueKey = queueKey;
    this.queueType = queueType;
    this.consumers = {};
  }

  getConsumers(): InstanceConsumerCollection {
    return this.consumers;
  }

  addConsumer(instanceConsumer: InstaceConsumer): void {
    this.currentConsumerID = instanceConsumer.consumerID;
    this.consumers[instanceConsumer.consumerID] = instanceConsumer;
  }

  getConsumer(consumerID: string): InstaceConsumer {
    return this.consumers[consumerID];
  }

  getPublishingConsumers(): InstaceConsumer[] {
    if (!this.currentConsumerID) return [];
    return [this.consumers[this.currentConsumerID]];
  }

  setID(consumerID: string): void {
    if (this.consumers.hasOwnProperty(consumerID))
      this.currentConsumerID = consumerID;
    else
      throw new ConsumerNotFoundError(
        `No Consumer with ID ${consumerID} in Queue ${this.queueKey}`,
      );
  }

  getID(): string {
    return this.currentConsumerID;
  }
}
