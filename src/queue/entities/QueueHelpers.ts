import { FanoutQueue } from './FanoutQueue';
import { DirectQueue } from './DirectQueue';
import { RoundRobinQueue } from './RoundRobinQueue';
import { QueueConstructableClass } from '../../Types';

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
