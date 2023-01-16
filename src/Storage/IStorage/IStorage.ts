import { InstaceConsumerDto } from 'src/consumer/dto/instance-consumer.dto';
import { PublisherMessage } from 'src/globalTypes/publisherMessage';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { ConsumerCollection, Message, MessageCollection } from '../../Types';

export interface IStorage {
  reset(): boolean;
  getQueue(queueKey: string): CreateQueueDto;
  getQueueCosumers(queueKey: string): ConsumerCollection;
  createQueue(queueDetails: CreateQueueDto): boolean;
  getConsumer(consumerID: string): InstaceConsumerDto;
  createConsumer(consumerDetails: InstaceConsumerDto): boolean;
  getConsumerMessages(consumerID: string): MessageCollection;
  getMessage(messageID: string): Message;
  createMessage(messageDetails: PublisherMessage): boolean;
}
