import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { InstanceMessage } from 'src/Types';
import { ProducerMessage } from '../globalTypes/ProducerMessage';
import { QueueNotFoundError } from '../structures/Errors/QueueNotFoundError';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../Storage/IStorage/IStorage_Types';

@Injectable()
export class ProducerService {
  constructor(private readonly databaseService: DatabaseService) {}

  publish(producerMessage: ProducerMessage) {
    const { queueKey, message }: ProducerMessage = producerMessage;
    const assocQueue = this.databaseService.getQueue(queueKey);
    if (!assocQueue) {
      throw new QueueNotFoundError();
    }

    assocQueue.getPublishingConsumers().forEach((consumer) => {
      const messageEvent = new MessageEvent('message', { data: message });
      const durable = producerMessage.durable || false;
      const messageID = uuidv4();
      const instanceMessage: InstanceMessage = {
        messageEvent,
        messageID,
        consumerID: consumer.consumerID,
        durable,
      };
      const storedMessage: Message = {
        messageContent: message,
        messageID,
        consumerID: consumer.consumerID,
        durable,
      };
      this.databaseService.saveMessage(storedMessage);

      this.databaseService.addMessage(instanceMessage);
      consumer.consumerSubject.next(instanceMessage);
    });
  }
}
