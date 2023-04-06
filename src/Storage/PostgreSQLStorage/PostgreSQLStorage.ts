import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { CreateQueueDto } from '../../queue/dto/create-queue.dto';
import { IStorage } from '../IStorage/IStorage';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from '../IStorage/IStorage_Types';
import {
  formatToConsumerCollection,
  formatToMessageCollection,
  formatToQueueCollection,
} from '../../utils/formatToCollection';
import { Client } from 'pg';
import { ConfigModule } from '@nestjs/config';

export class PostgreSQLStorage implements IStorage {
  client: Client;

  async initialize(): Promise<void> {
    await ConfigModule.envVariablesLoaded;
    const connectionString = process.env.POSTGRESQL_CONNECTION_STRING;
    this.client = new Client(connectionString);
    await this.client.connect();
  }

  async reset(): Promise<boolean> {
    try {
      await this.client.query('TRUNCATE TABLE queues, consumers, messages');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getQueues(): Promise<QueueCollection> {
    const { rows } = await this.client.query<CreateQueueDto>(
      'SELECT * FROM queues',
    );
    return formatToQueueCollection(rows);
  }

  async getConsumers(): Promise<ConsumerCollection> {
    const { rows } = await this.client.query<CreateConsumerDto>(
      'SELECT * FROM consumers',
    );
    return formatToConsumerCollection(rows);
  }

  async getMessages(): Promise<MessageCollection> {
    const { rows } = await this.client.query<Message>('SELECT * FROM messages');
    return formatToMessageCollection(rows);
  }

  async createQueue(queueDetails: CreateQueueDto): Promise<boolean> {
    try {
      await this.client.query(
        'INSERT INTO queues (queue_key, queue_type) VALUES ($1, $2)',
        [queueDetails.queueKey, queueDetails.queueType],
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createConsumer(consumerDetails: CreateConsumerDto): Promise<boolean> {
    try {
      await this.client.query(
        'INSERT INTO consumers (queue_key, consumer_id) VALUES ($1, $2)',
        [consumerDetails.queueKey, consumerDetails.consumerID],
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createMessage(messageDetails: Message): Promise<boolean> {
    try {
      await this.client.query(
        'INSERT INTO messages (message_id, consumer_id, message_content, durable) VALUES ($1, $2, $3, $4)',
        [
          messageDetails.messageID,
          messageDetails.consumerID,
          messageDetails.messageContent,
          messageDetails.durable,
        ],
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteMessage(messageID: string): Promise<boolean> {
    try {
      await this.client.query('DELETE FROM messages WHERE message_id=$1', [
        messageID,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteConsumer(consumerID: string): Promise<boolean> {
    try {
      await this.client.query('DELETE FROM consumers WHERE consumer_id=$1', [
        consumerID,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteQueue(queueKey: string): Promise<boolean> {
    try {
      await this.client.query('DELETE FROM queues WHERE queue_key=$1', [
        queueKey,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
