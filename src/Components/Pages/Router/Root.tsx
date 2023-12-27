import { Divider } from '@mui/material'
import { PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLoaderData, useNavigation } from 'react-router-dom'
import { SelectorPanel } from '../../Layout/SelectorPanel'

type Props = {} & PropsWithChildren
const Root = (props: Props) => {

    const data = useLoaderData()
    const [url, seturl] = useState("")
    data && console.log('data: ', data)
    const nav = useNavigation()
    const { formData, location, state } = nav

    return (
        <div>

            <SelectorPanel />
            <Divider sx={{ py: 1 }}>{state || ""}</Divider>
            <Outlet />
        </div>
    )
}

export default Root