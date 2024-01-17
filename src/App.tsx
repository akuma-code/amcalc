import { RouterProvider } from 'react-router-dom';

import { router } from './AppRouter';
import { QueryClient, QueryClientProvider, useQuery, useIsFetching } from 'react-query';
import { useStoresContext } from './Hooks/useStoresContext';
import { postGoogleSS } from './HTTP/axios';
import { observer } from 'mobx-react-lite';


const queryClient = new QueryClient({ defaultOptions: { queries: { queryFn: postGoogleSS } } })


const App = observer(() => {



  return (
    <QueryClientProvider client={ queryClient }>

      <RouterProvider router={ router } fallbackElement={
        <div className='text-center text-4xl'>
          <p>App Loading... Dont worry!</p>
        </div> } />
    </QueryClientProvider>
  );
})

export default App;
