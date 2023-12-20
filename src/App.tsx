import './App.css';
import './input.css'
import Homepage from './Components/Pages/Homepage';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import { _log } from './Helpers/HelpersFns';
import { SelectorPanel } from './Components/Layout/SelectorPanel';
import { LayoutSelector } from './Components/Layout/LayoutSelector';
import { AppRouter } from './Components/Pages/Router/AppRouter';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './Components/Pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BentoLayoutPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/bento',
    element: <BentoLayoutPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/sill',
    element: <Homepage />,
    errorElement: <ErrorPage />
  },
])

function App() {

  return (
    <div className='pt-10'>


      {/* <BrowserRouter > */}
      <SelectorPanel />
      <RouterProvider router={router} />
      {/* <AppRouter /> */}
      {/* <LayoutSelector /> */}
      {/* </BrowserRouter> */}


    </div>
  );
}

export default App;
