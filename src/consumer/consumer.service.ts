import { Injectable } from '@nestjs/common';
import { QueueService } from '..//queue/queue.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { ConnectionParams } from 'src/globalTypes/connectionParams';

@Injectable()
export class ConsumerService {
  constructor(private readonly queueService: QueueService) {}

  connect(connectionParms: ConnectionParams) {
    const { queueId }: ConnectionParams = connectionParms;
    if (this.queueService.hasQueue(123)) {
      return;
    }
    return 'This action adds a new consumer';
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
