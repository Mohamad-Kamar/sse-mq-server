import { ReplaySubject } from 'rxjs';

export type QueueInstance = {
  queueKey: string;
  queueType: string;
};

export type Consumer = {
  consumerSubject?: ReplaySubject<MessageEvent>;
  consumerID: string;
  queueKey: string;
};

export type Message = {
  messageID: string;
  consumerID: string;
  messageContent: string;
  durable: boolean;
};
