import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';

interface Constructable<T> {
  new (...args: any): T;
}

class FanoutQueue {
  constructor(queueDetails: CreateQueueDto) {
    return '';
  }
}
class DirectQueue {
  constructor(queueDetails: CreateQueueDto) {
    return '';
  }
}
class RoundRobinQueue {
  constructor(queueDetails: CreateQueueDto) {
    return '';
  }
}

export type QueueConstructableClasses =
  | Constructable<FanoutQueue>
  | Constructable<DirectQueue>
  | Constructable<RoundRobinQueue>;

export type QueueClasses = FanoutQueue | DirectQueue | RoundRobinQueue;

export enum QueueEnums {
  FANOUT = 'fanout',
  ROUND_ROBIN = 'roundrobin',
  DIRECT = 'direct',
}

export const QueueClassMapping: { [key: string]: QueueConstructableClasses } = {
  fanout: FanoutQueue,
  roundrobin: DirectQueue,
  direct: RoundRobinQueue,
};
