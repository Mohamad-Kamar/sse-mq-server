import { BehaviorSubject } from 'rxjs';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { IQueue } from './IQueue';

export class FanoutQueue implements IQueue {
  consumers: Array<BehaviorSubject<MessageEvent>>;
  queueDetails: CreateQueueDto;
  constructor(queueDetails: CreateQueueDto) {
    this.queueDetails = queueDetails;
    this.consumers = [];
  }

  addConsumer() {
    const messageToSend = new MessageEvent('message');
    const addedQueue = new BehaviorSubject(messageToSend);
    this.consumers.push(addedQueue);
    return addedQueue;
  }
  publish(message: string) {
    this.consumers.forEach((consumer) => {
      consumer.next(new MessageEvent('message', { data: message }));
    });
  }
}
