import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  Query,
} from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConnectToQueueDto } from '../queue/dto/connect-to-queue';
import { ConsumerService } from './consumer.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsumerDto: UpdateConsumerDto,
  ) {
    return this.consumerService.update(+id, updateConsumerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumerService.remove(+id);
  }

  @Get('healthcheck')
  healthcheck() {
    return 200;
  }
}
