import { InstaceConsumer } from 'src/consumer/dto/instance-consumer.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { InstanceConsumerCollection } from '../../Types';

export interface IQueue {
  queueKey: string;
  queueType: string;
  consumers: InstanceConsumerCollection;
  getConsumers(): InstanceConsumerCollection;
  addConsumer(createConsumerDto: CreateConsumerDto): string;
  getConsumer(consumerID: string): InstaceConsumer;
  publish(message: string): void;
}
