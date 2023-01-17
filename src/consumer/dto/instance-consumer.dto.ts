import { ReplaySubject } from 'rxjs';
import {
  Message,
  MessageCollection,
} from 'src/Storage/IStorage/IStorage_Types';

export class InstaceConsumer {
  queueKey: string;
  consumerID: string;
  messages: MessageCollection;
  consumerSubject: ReplaySubject<MessageEvent>;
  constructor(
    queueKey: string,
    consumerID: string,
    messages: MessageCollection = {},
  ) {
    this.queueKey = queueKey;
    this.consumerID = consumerID;
    this.messages = messages;
    this.consumerSubject = new ReplaySubject();
  }

  getMessages() {
    return this.messages;
  }

  setMessages(messages: MessageCollection) {
    this.messages = messages;
  }

  addMessage(message: Message) {
    this.messages[message.messageID] = message;
  }
}
