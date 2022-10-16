import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { QueueService } from '../queue/queue.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { CreateQueueDto } from '../queue/dto/create-queue.dto';
import { InvalidQueueError } from '../structures/Errors/InvalidQueueError';
import { QueueNotFoundError } from '../structures/Errors/QueueNotFoundError';

@Injectable()
export class ConsumerService {
  constructor(private readonly queueService: QueueService) {}

  connect(connectionParms: CreateQueueDto): Observable<MessageEvent> {
    if (!connectionParms.hasOwnProperty('queueType'))
      throw new InvalidQueueError('Queue Type Missing');
    if (!connectionParms.hasOwnProperty('queueKey'))
      throw new InvalidQueueError('Queue Key Missing');

    const { queueKey }: CreateQueueDto = connectionParms;
    const assocQueue = this.queueService.getQueue(queueKey);
    if (!assocQueue) {
      throw new QueueNotFoundError();
    }
    return assocQueue.queue.addConsumer().subject;
  }

  create(createConsumerDto: CreateConsumerDto) {
    return 'This action adds a new consumer';
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
