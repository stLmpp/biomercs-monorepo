import { Observable } from 'rxjs';
import { Region } from '@biomercs/api-interfaces';

export abstract class AbstractRegionService {
  abstract get(): Observable<Region[]>;
}
