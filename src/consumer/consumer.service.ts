import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { QueueService } from '../queue/queue.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { InvalidQueueError } from '../structures/Errors/InvalidQueueError';
import { QueueNotFoundError } from '../structures/Errors/QueueNotFoundError';
import { ConnectToQueueDto } from '../queue/dto/connect-to-queue';
import { InvalidConsumerError } from '../structures/Errors/InvalidConsumerError';

@Injectable()
export class ConsumerService {
  constructor(private readonly queueService: QueueService) {}

  connect(connectToQueueDto: ConnectToQueueDto): Observable<MessageEvent> {
    const { queueKey, consumerID } = connectToQueueDto;
    if (!queueKey) throw new InvalidQueueError('Queue Key Missing');
    if (!consumerID) throw new InvalidConsumerError('ConsumerID Missing');

    const targetQueue = this.queueService.getQueue(queueKey);
    const targetConsumer = targetQueue.queue.getConsumer(consumerID);
    return targetConsumer.consumer;
  }

  create(createConsumerDto: CreateConsumerDto): string {
    const { queueKey }: CreateConsumerDto = createConsumerDto;
    if (!queueKey) throw new InvalidQueueError('Queue Key Missing');

    const assocQueue = this.queueService.getQueue(queueKey);
    if (!assocQueue) {
      throw new QueueNotFoundError();
    }
    const targetConsumerID = assocQueue.queue.addConsumer();
    return targetConsumerID;
  }

  findAll() {
    return `This action returns all consumer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumer`;
  }

  update(id: number, updateConsumerDto: UpdateConsumerDto) {
    return `This action updates a #${id} consumer`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumer`;
  }
}
