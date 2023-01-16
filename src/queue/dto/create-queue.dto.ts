export class CreateQueueDto {
  queueKey: string;
  queueType: string;
  constructor(queueKey: string, queueType = 'fanout') {
    this.queueKey = queueKey;
    this.queueType = queueType;
  }
}
