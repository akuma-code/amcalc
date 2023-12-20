import { AppBar, Box, Breadcrumbs, IconButton, Link, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Text } from '../UI/Text'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { ILayoutTypes } from '../../Context/ThemeView'
import BentoLayoutPage from '../Pages/BentoLayoutPage'
import { toJS } from 'mobx'
import { Link as RouterLink, useParams } from 'react-router-dom'


type Props = {}

export const SelectorPanel = observer((props: Props) => {
    const [lo, setLo] = useState<ILayoutTypes['path']>('home')
    const { ViewConfig } = useStoresContext()
    const { params } = useParams()
    const changeLO = (e: React.MouseEvent<HTMLElement>, value: ILayoutTypes['path']) => {

        console.log('value', value)
        ViewConfig.setLayout(value)
    }
    return (
        <Box sx={{ flexGrow: 1 }} top={0}>
            <AppBar position="sticky">
                <Toolbar variant='dense' sx={{
                    gap: 2, justifyContent: 'space-around',
                    [`& .MuiToggleButton-root`]: { bgcolor: '#061f3b', color: '#fff', border: '2px solid white', py: 1, my: 0.5 },
                }}>
                    {/* <ToggleButtonGroup orientation='horizontal'
                        sx={{
                            gap: 1,
                            // [`& .MuiToggleButton-root`]: { bgcolor: '#061f3b', color: '#fff', border: '2px solid white', py: 1, my: 0.5 },
                        }}>
                        <ToggleButton value={'bento'} href='/bento' >Bento</ToggleButton>
                        <ToggleButton value={'sill'} href='/sill'>Sill</ToggleButton>
                    </ToggleButtonGroup> */}
                    <Breadcrumbs aria-label="breadcrumb">
                        <RouterLink to={'/'}>Home</RouterLink>
                        <RouterLink to={'/bento'}>Bento</RouterLink>
                        <RouterLink to={'/sill'}>Sill</RouterLink>

                    </Breadcrumbs>
                    <Text>Layout: {toJS(params)}</Text>


                </Toolbar>
            </AppBar>
        </Box >
    )
})

SelectorPanel.displayName = "***AppToolbar"