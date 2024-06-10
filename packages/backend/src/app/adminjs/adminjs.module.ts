import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS, { ResourceOptions } from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { UserResource } from './resources/user.resourece';
import { TaskResource } from './resources/task.resource';
import { StepResource } from './resources/step.resource';

const DEFAULT_ADMIN = {
  email: 'adminUser',
  password: 'adminUser',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

AdminJS.registerAdapter({ Database, Resource });

export const DEFAULT_RESOURCE = {
  options: {
    actions: {
      edit: {
        isAccessible: true,
      },
      delete: {
        isAccessible: true,
      },
      new: {
        isAccessible: true,
      },
      bulkDelete: {
        isAccessible: false,
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc' as ResourceOptions['sort']['direction'],
    },
  },
};

export const menu = {
  user: { name: 'User', icon: 'User' },
  task: { name: 'Task', icon: 'Gift' },
  step: { name: 'Step', icon: 'Book' },
};

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [UserResource(),TaskResource(),StepResource()],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
  ],
})
export class AdminjsModule {}
