export type PublisherMessage = {
  queueKey: string;
  message: string;
  durable: boolean;
};
