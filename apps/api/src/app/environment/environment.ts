import { get } from 'config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { isArray } from '@stlmpp/utils';
import { KeyValue } from '../shared/inteface/key-value.interface';
import { genSalt } from 'bcryptjs';

function tryGetEnvVar(property: string): any {
  try {
    return get(property);
  } catch {
    return process.env[property];
  }
}

function getEnvVar(properties: string[]): { key: string; value: any }[];
function getEnvVar(property: string): any;
function getEnvVar(propertyOrProperties: string | string[]): any {
  if (isArray(propertyOrProperties)) {
    return propertyOrProperties.map(key => ({ key, value: tryGetEnvVar(key) }));
  } else {
    return tryGetEnvVar(propertyOrProperties);
  }
}

export type Configs =
  | 'FILE_IMAGE_EXTENSIONS_ALLOWED'
  | 'USE_HANDLE_ERROR'
  | 'USE_ROLE'
  | 'USE_AUTH'
  | 'FILE_UPLOAD_PATH';

class Env {
  private _salt!: string;

  config<T = any>(config: Configs): T {
    return getEnvVar('CONFIG_' + config);
  }

  getMany(keys: string[]): KeyValue[] {
    return getEnvVar(keys);
  }

  get<T = any>(key: string): T {
    return getEnvVar(key);
  }

  async envSalt(): Promise<string> {
    if (!this._salt) {
      this._salt = await genSalt();
    }
    return this._salt;
  }

  get host(): string {
    return getEnvVar('HOST');
  }

  get port(): number {
    return getEnvVar('PORT');
  }

  get apiUrl(): string {
    return `http://${this.host}:${this.port}/api`;
  }

  get hostFrontEnd(): string {
    return getEnvVar('FRONT_END_HOST');
  }

  get portFrontEnd(): number {
    return getEnvVar('FRONT_END_PORT');
  }

  get frontEndUrl(): string {
    return `http://${this.hostFrontEnd}:${this.portFrontEnd}`;
  }

  get database(): MysqlConnectionOptions {
    return this.getMany([
      'DB_HOST',
      'DB_PORT',
      'DB_USERNAME',
      'DB_PASSWORD',
      'DB_DATABASE',
      'DB_SYNCHRONIZE',
      'DB_CHARSET',
    ]).reduce(
      (dbConfig, { key, value }) => ({
        ...dbConfig,
        [key.replace('DB_', '').toLowerCase()]: value,
      }),
      {
        extra: {
          collate: this.get('DB_COLLATE'),
        },
      }
    ) as MysqlConnectionOptions;
  }

  get production(): boolean {
    return getEnvVar('NODE_ENV') === 'production';
  }

  get defaultPaginationSize(): number {
    return this.get('DEFAULT_PAGINATION_SIZE');
  }

  get appVersion(): string {
    return '1.0.0';
  }

  get steamOpenIDUrl(): string {
    return this.get('STEAM_OPENID_URL');
  }

  get steamKey(): string {
    return this.get('STEAM_API_KEY');
  }

  static create(): Env {
    return new Env();
  }
}

export const environment = Env.create();
