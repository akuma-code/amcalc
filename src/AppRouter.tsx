import { Params, RouteObject, createBrowserRouter, redirect } from 'react-router-dom';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import ErrorPage from './Components/Pages/ErrorPage';
import { AppPaths } from './Components/Pages/Router/AppPaths';
import { FrameList } from './Components/Pages/Router/DrawerImage/FrameList';
import { FrameView } from './Components/Pages/Router/DrawerImage/FrameView';
import { DrawerPage } from './Components/Pages/Router/DrawerPage';
import { PrintPage } from './Components/Pages/Router/PrintPage';
import Root from './Components/Pages/Router/Root';
import { TestPage } from './Components/Pages/Router/TestPage';
import SillPage from './Components/Pages/SillPage';
import { GroupIdCard } from './Components/UI/SillGroupView';
import { ROOTSTORE } from './Context/RootStore';
import { pageRoutes } from './HTTP/PATHS';
import { DrawerStepCreator } from './Models/FrameComponent/CreateFrameStepper/FrameCreateStepper';
import { BlankDataPage } from './Components/Pages/BlankDataPage';




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
        path: pageRoutes.root,
        element: <Root />,
        id: 'root_elem',
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <AppPaths />,
            },
            {
                path: pageRoutes.bento,
                element: <BentoLayoutPage />,
            },
            {
                path: pageRoutes.test,
                element: <TestPage />,
            },
            {
                path: pageRoutes.test,
                element: <TestPage />,
            },
            {
                path: pageRoutes.drawer,
                element: <DrawerPage />,
                children: [
                    // {
                    //     path: pageRoutes.imgout,
                    //     element: <DrawerImage />,
                    //     loader: async ({ params }) => {
                    //         // _log(request.body)
                    //         const data = await params.state
                    //         // _log(data)
                    //         return { data }
                    //     },
                    // },
                    {
                        path: pageRoutes.frames,
                        element: <FrameList />,
                        action: async ({ request, params }) => {
                            const res = await request.json()
                            // console.log('res:', res)
                            return res
                        },
                    },
                    {
                        path: pageRoutes.frameId,
                        element: <FrameView />,
                        loader: ({ params }) => {
                            const { id } = params as { id?: string }
                            return { id }
                        }
                    },



                ],
                action: async ({ request, params }) => {
                    const res = await request.json()
                    console.log('res:', res)
                    return res
                },
            },
            {
                path: pageRoutes.drawerCreate,
                element: <DrawerStepCreator />
            },
            {
                path: pageRoutes.sill,
                element: <SillPage />,

                action: ({ request, params }) => {
                    const act = params.action;
                    console.log('act', act);
                    const fd = request.formData();
                    console.log('body: ', fd);
                    return redirect('/sill');

                },
                loader: async ({ request, params }) => {

                    const data = request;

                    return data;
                },
                children: [
                    {
                        path: pageRoutes.groups,
                        loader: ({ params }) => {
                            const group_id = params.group_id;
                            return group_id ? group_id : null;
                        },
                        element: <GroupIdCard />,
                    },
                ],
            },
            {
                path: pageRoutes.getapp,
                element: <BlankDataPage />,
                // loader: scriptAppLoader
            },
            {
                path: pageRoutes.print,
                element: <PrintPage />
            },

        ]
    },

];
export const router = createBrowserRouter(CommonRoutes);
