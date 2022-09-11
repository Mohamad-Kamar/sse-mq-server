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
import { CreateQueueDto } from '../queue/dto/create-queue.dto';
import { ConsumerService } from './consumer.service';
import { UpdateConsumerDto } from './dto/update-consumer.dto';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Sse('connect')
  connect(@Query() query: CreateQueueDto): Observable<MessageEvent> {
    return this.consumerService.connect(query);
  }

  @Get('healthcheck')
  healthcheck() {
    return 200;
  }

  @Post('create')
  create(@Body() queueDetails: any) {
    this.consumerService.connect(queueDetails);
    return queueDetails;
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
}
