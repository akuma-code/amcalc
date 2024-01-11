import { Params, RouteObject, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import Output2 from './Components/FlexForm/Output/Output_v2';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import ErrorPage from './Components/Pages/ErrorPage';
import Root from './Components/Pages/Router/Root';
import SillPage from './Components/Pages/SillPage';
import { OutputTabs } from './Components/UI/OutputTabs';
import { GroupIdCard } from './Components/UI/SillGroupView';
import { ROOTSTORE } from './Context/RootStore';
import { AppPaths } from './Components/Pages/Router/AppPaths';

export const logLoader = async ({ request, params }: { request: Request, params: Params }) => {

  const data = request.bodyUsed ? request : request.body
  console.log('params_sill ', params)
  console.log('data_sill', data)
  return data
}
export const tabLoader = async () => {


  const data = ROOTSTORE.traverse().map(s => s.data)
  console.log('data', data.map(d => d.store))
  return data
}


//__                               router               


export const CommonRoutes: RouteObject[] = [
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
        path: '/',
        element: <AppPaths />,

      },
      {
        path: 'bento',
        element: <BentoLayoutPage />,
      },
      {
        path: 'sill',
        element: <SillPage />,

        action: ({ request, params }) => {
          const act = params.action
          console.log('act', act)
          const fd = request.formData()
          console.log('body: ', fd)
          return redirect('/sill')

        },
        loader: async ({ request, params }) => {

          const data = request

          return data
        },
        children: [

          {
            path: '/sill/groups/:group_id',
            loader: ({ params }) => {
              const group_id = params.group_id
              return group_id ? group_id : null
            },
            element: <GroupIdCard />,
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
]
export const router = createBrowserRouter(CommonRoutes)

function App() {

  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );
}

export default App;
