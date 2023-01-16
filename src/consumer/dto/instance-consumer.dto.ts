import { ReplaySubject } from 'rxjs';

export class InstaceConsumerDto {
  queueKey: string;
  consumerID?: string;
  consumerSubject?: ReplaySubject<MessageEvent>;
}
