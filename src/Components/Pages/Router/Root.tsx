import { Divider } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Outlet, useNavigation, useRouteLoaderData } from 'react-router-dom'
import { SelectorPanel } from '../../Layout/SelectorPanel'

type Props = {} & PropsWithChildren
const Root = (props: Props) => {

    // const { data } = useLoaderData() as { data: Request }
    const { data } = useRouteLoaderData('root_elem') as { data: Request }

    const nav = useNavigation()
    const { formData, location, state, json } = nav

    data && console.log('root_data: ', data)
    const s = location?.state

    return (
        <div>

            <SelectorPanel />
            <Divider sx={{ py: 1, my: 1 }}></Divider>
            <Outlet />
        </div>
    )
}

export default Root