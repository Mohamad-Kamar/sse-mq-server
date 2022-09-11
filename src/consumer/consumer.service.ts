import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { Observable } from 'rxjs';
import { CreateQueueDto } from '../queue/dto/create-queue.dto';

@Injectable()
export class ConsumerService {
  constructor(private readonly queueService: QueueService) {}

  connect(connectionParms: CreateQueueDto): Observable<MessageEvent> {
    const { queueName }: CreateQueueDto = connectionParms;
    const assocQueue = this.queueService.getQueue(queueName);
    if (!assocQueue) {
      return this.queueService.createQueue(connectionParms).assocObs;
    }
    return assocQueue.assocObs;
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
