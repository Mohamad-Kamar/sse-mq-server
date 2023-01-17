import { Injectable } from '@nestjs/common';
import { ProducerMessage } from '../globalTypes/PublisherMessage';
import { QueueService } from '../queue/queue.service';
import { QueueNotFoundError } from '../structures/Errors/QueueNotFoundError';

@Injectable()
export class ProducerService {
  constructor(private readonly queueService: QueueService) {}

  publish(PublisherMessage: ProducerMessage) {
    const { queueKey, message }: ProducerMessage = PublisherMessage;
    const assocQueue = this.queueService.getQueue(queueKey);
    if (!assocQueue) {
      throw new QueueNotFoundError();
    }
    assocQueue.queue.publish(message);
  }
}
