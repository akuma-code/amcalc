import { Divider } from '@mui/material'
import { PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import { SelectorPanel } from '../../Layout/SelectorPanel'

type Props = {} & PropsWithChildren
const Root = (props: Props) => {

    const data = useLoaderData()
    const [url, seturl] = useState("")

    // useEffect(() => {
    //     let dataURL: URL;
    //     if (data && typeof data === 'object' && 'url' in data) dataURL = data.url as URL
    //     seturl(prev => dataURL.pathname)
    //     return () => seturl(prev => dataURL.pathname)
    // }, [data])

    return (
        <div>

            <SelectorPanel />
            <Divider sx={{ py: 1 }}>{url || ""}</Divider>
            <Outlet />
        </div>
    )
}

export default Root