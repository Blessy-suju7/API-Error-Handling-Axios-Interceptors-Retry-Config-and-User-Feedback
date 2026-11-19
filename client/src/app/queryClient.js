
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        return error.response?.status !== 401 && failureCount < 1;
      },

      retryDelay: (attempt) =>
        Math.min(1000 * 2 ** attempt, 30000),
    },

    mutations: {
      retry: 0,
    },
  },
});
