import { FanoutQueue } from './FanoutQueue';
import { DirectQueue } from './DirectQueue';
import { RoundRobinQueue } from './RoundRobinQueue';
import { IQueue } from './IQueue';

interface Constructable<T> {
  new (...args: any): T;
}

export type QueueConstructableClass = Constructable<IQueue>;

export enum QueueEnums {
  FANOUT = 'fanout',
  ROUND_ROBIN = 'roundrobin',
  DIRECT = 'direct',
}

export const QueueClassMapping: { [key: string]: QueueConstructableClass } = {
  fanout: FanoutQueue,
  roundrobin: DirectQueue,
  direct: RoundRobinQueue,
};
