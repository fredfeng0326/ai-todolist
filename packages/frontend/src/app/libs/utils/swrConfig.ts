import type { SWRConfiguration } from 'swr';

export const SwrConfig = {
  default: {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    shouldRetryOnError: false,
    errorRetryInterval: 10000,
  } as SWRConfiguration,
};
