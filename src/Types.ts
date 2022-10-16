import { BehaviorSubject } from 'rxjs';

export type Consumer = {
  subject: BehaviorSubject<MessageEvent>;
  consumerID: string;
};

export type Consumers = {
  [key: string]: Consumer;
};
