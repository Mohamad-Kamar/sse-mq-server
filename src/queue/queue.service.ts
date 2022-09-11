import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { CreateQueueDto } from './dto/create-queue.dto';
@Injectable()
export class QueueService {
  constructor(private readonly databaseService: DatabaseService) {}

  getQueue(queueName: string) {
    return this.databaseService.getQueue(queueName);
  }

  createQueue(createQueueDto: CreateQueueDto) {
    if (!createQueueDto.hasOwnProperty('queueType'))
      createQueueDto.queueType = 'fanout';
    console.log('CREATED QUEUE', createQueueDto);
    return this.databaseService.addQueue(createQueueDto);
  }

  connect(queueName: string) {
    return this.databaseService.getQueue(queueName);
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
