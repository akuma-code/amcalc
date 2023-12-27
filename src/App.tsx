import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './App.css';
import { SelectorPanel } from './Components/Layout/SelectorPanel';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import ErrorPage from './Components/Pages/ErrorPage';
import SillPage from './Components/Pages/SillPage';
import './input.css';
import Root from './Components/Pages/Router/Root';
import { _ID, _log } from './Helpers/HelpersFns';
import { OutputTabs } from './Components/UI/OutputTabs';
import OutputVers1 from './Components/FlexForm/Output/Output_v1';
import Output2 from './Components/FlexForm/Output/Output_v2';
import { ROOTSTORE } from './Context/RootStore';
import SillForm from './Components/Pages/Router/SillForm';
import SillFormGroups from './Components/Pages/Router/SillFormGroups';
import { useLayoutEffect } from 'react';

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
        // loader: async ({ params, request }) => {
        //   const data = await request
        //   const par = params
        //   console.log('request', data)
        //   console.log('params', par)
        //   return null
        // },
        children: [
          {
            path: 'groups',
            element: <SillFormGroups />,
            // action: async ({ request, params }) => {
            //   const fd = await request.formData()

            //   console.log('fd', fd)

            //   const groupId = _ID()
            //   const groups = { _groupId: groupId, grs: Object.fromEntries(fd) }
            //   console.log('groups: ', groups)

            //   redirect('/sill/groups')
            //   return { fd }
            // },

          }
        ],
        errorElement: <ErrorPage />

      },
      {
        path: '/tabs',
        element: <OutputTabs />,
        // loader: tabLoader
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
