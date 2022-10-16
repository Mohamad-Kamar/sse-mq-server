import { BehaviorSubject } from 'rxjs';
import { IQueue } from './queue/entities/IQueue';

interface Constructable<T> {
  new (...args: any): T;
}

export type QueueConstructableClass = Constructable<IQueue>;

export type Consumer = {
  subject: BehaviorSubject<MessageEvent>;
  consumerID: string;
};

export type Consumers = {
  [key: string]: Consumer;
};

export type DBQueue = {
  queue: IQueue;
  queueID: string;
};

export type DBQueues = {
  [key: string]: DBQueue;
};
