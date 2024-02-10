import { Container, Divider, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useStoresContext } from '../../../../Hooks/useStoresContext'
import FrameViewCard from './FrameViewCard'
import { NotFoundPage } from './NotFoundPage'
type FrameListProps = {}

export const FrameList = observer((props: FrameListProps) => {

    const { NodeStore } = useStoresContext()

    const list = useMemo(() => {
        return NodeStore.list()
    }, [NodeStore.nodes])


    if (NodeStore.nodes.length < 1) return (

        <NotFoundPage message='Nodes list is empty! You have to create frame...' />
    )
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


FrameList.displayName = '*** ___Frame List Page'