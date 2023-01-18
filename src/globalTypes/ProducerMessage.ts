export type ProducerMessage = {
  queueKey: string;
  message: string;
  durable: boolean;
};
