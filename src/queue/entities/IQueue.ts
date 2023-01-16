import { InstaceConsumerDto } from 'src/consumer/dto/instance-consumer.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { ConsumerCollection } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';

export interface IQueue {
  queueDetails: CreateQueueDto;
  consumers: ConsumerCollection;
  addConsumer(createConsumerDto: CreateConsumerDto): string;
  getConsumer(consumerID: string): InstaceConsumerDto;
  publish(message: string): void;
}
