import { CreateResourceResult } from '../types/create-resource-result.type';
import { DEFAULT_RESOURCE, menu } from '../adminjs.module';
import Step from '../../steps/step.entity';

export const StepResource = (): CreateResourceResult<typeof Step> => ({
  resource: Step,
  ...DEFAULT_RESOURCE,
  options: {
    ...DEFAULT_RESOURCE.options,
    navigation: menu.step,
    listProperties: [
      'id',
      'title',
      'status',
      'taskId',
      'createdAt',
      'updatedAt'
    ],
    editProperties: ['title', 'status'],
    actions: {
      ...DEFAULT_RESOURCE.options.actions,
      edit: {
        isAccessible: true,
      },
    }
  }
})
