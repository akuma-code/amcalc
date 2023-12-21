import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { SelectorPanel } from './Components/Layout/SelectorPanel';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import ErrorPage from './Components/Pages/ErrorPage';
import SillPage from './Components/Pages/SillPage';
import './input.css';
import Root from './Components/Pages/Router/Root';
import { _log } from './Helpers/HelpersFns';
import { OutputTabs } from './Components/UI/OutputTabs';
import OutputVers1 from './Components/FlexForm/Output/Output_v1';
import Output2 from './Components/FlexForm/Output/Output_v2';
import { ROOTSTORE } from './Context/RootStore';

export const tabLoader = async () => {


  const data = ROOTSTORE.traverse().map(s => s.data)
  console.log('data', data.map(d => d.store))
  return data
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: 'bento',
        element: <BentoLayoutPage />,


      },
      {
        path: '/sill',
        element: <SillPage />,

      },
      {
        path: '/tabs',
        element: <OutputTabs size_tab={<OutputVers1 />} />,
        loader: tabLoader
      },
      {
        path: '/offset',
        element: <Output2 />
      }
    ]
  }
]

)

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
