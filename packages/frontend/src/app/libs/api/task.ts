import { TaskType } from '../hooks/useTask';
import { apiClient } from './api';

const TaskApi = {
  async createTask(title: string, description: string) {
    const { data } = await apiClient().post(
      '/task/create',
      JSON.stringify({ title: title, description: description, status: TaskType.UNFINISHED }),
    )
    return data;
  },
  async updateTask(id: string, title: string, description: string, status: TaskType) {
    const { data } = await apiClient().put(
      `/task/${id}`,
      JSON.stringify({ title: title, description: description, status: status }),
    );
    return data;
  },
  async deleteTask(id: string) {
    const { data } = await apiClient().delete(`/task/${id}`);
    return data;
  },
  async askAI(question: string) {
    const { data } = await apiClient().post(
      `/task/ai`,
      JSON.stringify({ question: question}),
    );
    return data;
  },
  async createTaskByAI(title: string, steps: any) {
    const { data } = await apiClient().post(
      `/task/create-by-ai`,
      JSON.stringify({ title: title, steps: steps}),
    );
    return data;
  }

}

export default TaskApi;
