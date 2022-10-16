import { BehaviorSubject } from 'rxjs';

export type Consumer = {
  subject: BehaviorSubject<MessageEvent>;
  id: string;
};

export type Consumers = {
  [key: string]: Consumer;
};
