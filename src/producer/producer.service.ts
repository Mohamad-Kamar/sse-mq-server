import { Injectable } from '@nestjs/common';
import { PublisherMessage } from 'src/globalTypes/publisherMessage';
import { QueueService } from '../queue/queue.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

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

  create(createProducerDto: CreateProducerDto) {
    return 'This action adds a new producer';
  }

  findAll() {
    return `This action returns all producer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producer`;
  }

  update(id: number, updateProducerDto: UpdateProducerDto) {
    return `This action updates a #${id} producer`;
  }

  remove(id: number) {
    return `This action removes a #${id} producer`;
  }
}
