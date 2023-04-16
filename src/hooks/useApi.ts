import { useState, useCallback } from 'react';

type PromiseFnResult<T extends (...args: unknown[]) => unknown> =
  ReturnType<T> extends Promise<infer R> ? R : never;

type ArgumentFn<A extends unknown[]> = (...args: A) => Promise<void>;

export const useApi = <T extends (...args: any[]) => Promise<PromiseFnResult<T>>>(
  service: T,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState<PromiseFnResult<T>>();

  const makeRequest = useCallback<ArgumentFn<Parameters<T>>>(
    async (...args) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await service(...args);

        setResult(data);
      } catch (e) {
        setIsError(true);
      }

      setIsLoading(false);
    },
    [service],
  );

  return {
    isLoading,
    isError,
    makeRequest,
    result,
  };
};
