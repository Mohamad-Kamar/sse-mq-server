import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { CreateQueueDto } from './dto/create-queue.dto';
import { QueueFactory } from 'src/structures/Queues/QueueFactory';
import { InvalidQueueError } from 'src/structures/Errors/InvalidQueueError';
import { ExistingQueueError } from 'src/structures/Errors/ExistingQueueError';
import { IQueue } from 'src/structures/Queues/IQueue';

@Injectable()
export class QueueService {
  constructor(private readonly databaseService: DatabaseService) {}

  getQueue(queueKey: string) {
    return this.databaseService.getQueue(queueKey);
  }

  createQueue(createQueueDto: CreateQueueDto) {
    if (!createQueueDto.hasOwnProperty('queueType'))
      throw new InvalidQueueError('Queue Type Missing');
    if (!createQueueDto.hasOwnProperty('queueKey'))
      throw new InvalidQueueError('QueueKeyMissing');
    if (this.databaseService.getQueue(createQueueDto['queueKey']))
      throw new ExistingQueueError('QueueKeyMissing');

    const addedQueue: IQueue = QueueFactory.createQueue(createQueueDto);
    console.log('CREATED QUEUE', createQueueDto);
    return this.databaseService.addQueue(addedQueue);
  }

  connect(queueKey: string) {
    return this.databaseService.getQueue(queueKey);
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
