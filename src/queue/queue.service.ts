import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { ConnectionParams } from 'src/globalTypes/connectionParams';
import { CreateQueueDto } from './dto/create-queue.dto';
@Injectable()
export class QueueService {
  constructor(private readonly databaseService: DatabaseService) {}

  getQueue(queueName: string) {
    return this.databaseService.getQueue(queueName);
  }

  createQueue(connectionParams: ConnectionParams) {
    if (!connectionParams.hasOwnProperty('queueType'))
      connectionParams.queueType = 'fanout';
    return this.databaseService.addQueue(connectionParams);
  }

  connect(queueName: string) {
    return this.databaseService.getQueue(queueName);
  }

  create(createQueueDto: CreateQueueDto) {
    return 'This action adds a new queue';
  }
  findAll() {
    return `This action returns all queue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queue`;
  }

  update(id: number, updateQueueDto: UpdateQueueDto) {
    return `This action updates a #${id} queue`;
  }

  remove(id: number) {
    return `This action removes a #${id} queue`;
  }
}
