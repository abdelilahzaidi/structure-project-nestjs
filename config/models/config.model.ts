import { DatabaseType } from 'typeorm';

export interface IServerConfig {
  host: string;
  port: number;
}

export interface IDatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  logging: boolean;
  logger: 'simple-console' | 'advanced-console' | 'debug' | 'file';
}

export interface IConfig {
  server: IServerConfig;
  database: IDatabaseConfig;
  jwt: IJwtConfig;
}

export interface IJwtConfig {
  secret: string;
  expiresIn: string;
}
