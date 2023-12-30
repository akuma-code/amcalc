import { Divider } from '@mui/material'
import { PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLoaderData, useNavigation, useRouteLoaderData } from 'react-router-dom'
import { SelectorPanel } from '../../Layout/SelectorPanel'

type Props = {} & PropsWithChildren
const Root = (props: Props) => {

    // const { data } = useLoaderData() as { data: Request }
    const { data } = useRouteLoaderData('root_elem') as { data: Request }

    const nav = useNavigation()
    const { formData, location, state, json } = nav

    data && console.log('rdata: ', data)
    const s = location?.state

    return (
        <div>

            <SelectorPanel />
            <Divider sx={{ py: 1 }}>{state}</Divider>
            <Outlet />
        </div>
    )
}

export default Root