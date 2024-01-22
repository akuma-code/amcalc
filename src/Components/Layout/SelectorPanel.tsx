import AndroidIcon from '@mui/icons-material/Android';
import BentoIcon from '@mui/icons-material/Bento';
import DescriptionIcon from '@mui/icons-material/Description';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { AppBar, Box, Breadcrumbs, CircularProgress, Fab, Toolbar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useIsFetching } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { SettingsDialog } from '../UI/SettingsPanel';
import { pageRoutes } from '../../HTTP/PATHS';
import { useStoresContext } from '../../Hooks/useStoresContext';
import BugReportIcon from '@mui/icons-material/BugReport';



type Props = {}

export const SelectorPanel = observer((props: Props) => {
    const { ViewConfig } = useStoresContext()
    const viteoFetchCount = useIsFetching()


    return (
        <Box sx={ { flexGrow: 1 } } top={ 0 }>
            <AppBar position="sticky">
                <Toolbar variant='dense' sx={ {
                    gap: 2, justifyContent: 'space-between', bgcolor: '#7688f1',
                    [`& .MuiBreadcrumbs-li`]: { fontFamily: 'Fira Code', fontWeight: 'bold' }
                } }>

                    <Breadcrumbs aria-label="breadcrumb">
                        <RouterLink to={ pageRoutes.root }>
                            <AndroidIcon />
                            Home
                        </RouterLink>
                        <RouterLink to={ pageRoutes.bento }>
                            <BentoIcon />
                            Bento
                        </RouterLink>
                        <RouterLink to={ pageRoutes.sill }>
                            <SignalCellularAltIcon />
                            Sill
                        </RouterLink>
                        <RouterLink to={ pageRoutes.getapp }>
                            <DescriptionIcon />
                            GetApp
                        </RouterLink>
                        <RouterLink to={ pageRoutes.test }>
                            <BugReportIcon />
                            <strong>Test Page</strong>
                        </RouterLink>
                        <RouterLink to={ pageRoutes.drawer }>

                            <strong>DrawerCanvas</strong>
                        </RouterLink>

                    </Breadcrumbs>
                    {/* <Divider orientation='vertical' flexItem variant='fullWidth' /> */ }
                    <div className="flex flex-row  flex-grow-0 gap-4">
                        { viteoFetchCount !== 0 && ViewConfig.globalFetching &&
                            <CircularFetchViewProgress counter={ viteoFetchCount } />
                        }
                        <SettingsDialog />
                    </div>

                </Toolbar>
            </AppBar>
        </Box >
    )
})

SelectorPanel.displayName = "***AppToolbar"

const CircularFetchViewProgress = ({ counter }: { counter: number }) => {

    return (
        <Box sx={ { m: .3, position: 'relative' } }>
            <Fab size='small'
                aria-label="save"
                sx={ { color: 'green' } }
            >
                <b>{ counter }</b>
            </Fab>

            <CircularProgress

                size={ 52 }
                sx={ {
                    color: `red`,
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                } }
            />

        </Box>
    )
}