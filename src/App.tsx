import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { SelectorPanel } from './Components/Layout/SelectorPanel';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import ErrorPage from './Components/Pages/ErrorPage';
import Homepage from './Components/Pages/Homepage';
import './input.css';
import Root from './Components/Pages/Router/Root';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'bento',
        element: <BentoLayoutPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/sill',
        element: <Homepage />,
        errorElement: <ErrorPage />
      },
    ]
  },


])

function App() {

  return (
    <div id='$app'>


      <RouterProvider router={router} />
      {/* <BrowserRouter > */}
      {/* <SelectorPanel /> */}
      {/* <AppRouter /> */}
      {/* <LayoutSelector /> */}
      {/* </BrowserRouter> */}


    </div>
  );
}

export default App;
