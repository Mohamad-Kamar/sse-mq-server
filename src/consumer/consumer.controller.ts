import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Sse,
  Query,
  Delete,
} from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  ConsumerCollection,
  MessageCollection,
} from 'src/Storage/IStorage/IStorage_Types';
import { ConnectToQueueDto } from '../queue/dto/connect-to-queue';
import { ConsumerService } from './consumer.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { InstanceMessage } from '../../src/Types';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Sse('connect')
  connect(@Query() query: ConnectToQueueDto): Observable<MessageEvent> {
    return this.consumerService.connect(query);
  }

  @Post()
  create(@Body() consumerDetails: CreateConsumerDto) {
    return this.consumerService.create(consumerDetails);
  }

  @Get()
  findAll(): ConsumerCollection | Promise<ConsumerCollection> {
    return this.consumerService.retrieveAll();
  }

  @Get()
  findOne(@Query() consumerID: string) {
    return this.consumerService.findOne(consumerID);
  }

  @Get('message')
  findAllMessages(): MessageCollection | Promise<MessageCollection> {
    return this.consumerService.retrieveAllMessages();
  }

  @Delete()
  deleteOne(@Query() query: CreateConsumerDto) {
    return this.consumerService.delete(query);
  }

  @Delete('message')
  deleteMessage(@Body() instanceMessage: InstanceMessage) {
    return this.consumerService.deleteMessage(instanceMessage);
  }
}
