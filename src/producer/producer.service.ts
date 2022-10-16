import { Injectable } from '@nestjs/common';
import { PublisherMessage } from '../globalTypes/publisherMessage';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class ProducerService {
  constructor(private readonly queueService: QueueService) {}

  publish(publisherMessage: any) {
    const { queueKey, message }: PublisherMessage = publisherMessage;
    let assocQueue = this.queueService.getQueue(queueKey);
    if (!assocQueue) {
      assocQueue = this.queueService.createQueue(publisherMessage);
    }
    assocQueue.queue.publish(message);
  }
}
