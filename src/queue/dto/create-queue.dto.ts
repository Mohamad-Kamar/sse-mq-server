export class CreateQueueDto {
  queueName = '';
  queueType?: string = 'fanout';
}
