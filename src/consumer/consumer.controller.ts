import { Controller, Get, Post, Body, Param, Sse, Query } from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConnectToQueueDto } from '../queue/dto/connect-to-queue';
import { ConsumerService } from './consumer.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Sse('connect')
  connect(@Query() query: ConnectToQueueDto): Observable<MessageEvent> {
    return this.consumerService.connect(query);
  }

  @Post('create')
  create(@Body() consumerDetails: CreateConsumerDto) {
    return this.consumerService.create(consumerDetails);
  }

  @Get()
  findAll() {
    return this.consumerService.findAll();
  }

  @Get(':consumerID')
  findOne(@Param('consumerID') consumerID: string) {
    return this.consumerService.findOne(consumerID);
  }

  @Get('healthcheck')
  healthcheck() {
    return 200;
  }
}
