import { Injectable } from '@nestjs/common';
import { PublisherMessage } from '../globalTypes/publisherMessage';
import { QueueService } from '../queue/queue.service';
import { QueueNotFoundError } from '../structures/Errors/QueueNotFoundError';

@Injectable()
export class ProducerService {
  constructor(private readonly queueService: QueueService) {}

  publish(publisherMessage: PublisherMessage) {
    const { queueKey, message }: PublisherMessage = publisherMessage;
    const assocQueue = this.queueService.getQueue(queueKey);
    if (!assocQueue) {
      throw new QueueNotFoundError();
    }
    assocQueue.queue.publish(message);
  }
}
