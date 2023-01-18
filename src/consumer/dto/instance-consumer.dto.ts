import { ReplaySubject } from 'rxjs';
import { InstanceMessage, InstanceMessageCollection } from 'src/Types';

export class InstaceConsumer {
  queueKey: string;
  consumerID: string;
  messages: InstanceMessageCollection;
  consumerSubject: ReplaySubject<InstanceMessage>;
  constructor(
    queueKey: string,
    consumerID: string,
    messages: InstanceMessageCollection = {},
  ) {
    this.queueKey = queueKey;
    this.consumerID = consumerID;
    this.messages = messages;
    this.consumerSubject = new ReplaySubject<InstanceMessage>();
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message: InstanceMessage) {
    this.messages[message.messageID] = message;
  }

  deleteMessage(messageID: string) {
    delete this.messages[messageID];
  }
}
