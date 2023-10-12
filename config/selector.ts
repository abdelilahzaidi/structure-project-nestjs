import { IConfig, IDatabaseConfig, IJwtConfig, IServerConfig } from './models';
import configuration from './index';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: IConfig = configuration();

function createSelector<TReturn, TSel>(
  selector: () => TSel,
  projector: (config: TSel) => TReturn,
): () => TReturn {
  return () => projector(selector());
}

function createFeatureSelector<T>(key: keyof IConfig) {
  console.log(config[key]);
  return () => config[key] as T;
}

export const selectFeatureServer =
  createFeatureSelector<IServerConfig>('server');

export const selectFeatureDatabase =
  createFeatureSelector<IDatabaseConfig>('database');

export const selectServerPort = createSelector(
  selectFeatureServer,
  (server) => server.port,
);

export const selectTypeormConfig = createSelector(
  selectFeatureDatabase,
  (db): TypeOrmModuleOptions =>
    ({
      ...db,
      entities: [__dirname + '/../' + '**/*.entity{.ts,.js}'],
      // entities: [],
      synchronize: true,
    } as PostgresConnectionOptions),
);

export const selectFeatureJwt = createFeatureSelector<IJwtConfig>('jwt');
export const selectJwtSecret = createSelector(
  selectFeatureJwt,
  (jwt) => jwt.secret,
);
export const selectJwtExpiresIn = createSelector(
  selectFeatureJwt,
  (jwt) => jwt.expiresIn,
);
