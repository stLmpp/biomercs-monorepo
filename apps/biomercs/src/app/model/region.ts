import { trackByFactory } from '@stlmpp/utils';
import { Region } from '@biomercs/api-interfaces';

export const trackByRegion = trackByFactory<Region>('id');
