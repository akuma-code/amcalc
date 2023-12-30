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
import { SillFormHooked, form_action, form_loader } from './Components/Pages/Router/SillFormHooked';


export const tabLoader = async () => {


  const data = ROOTSTORE.traverse().map(s => s.data)
  console.log('data', data.map(d => d.store))
  return data
}



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    id: 'root_elem',
    errorElement: <ErrorPage />,
    loader: ({ request, params }) => {
      const data = request
      // console.log('req', data)
      return data
    },
    children: [
      {
        path: 'bento',
        element: <BentoLayoutPage />,
      },
      {
        path: 'sill',
        element: <SillPage />,
        errorElement: <ErrorPage />,
        action: async ({ request, params }) => {
          const act = params.action
          console.log('act', act)
          const fd = await request.formData()
          console.log('body: ', fd)
          return redirect('/sill/form')

        },
        loader: async ({ request }) => {

          const data = request
          return data
        },
        children: [
          // {
          //   path: '/sill/groups/',
          //   element: <SillFormGroups />,
          //   errorElement: <ErrorPage />,
          // },
          {
            path: 'form/:action',
            element: <SillFormGroups />,

          },

        ],

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
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );
}

export default App;
