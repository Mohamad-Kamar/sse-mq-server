/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { InvalidQueueError } from '../structures/Errors/InvalidQueueError';
import { QueueNotFoundError } from '../structures/Errors/QueueNotFoundError';
import { ConnectToQueueDto } from '../queue/dto/connect-to-queue';
import { DatabaseService } from 'src/database/database.service';
import { InstanceConsumerCollection } from 'src/Types';
import { InstaceConsumer } from './dto/instance-consumer.dto';
import { v4 as uuidv4 } from 'uuid';
import { AlreadyExistsError } from 'src/structures/Errors/AlreadyExistsError';

@Injectable()
export class ConsumerService {
  consumers: InstanceConsumerCollection;
  constructor(private readonly databaseService: DatabaseService) {
    this.consumers = this.databaseService.getConsumers();
  }

  connect(connectToQueueDto: ConnectToQueueDto): Observable<MessageEvent> {
    let { queueKey, consumerID } = connectToQueueDto;
    if (!queueKey) throw new InvalidQueueError('Queue Key Missing');

    let targetConsumer = this.findOne(consumerID);
    if (!targetConsumer) {
      this.create(connectToQueueDto);
      targetConsumer = this.findOne(consumerID);
    }
    return targetConsumer.consumerSubject;
  }

  create(createConsumerDto: CreateConsumerDto): CreateConsumerDto {
    const { queueKey }: CreateConsumerDto = createConsumerDto;
    if (!queueKey) throw new InvalidQueueError('Queue Key Missing');

    const assocQueue = this.databaseService.getQueue(queueKey);
    if (!assocQueue) {
      throw new QueueNotFoundError();
    }

    if (!createConsumerDto.consumerID) createConsumerDto.consumerID = uuidv4();
    if (this.findOne(createConsumerDto.consumerID))
      throw new AlreadyExistsError();

    let consumerInstace = new InstaceConsumer(
      createConsumerDto.queueKey,
      createConsumerDto.consumerID,
    );

    this.databaseService.saveConsumer(createConsumerDto);
    assocQueue.addConsumer(consumerInstace);
    this.addConsumer(consumerInstace);

    return createConsumerDto;
  }

  addConsumer(consumerInstace: InstaceConsumer) {
    this.consumers[consumerInstace.consumerID] = consumerInstace;
  }

  findOne(consumerID: string): InstaceConsumer {
    return this.consumers[consumerID];
  }

  findAll() {
    return this.consumers;
  }
}
