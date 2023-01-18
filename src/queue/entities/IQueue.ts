import { InstaceConsumer } from '../../consumer/dto/instance-consumer.dto';
import { InstanceConsumerCollection } from '../../Types';

export interface IQueue {
  queueKey: string;
  queueType: string;
  consumers: InstanceConsumerCollection;
  getConsumers(): InstanceConsumerCollection;
  addConsumer(instanceConsumer: InstaceConsumer): void;
  getConsumer(consumerID: string): InstaceConsumer;
  deleteConsumer(consumerID: string): void;
  getPublishingConsumers(): InstaceConsumer[];
}
