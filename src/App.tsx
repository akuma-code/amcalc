import { RouterProvider } from 'react-router-dom';

import { router } from './AppRouter';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={ queryClient }>

      <RouterProvider router={ router } fallbackElement={
        <div className='text-center text-4xl'><p> Loading...</p>
        </div> } />
    </QueryClientProvider>
  );
}

export default App;
