import { IQueue } from './IQueue';
import { InstanceConsumerCollection } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { AlreadyExistsError } from '../../structures/Errors/AlreadyExistsError';
import { InstaceConsumer } from '../../consumer/dto/instance-consumer.dto';

export class FanoutQueue implements IQueue {
  consumers: InstanceConsumerCollection;
  queueKey: string;
  queueType: string;
  constructor(queueKey: string, queueType: string) {
    this.queueKey = queueKey;
    this.queueType = queueType;
    this.consumers = {};
  }

  getConsumers(): InstanceConsumerCollection {
    return this.consumers;
  }

  addConsumer(instanceConsumer: InstaceConsumer): void {
    this.consumers[instanceConsumer.consumerID] = instanceConsumer;
  }

  getConsumer(consumerID: string): InstaceConsumer {
    return this.consumers[consumerID];
  }

  deleteConsumer(consumerID: string) {
    delete this.consumers[consumerID];
  }

  getPublishingConsumers(): InstaceConsumer[] {
    return Object.values(this.consumers);
  }
}
