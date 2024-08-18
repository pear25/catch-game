import { Toaster } from 'react-hot-toast';
import './App.css';
import { UIView } from './pages/index.pages';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <UIView />
    </QueryClientProvider>
  );
}

export default App;
