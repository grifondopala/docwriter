import { QueryClient, QueryClientProvider } from 'react-query'

import '@/app/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export default function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}