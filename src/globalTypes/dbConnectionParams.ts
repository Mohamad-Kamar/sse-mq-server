import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectionParams } from 'src/globalTypes/connectionParams';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';

export type DBConnectionParams = {
  connectionParams: CreateQueueDto;
  assocObs: BehaviorSubject<MessageEvent>;
};
