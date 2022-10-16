import { Controller, Post, Body } from '@nestjs/common';
import { PublisherMessage } from '../globalTypes/publisherMessage';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  publish(@Body() messageBody: PublisherMessage) {
    return this.producerService.publish(messageBody);
  }
}
