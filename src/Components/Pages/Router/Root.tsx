import { Divider } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import { SelectorPanel } from '../../Layout/SelectorPanel'

type Props = {} & PropsWithChildren
const Root = (props: Props) => {



    return (
        <div>

            <SelectorPanel />
            <Divider sx={{ py: 2 }}>Routes Outlet</Divider>
            <Outlet />
        </div>
    )
}

export default Root