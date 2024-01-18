import AndroidIcon from '@mui/icons-material/Android'
import BentoIcon from '@mui/icons-material/Bento'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import DescriptionIcon from '@mui/icons-material/Description';
import { AppBar, Box, Breadcrumbs, CircularProgress, Fab, LinearProgress, Toolbar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Link as RouterLink } from 'react-router-dom'
import { useIsFetching } from 'react-query';
import { _log } from '../../Helpers/HelpersFns';
import SettingsIcon from '@mui/icons-material/Settings';
import { BasicModal } from '../UI/BasicModal';
import { SettingsPanel } from '../UI/SettingsPanel';
type Props = {}

export const SelectorPanel = observer((props: Props) => {
    const viteoFetchCount = useIsFetching()
    const isoFetchCount = useIsFetching('isolite')

    return (
        <Box sx={ { flexGrow: 1 } } top={ 0 }>
            <AppBar position="sticky">
                <Toolbar variant='dense' sx={ {
                    gap: 2, justifyContent: 'space-between', bgcolor: '#7688f1',
                    [`& .MuiBreadcrumbs-li`]: { fontFamily: 'Fira Code', fontWeight: 'bold' }
                } }>

                    <Breadcrumbs aria-label="breadcrumb">
                        <RouterLink to={ '/' }>
                            <AndroidIcon />
                            Home
                        </RouterLink>
                        <RouterLink to={ '/bento' }>
                            <BentoIcon />
                            Bento
                        </RouterLink>
                        <RouterLink to={ '/sill' }>
                            <SignalCellularAltIcon />
                            Sill
                        </RouterLink>
                        <RouterLink to={ '/getapp' }>
                            <DescriptionIcon />
                            GetApp
                        </RouterLink>

                    </Breadcrumbs>
                    {/* <Divider orientation='vertical' flexItem variant='fullWidth' /> */ }
                    <div className="flex flex-row  flex-grow">
                        { viteoFetchCount !== 0 &&
                            <CircularFetchViewProgress counter={ viteoFetchCount } />
                        }

                        {

                            //  isoFetchCount > 0 &&
                            //     <CircularFetchViewProgress counter={ isoFetchCount } />
                        }
                    </div>

                    <BasicModal title='Options' variant='icon' button_label='fff'>
                        <SettingsPanel />
                    </BasicModal>

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