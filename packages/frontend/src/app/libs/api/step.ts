import { apiClient } from './api';
import { StepType } from '../hooks/useTask';

const StepApi = {
  async createStep(stepId:string, title: string){
    const { data } = await apiClient().post(
      '/step/create',
      JSON.stringify({ taskId: stepId, title: title, description:'', status: StepType.UNFINISHED }),
    )
    return data;
  },

  async delete(id: string){
    const { data } = await apiClient().delete(
      `/step/${id}`,
    )
    return data;
  },

  async update(stepId: string, title: string, status: StepType){
    const { data } = await apiClient().put(
      `/step/${stepId}`,
      JSON.stringify({ title: title, status: status }),
    )
    return data;
  }

}

export default StepApi;
