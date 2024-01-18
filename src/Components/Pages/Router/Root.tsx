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

    // const { ViewConfig, SheetStore } = useStoresContext()

    // _log("fetchcount: ", fetchValue)
    return (
        <div>
            <SelectorPanel />
            <Outlet />
        </div>
    )
}

export default Root