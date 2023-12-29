import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import Output2 from './Components/FlexForm/Output/Output_v2';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import ErrorPage from './Components/Pages/ErrorPage';
import Root from './Components/Pages/Router/Root';
import SillFormGroups from './Components/Pages/Router/SillFormGroups';
import SillPage from './Components/Pages/SillPage';
import { OutputTabs } from './Components/UI/OutputTabs';
import { ROOTSTORE } from './Context/RootStore';
import { _ID, _log } from './Helpers/HelpersFns';
import { form_action, form_loader } from './Components/Pages/Router/SillFormHooked';


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
        path: 'sill',
        element: <SillPage />,

        children: [
          {
            path: 'groups/:groupId',
            element: <SillFormGroups />,
            errorElement: <ErrorPage />,

            // action: form_action,
            //             loader:({request,params})=>{
            // const {gr_id} = params
            //             }
          },
          {
            path: 'groups/save',
            element: <SillFormGroups />,
            action: form_action,



          }
        ],
        errorElement: <ErrorPage />

      },
      {
        path: '/tabs',
        element: <OutputTabs />,
        loader: tabLoader
      },
      {
        path: '/offset',
        element: <Output2 />
      }
    ]
  }
])

function App() {
  // useLayoutEffect(() => {
  //   setTimeout(console.clear, 0)
  //   return () => console.clear()
  // }, [])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
