import { apiClient } from '../api/api';


export default async function fetcher(path: string) {
  return (await apiClient().get(path)).data;
}
