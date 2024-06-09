import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { SwrConfig } from '../utils/swrConfig';

const useAuth = () => {
  const { data, error } = useSWR('/auth', fetcher, SwrConfig.default);

  return {
    user: (data || {}),
    authenticated: !error && data && JSON.stringify(data) !== '{}',
    isLoading: !error && !data,
    isError: error,
  };
};

export default useAuth;
