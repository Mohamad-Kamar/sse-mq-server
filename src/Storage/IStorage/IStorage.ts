import { PublisherMessage } from 'src/globalTypes/publisherMessage';
import { QueueInstance, Consumer, Message } from './IStorage_Types';

export interface IStorage {
  reset(): boolean;
  getQueue(queueKey: string): QueueInstance;
  getQueueCosumers(queueKey: string): Consumer[];
  createQueue(queueDetails: QueueInstance): boolean;
  getConsumer(consumerID: string): Consumer;
  createConsumer(consumerDetails: Consumer): boolean;
  getConsumerMessages(consumerID: string): Message[];
  getMessage(messageID: string): Message;
  createMessage(messageDetails: PublisherMessage): boolean;
}
