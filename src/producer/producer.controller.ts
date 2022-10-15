import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  publish(@Body() messageBody: any) {
    return this.producerService.publish(messageBody);
  }
}
