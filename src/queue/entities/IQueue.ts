import { InstaceConsumer } from 'src/consumer/dto/instance-consumer.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { InstanceConsumerCollection } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';

export interface IQueue {
  queueDetails: CreateQueueDto;
  consumers: InstanceConsumerCollection;
  getConsumers(): InstanceConsumerCollection;
  addConsumer(createConsumerDto: CreateConsumerDto): string;
  getConsumer(consumerID: string): InstaceConsumer;
  publish(message: string): void;
}
