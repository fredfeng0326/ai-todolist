import { CreateResourceResult } from '../types/create-resource-result.type';
import { User } from '../../users/user.entity';
import { DEFAULT_RESOURCE, menu } from '../adminjs.module';

export const UserResource = (): CreateResourceResult<typeof User> => ({
  resource: User,
  ...DEFAULT_RESOURCE,
  options: {
    ...DEFAULT_RESOURCE.options,
    navigation: menu.user,
    listProperties: [
      'id',
      'username',
      'tasks',
      'isAdmin',
      'createdAt',
      'updatedAt'
    ],
    editProperties: ['password', 'isAdmin'],
    actions: {
      ...DEFAULT_RESOURCE.options.actions,
      edit: {
        isAccessible: true,
      },
    }
  }
})
