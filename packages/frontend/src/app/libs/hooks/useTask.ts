import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { SwrConfig } from '../utils/swrConfig';

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  status: TaskType;
  steps: StepItem[];
}

export type StepItem = {
  id: string;
  title: string;
  description: string;
  status: StepType;
  updatedAt: string;
}

export enum TaskType {
  FINISH = 'FINISH',
  CLOSED = 'CLOSED',
  UNFINISHED = 'UNFINISHED',
  CANCELED = 'CANCELED',
}

export enum StepType {
  FINISH = 'FINISH',
  CLOSED = 'CLOSED',
  UNFINISHED = 'UNFINISHED',
  CANCELED = 'CANCELED',
}

const useTask = () => {
  const { data, error } = useSWR<TaskItem[]>(
    '/task',
    fetcher,
    SwrConfig.default
  );
  return {
    tasks: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTask;
