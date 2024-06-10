import { CreateResourceResult } from '../types/create-resource-result.type';
import { DEFAULT_RESOURCE, menu } from '../adminjs.module';
import Task from '../../tasks/task.entity';

export const TaskResource = (): CreateResourceResult<typeof Task> => ({
  resource: Task,
  ...DEFAULT_RESOURCE,
  options: {
    ...DEFAULT_RESOURCE.options,
    navigation: menu.task,
    listProperties: [
      'id',
      'title',
      'description',
      'status',
      'userId',
      'createAt',
      'updatedAt'
    ],
    editProperties: ['title', 'description', 'status'],
    actions: {
      ...DEFAULT_RESOURCE.options.actions,
      edit: {
        isAccessible: true,
      },
    }
  }
})
