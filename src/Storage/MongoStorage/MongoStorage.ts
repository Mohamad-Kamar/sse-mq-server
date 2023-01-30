import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { CreateQueueDto } from '../../queue/dto/create-queue.dto';
import { IStorage } from '../IStorage/IStorage';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from '../IStorage/IStorage_Types';
import { MongoClient, ServerApiVersion, Collection, ObjectId } from 'mongodb';
import {
  formatToConsumerCollection,
  formatToMessageCollection,
  formatToQueueCollection,
} from 'src/utils/formatToCollection';

const clusterName = process.env.MONGODB_USERNAME;
const clusterPassword = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${clusterName}:${clusterPassword}@cluster0.a0ik0dk.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'sse-mq';

export class MongoStorage implements IStorage {
  queues: Collection;
  consumers: Collection;
  messages: Collection;
  client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
  });

  async initialize(): Promise<void> {
    await this.client.connect();
    const db = this.client.db(dbName);
    this.queues = db.collection('queues');
    this.consumers = db.collection('consumers');
    this.messages = db.collection('messages');
  }

  async reset(): Promise<boolean> {
    try {
      await this.queues.deleteMany({});
      await this.consumers.deleteMany({});
      await this.messages.deleteMany({});
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getQueues(): Promise<QueueCollection> {
    const dbQueues = await this.queues.find({}).toArray();
    const formattedQueues = formatToQueueCollection(
      dbQueues.map((value): CreateQueueDto => {
        return {
          queueKey: value.queueKey,
          queueType: value.queueType,
        };
      }),
    );

    return formattedQueues;
  }

  async getConsumers(): Promise<ConsumerCollection> {
    const dbConsumers = await this.queues.find({}).toArray();
    const formattedConsumers = formatToConsumerCollection(
      dbConsumers.map((value): CreateConsumerDto => {
        return {
          queueKey: value.queueKey,
          consumerID: value.consumerID,
        };
      }),
    );

    return formattedConsumers;
  }

  async getMessages(): Promise<MessageCollection> {
    const dbMessages = await this.queues.find({}).toArray();
    const formattedMessages = formatToMessageCollection(
      dbMessages.map((value): Message => {
        return {
          messageID: value.messageID,
          consumerID: value.consumerID,
          messageContent: value.messageContent,
          durable: value.durable,
        };
      }),
    );
    return formattedMessages;
  }

  async createQueue(queueDetails: CreateQueueDto): Promise<boolean> {
    try {
      await this.queues.insertOne({
        _id: new ObjectId(queueDetails.queueKey),
        ...queueDetails,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createConsumer(consumerDetails: CreateConsumerDto): Promise<boolean> {
    try {
      await this.consumers.insertOne({
        _id: new ObjectId(consumerDetails.consumerID),
        ...consumerDetails,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createMessage(messageDetails: Message): Promise<boolean> {
    try {
      await this.consumers.insertOne({
        _id: new ObjectId(messageDetails.messageID),
        ...messageDetails,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteMessage(messageID: string): Promise<boolean> {
    try {
      this.messages.deleteOne({ _id: messageID });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteConsumer(consumerID: string): Promise<boolean> {
    try {
      this.consumers.deleteOne({ _id: consumerID });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteQueue(queueKey: string): Promise<boolean> {
    try {
      this.queues.deleteOne({ _id: queueKey });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
