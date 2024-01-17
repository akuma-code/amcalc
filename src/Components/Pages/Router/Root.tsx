import { Divider } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Outlet, useNavigation, useRouteLoaderData } from 'react-router-dom'
import { SelectorPanel } from '../../Layout/SelectorPanel'
import { AppPaths } from './AppPaths'
import { useIsFetching, useQuery } from 'react-query'
import { Loading } from '../Loading'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { _log } from '../../../Helpers/HelpersFns'

type Props = {} & PropsWithChildren
const Root = (props: Props) => {
    const fetchValue = useIsFetching(['ssheet'])
    const { isLoading } = useQuery('ssheet')
    const { ViewConfig } = useStoresContext()

    // _log("fetchcount: ", fetchValue)
    return (
        <div>

            <SelectorPanel />

            {/* { ViewConfig.globalFetching ? <Loading /> : <Divider sx={ { py: 1, my: 1 } }></Divider> } */ }
            <Outlet />
        </div>
    )
}

export default Root