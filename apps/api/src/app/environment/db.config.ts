import { NamingStategy } from './naming.strategy';
import { environment } from './environment';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const contexts = (require as any).context('../../', true, /\.entity.ts$/);
const entities = contexts
  .keys()
  .map((modulePath: any) => contexts(modulePath))
  .reduce(
    (result: any[], entityModule: { [x: string]: any }) =>
      result.concat(Object.keys(entityModule).map(key => entityModule[key])),
    []
  );

export const DB_TYPEORM_CONFIG: TypeOrmModuleOptions = {
  ...environment.database,
  type: 'mysql',
  entities,
  logging: !environment.production ? 'all' : false,
  bigNumberStrings: false,
  namingStrategy: new NamingStategy(),
  dropSchema: false,
};
