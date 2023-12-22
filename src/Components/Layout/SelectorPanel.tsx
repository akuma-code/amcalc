import { AppBar, Box, Breadcrumbs, Divider, IconButton, Link, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Text } from '../UI/Text'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { ILayoutTypes } from '../../Context/ThemeView'
import BentoLayoutPage from '../Pages/BentoLayoutPage'
import { toJS } from 'mobx'
import { Link as RouterLink, useParams } from 'react-router-dom'
import AndroidIcon from '@mui/icons-material/Android';
import BentoIcon from '@mui/icons-material/Bento';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
type Props = {}

export const SelectorPanel = observer((props: Props) => {


    return (
        <Box sx={{ flexGrow: 1 }} top={0}>
            <AppBar position="sticky">
                <Toolbar variant='dense' sx={{
                    gap: 2, justifyContent: 'space-between', bgcolor: '#7688f1',
                    [`& .MuiBreadcrumbs-li`]: { fontFamily: 'Fira Code', fontWeight: 'bold' }
                }}>

                    <Breadcrumbs aria-label="breadcrumb">
                        <RouterLink to={'/'}>
                            <AndroidIcon />
                            Home
                        </RouterLink>
                        <RouterLink to={'/bento'}>
                            <BentoIcon />
                            Bento
                        </RouterLink>
                        <RouterLink to={'/sill'}>
                            <SignalCellularAltIcon />
                            Sill
                        </RouterLink>

                    </Breadcrumbs>
                    {/* <Divider orientation='vertical' flexItem variant='fullWidth' /> */}
                    <div className="flex flex-row  gap-10">

                        <RouterLink to={'/tabs'}>Tabs</RouterLink>
                        <RouterLink to={'/offset'}>Offset</RouterLink>
                    </div>



                </Toolbar>
            </AppBar>
        </Box >
    )
})

SelectorPanel.displayName = "***AppToolbar"