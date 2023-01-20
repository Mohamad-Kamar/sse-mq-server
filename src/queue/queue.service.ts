import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { CreateQueueDto } from './dto/create-queue.dto';
import { IQueue } from './entities/IQueue';
import { QueueFactory } from './entities/QueueFactory';
import { AlreadyExistsError } from '../structures/Errors/AlreadyExistsError';
import { InvalidQueueError } from '../structures/Errors/InvalidQueueError';
import { InstanceQueueCollection } from 'src/Types';

@Injectable()
export class QueueService {
  queues: InstanceQueueCollection;
  constructor(private readonly databaseService: DatabaseService) {
    this.queues = this.databaseService.getQueues();
  }

  getQueue(queueKey: string): IQueue {
    return this.queues[queueKey];
  }

  create(createQueueDto: CreateQueueDto): CreateQueueDto {
    if (!createQueueDto.hasOwnProperty('queueType'))
      throw new InvalidQueueError('Queue Type Missing');
    if (!createQueueDto.hasOwnProperty('queueKey'))
      throw new InvalidQueueError('Queue Key Missing');
    if (this.getQueue(createQueueDto['queueKey']))
      throw new AlreadyExistsError('Queue Already Exists');

    this.databaseService.saveQueue(createQueueDto);

    const queueInstance: IQueue = QueueFactory.createQueue(createQueueDto);
    this.addQueue(queueInstance);
    return createQueueDto;
  }

  addQueue(queueInstance: IQueue) {
    this.queues[queueInstance.queueKey] = queueInstance;
  }

  findAll() {
    return this.queues;
  }

  retrieveAll() {
    return this.databaseService.retrieveQueues();
  }

  findOne(queueKey: string) {
    return this.queues[queueKey];
  }

  update(id: number, updateQueueDto: UpdateQueueDto) {
    return `This action updates a #${id} queue`;
  }

  remove(queueKey: string) {
    delete this.queues[queueKey];
    this.databaseService.deleteQueue(queueKey);
  }
}
