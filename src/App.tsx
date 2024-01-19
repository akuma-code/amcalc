import { RouterProvider } from 'react-router-dom';

import { router } from './AppRouter';
import { QueryClient, QueryClientProvider, useQuery, useIsFetching } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { useStoresContext } from './Hooks/useStoresContext';
import { postGoogleSS } from './HTTP/axios';
import { observer } from 'mobx-react-lite';
import { SelectorPanel } from './Components/Layout/SelectorPanel';


const queryClient = new QueryClient({ defaultOptions: { queries: { queryFn: postGoogleSS } } })


const App = observer(() => {
  const { ViewConfig } = useStoresContext();



  return (
    // <QueryClientProvider client={ queryClient }>
    <>
      <RouterProvider router={ router } fallbackElement={
        <div className='text-center text-4xl'>
          <p>App Loading... Dont worry!</p>
        </div> } />
      { ViewConfig.visible.devtools && <ReactQueryDevtools initialIsOpen={ false } /> }
    </>
    // </QueryClientProvider>
  );
})

export default App;
