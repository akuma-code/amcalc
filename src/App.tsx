import { Params, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

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
import { GroupList } from './Components/UI/SillStoreCard';
import { GroupIdCard } from './Components/UI/SillGroupView';
import { SelectorPanel } from './Components/Layout/SelectorPanel';

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

        action: ({ request, params }) => {
          const act = params.action
          console.log('act', act)
          const fd = request.formData()
          console.log('body: ', fd)
          return redirect('/sill')

        },
        loader: async ({ request, params }) => {

          const data = request
          // console.log('params_sill ', params)
          // console.log('data_sill', data)
          return data
        },
        children: [
          // {
          //   path: '/sill',
          //   element: <SillFormHooked />,
          //   errorElement: <ErrorPage />,

          // },
          {
            path: '/sill/groups/:group_id',
            loader: ({ params }) => {
              const group_id = params.group_id
              // console.log('group_id', group_id)
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
])

function App() {
  // useLayoutEffect(() => {
  //   setTimeout(console.clear, 0)
  //   return () => console.clear()
  // }, [])
  return (
    <div>
      {/* <SelectorPanel /> */}
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  );
}

export default App;
