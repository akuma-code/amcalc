import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { SelectorPanel } from './Components/Layout/SelectorPanel';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import ErrorPage from './Components/Pages/ErrorPage';
import Homepage from './Components/Pages/Homepage';
import './input.css';

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
