import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { QueueCollection } from 'src/Storage/IStorage/IStorage_Types';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  create(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.create(createQueueDto);
  }

  @Get()
  findAll(): QueueCollection {
    return this.queueService.retrieveAll();
  }

  @Get(':queueKey')
  findOne(@Param('queueKey') queueKey: string) {
    return this.queueService.findOne(queueKey);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueueDto: UpdateQueueDto) {
    return this.queueService.update(+id, updateQueueDto);
  }

  @Delete(':queueKey')
  remove(@Param('queueKey') queueKey: string) {
    return this.queueService.remove(queueKey);
  }
}
