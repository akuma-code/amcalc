import AndroidIcon from '@mui/icons-material/Android'
import BentoIcon from '@mui/icons-material/Bento'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import DescriptionIcon from '@mui/icons-material/Description';
import { AppBar, Box, Breadcrumbs, Toolbar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Link as RouterLink } from 'react-router-dom'
type Props = {}

export const SelectorPanel = observer((props: Props) => {


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
                    <div className="flex flex-row  gap-10">

                        <RouterLink to={ '/tabs' }>Tabs</RouterLink>
                        <RouterLink to={ '/offset' }>Offset</RouterLink>
                    </div>



                </Toolbar>
            </AppBar>
        </Box >
    )
})

SelectorPanel.displayName = "***AppToolbar"