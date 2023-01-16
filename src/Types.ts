import { ReplaySubject } from 'rxjs';
import { IQueue } from './queue/entities/IQueue';

interface Constructable<T> {
  new (...args: any): T;
}

export type QueueConstructableClass = Constructable<IQueue>;

export type Consumer = {
  consumerSubject?: ReplaySubject<MessageEvent>;
  consumerID: string;
  queueKey: string;
};

export type Consumers = {
  [consumerID: string]: Consumer;
};

export type DBQueue = {
  queue: IQueue;
  queueKey: string;
};

export type DBQueues = {
  [queueKey: string]: DBQueue;
};
