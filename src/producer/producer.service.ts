import { Injectable } from '@nestjs/common';
import { PublisherMessage } from 'src/globalTypes/publisherMessage';
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
    const dataTo = new MessageEvent('message', { data: message });
    assocQueue.assocObs.next(dataTo);
  }
}
