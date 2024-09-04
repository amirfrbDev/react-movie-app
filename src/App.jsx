import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import './App.css'
import { defaultOptions } from './configs/reactQueryConfig'
import SearchBox from './components/SearchBox'
import HomePage from './pages/HomePage'
import Router from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'


function App() {

  const queryClient = new QueryClient({ defaultOptions })


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>

    </QueryClientProvider>
  )
}

export default App
