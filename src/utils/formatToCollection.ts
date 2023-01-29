import { CreateQueueDto } from '../queue/dto/create-queue.dto';
import { CreateConsumerDto } from '../consumer/dto/create-consumer.dto';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
} from '../Storage/IStorage/IStorage_Types';
import { QueueCollection } from '../Types';

export const formatToQueueCollection = (dataAsArray: Array<CreateQueueDto>) => {
  const formattedCollection: QueueCollection = {};
  dataAsArray.forEach((element: CreateQueueDto) => {
    const elementKey = element['queueKey'];
    formattedCollection[elementKey] = element;
  });
  return formattedCollection;
};

export const formatToConsumerCollection = (
  dataAsArray: Array<CreateConsumerDto>,
) => {
  const formattedCollection: ConsumerCollection = {};
  dataAsArray.forEach((element: CreateConsumerDto) => {
    const elementKey = element['consumerID'];
    formattedCollection[elementKey] = element;
  });
  return formattedCollection;
};

export const formatToMessageCollection = (dataAsArray: Array<Message>) => {
  const formattedCollection: MessageCollection = {};
  dataAsArray.forEach((element: Message) => {
    const elementKey = element['messageID'];
    formattedCollection[elementKey] = element;
  });
  return formattedCollection;
};
