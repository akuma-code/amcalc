import { observer } from 'mobx-react-lite'
import React, { useMemo, useState } from 'react'
import { useStoresContext } from '../../../../Hooks/useStoresContext'
import { Box, Container, Divider, Paper, Stack } from '@mui/material'
import { _FrameStateWithNodes } from '../DrawerPage'
import FrameViewCard from './FrameViewCard'
import { Text } from '../../../UI/Text'
import { NavLink } from 'react-router-dom'
import { pageRoutes } from '../../../../HTTP/PATHS'
import ReplyIcon from '@mui/icons-material/Reply';
type FrameListProps = {}

export const FrameList = observer((props: FrameListProps) => {

    const { NodeStore } = useStoresContext()

    const list = useMemo(() => {
        return NodeStore.list()
    }, [NodeStore.nodes])


    if (NodeStore.nodes.length < 1) return (
        <Box
            component={ Paper }
            sx={ { bgcolor: '#fc6af4', py: 2, m: 5, textTransform: 'full-width', textAlign: 'center', } }
        >
            <NavLink to={ '/' + pageRoutes.drawer } >
                <Text >Saved frames not found! Try to create new frame... </Text>
                <ReplyIcon />
            </NavLink>
        </Box>)
    return (
        <Container disableGutters sx={ { mt: 4 } } maxWidth='xl'>
            <Divider sx={ { mb: 1 } }>
                <h3 className='text-center text-4xl'>Frames List</h3>
            </Divider>
            <Stack direction={ 'row' } useFlexGap gap={ 2 } flexGrow={ 1 } flexWrap={ 'wrap' } display={ 'flex' }>
                { list.map(n =>
                    <FrameViewCard frame={ n } key={ n.id } />
                ) }

            </Stack>
        </Container>
    )
})



const nodeInfo = (frame: _FrameStateWithNodes) => {
    const { type, size: { width, height }, pos, id, nodes } = frame;



    return <div className='flex flex-col gap-2 m-2 border-2 w-fit flex-wrap mt-4 justify-items-stretch' key={ id }>
        <b>ID: { id }</b>
        <div>

            <b>TYPE: </b> <span>{ type }</span>
        </div>
        <div>

            <b>SIZE: </b> <span>{ width }x{ height }</span>
        </div>
    </div>
}

FrameList.displayName = '*** ___Frame List Page'