import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectionParams } from 'src/globalTypes/connectionParams';

export type DBConnectionParams = {
  connectionParams: ConnectionParams;
  assocObs: BehaviorSubject<MessageEvent>;
};
