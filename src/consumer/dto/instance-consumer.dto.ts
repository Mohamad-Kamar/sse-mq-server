import { ReplaySubject } from 'rxjs';
import { InstanceMessage, InstanceMessageCollection } from 'src/Types';

export class InstaceConsumer {
  queueKey: string;
  consumerID: string;
  messages: InstanceMessageCollection;
  consumerSubject: ReplaySubject<MessageEvent<string>>;
  constructor(
    queueKey: string,
    consumerID: string,
    messages: InstanceMessageCollection = {},
  ) {
    this.queueKey = queueKey;
    this.consumerID = consumerID;
    this.messages = messages;
    this.consumerSubject = new ReplaySubject<MessageEvent>();
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message: InstanceMessage) {
    this.messages[message.messageID] = message;
  }
}
