import React, { PropsWithChildren } from 'react'
import { Route, Routes } from 'react-router-dom'
import BentoLayoutPage from '../BentoLayoutPage'
import Homepage from '../Homepage'



export const AppRouter: React.FC<PropsWithChildren> = ({ children }) => {
    const APP_ROUTES = [

        {
            path: '/bento',
            elem: <BentoLayoutPage />
        },
        {
            path: '/sill',
            elem: <Homepage />
        },
        {
            path: '/',
            elem: <BentoLayoutPage />
        },

    ]

    return <Routes >
        {
            APP_ROUTES.map(r =>
                <Route element={r.elem} path={r.path} key={r.path} />
            )
        }

    </Routes>

}