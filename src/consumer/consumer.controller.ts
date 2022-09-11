import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
} from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConnectionParams } from 'src/globalTypes/connectionParams';
import { ConsumerService } from './consumer.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Sse('connect')
  connect(): Observable<MessageEvent> {
    const queueName = 'hello';
    const fakeParams: ConnectionParams = { queueName };
    return this.consumerService.connect(fakeParams);
  }

  @Get('healthcheck')
  healthcheck() {
    return 'Good';
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
