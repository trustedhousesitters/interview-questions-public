import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });
}

export function renderWithClient(ui) {
  const testClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={testClient}>
      {ui}
    </QueryClientProvider>
  );
}
