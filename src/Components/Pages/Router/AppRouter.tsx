import React, { PropsWithChildren } from 'react'
import { Route, Routes, createBrowserRouter } from 'react-router-dom'
import BentoLayoutPage from '../BentoLayoutPage'
import Homepage from '../Homepage'
import ErrorPage from '../ErrorPage'
import Root from './Root'

const APP_ROUTES = [

    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/bento',
                element: <BentoLayoutPage />,

            },
            {
                path: '/sill',
                element: <Homepage />,

            },
        ]
    },


]


// export const AppRouter = createBrowserRouter(APP_ROUTES, { basename: '/' })