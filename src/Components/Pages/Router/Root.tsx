import React, { PropsWithChildren } from 'react'
import BentoLayoutPage from '../BentoLayoutPage'
import { SelectorPanel } from '../../Layout/SelectorPanel'
import { Outlet } from 'react-router-dom'

type Props = {} & PropsWithChildren

const Root = (props: Props) => {
    return (
        <div>

            <SelectorPanel />
            <Outlet />
        </div>
    )
}

export default Root