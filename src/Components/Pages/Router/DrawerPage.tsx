import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const DrawerPage = (props: Props) => {
    return (
        <div>
            <div>DrawerPage</div>
            <Outlet />
        </div>
    )
}

export default DrawerPage