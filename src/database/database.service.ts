import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectionParams } from 'src/globalTypes/connectionParams';
import { DBConnectionParams } from 'src/globalTypes/dbConnectionParams';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';

@Injectable()
export class DatabaseService {
  connections: DBConnectionParams[] = [];

  getQueue(queueName: string): DBConnectionParams {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const found: DBConnectionParams = this.connections.find(
      (queue) => queue.connectionParams.queueName === queueName,
    )!;
    return found;
  }

  addQueue(createQueueDto: CreateQueueDto): DBConnectionParams {
    const messageToSend = new MessageEvent('message');
    const addedQueue: DBConnectionParams = {
      connectionParams: createQueueDto,
      assocObs: new BehaviorSubject(messageToSend),
    };
    this.connections.push(addedQueue);
    return addedQueue;
  }

  create(createDatabaseDto: CreateDatabaseDto) {
    return 'This action adds a new database';
  }

  findAll() {
    return `This action returns all database`;
  }

  findOne(id: number) {
    return `This action returns a #${id} database`;
  }

  update(id: number, updateDatabaseDto: UpdateDatabaseDto) {
    return `This action updates a #${id} database`;
  }

  remove(id: number) {
    return `This action removes a #${id} database`;
  }
}
