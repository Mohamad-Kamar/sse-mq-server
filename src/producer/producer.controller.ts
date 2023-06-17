import { Controller, Post, Body } from '@nestjs/common';
import { ProducerMessage } from '../globalTypes/ProducerMessage';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async publish(@Body() messageBody: ProducerMessage) {
    return this.producerService.publish(messageBody);
  }
}
