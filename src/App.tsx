import { Toaster } from 'react-hot-toast';
import './App.css';
import { UIView } from './pages/index.pages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AudioManager } from './components/AudioManager';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <UIView />
      <AudioManager />
    </QueryClientProvider>
  );
}

export default App;
