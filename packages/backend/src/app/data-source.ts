import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Task from './tasks/task.entity';
import Step from './steps/step.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    User,
    Task,
    Step
  ],
  migrations: ['dist/packages/backend/app/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: false,
}
export const appDataSource = new DataSource(dataSourceOptions);
