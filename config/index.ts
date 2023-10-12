import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as process from 'process';
import { IConfig } from './models';

export default function configuration(): IConfig {
  console.log(process.env);
  return yaml.load(
    readFileSync(join(__dirname, `${process.env.NODE_ENV || 'prod'}.yml`), {
      encoding: 'utf-8',
    }),
  ) as IConfig;
}

export * from './selector';
