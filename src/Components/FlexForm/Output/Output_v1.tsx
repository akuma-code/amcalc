import { observer } from 'mobx-react-lite'
import React, { useEffect, useState, useMemo } from 'react'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { ISizeFull, SizeFull } from '../../../Interfaces/CommonTypes'
import { InputsTypeEnum } from '../../../Hooks/useFormStateSelector'
import { SubjectDS } from '../../../Context/DataStore'
import { OutputSizeBlock, OutputSizeObserver } from '../../../Context/DataStoreObserver'
import { _ID } from '../../../Helpers/HelpersFns'
import OutputCard from './OutputCard'
import { Stack } from '@mui/material'

type OutputProps = {
    store?: ISizeFull[]
}
const fakeInit = [
    new SizeFull(1000, 1000),
    new SizeFull(800, 1200),
    new SizeFull(300, 400),
]


const StoreSizeObs = new SubjectDS<ISizeFull>()

const obs = new OutputSizeObserver('sizer')

StoreSizeObs.addObserver(obs)

const OutputVers1 = (props: OutputProps) => {
    // const { RootStore: { stores: { size_full } } } = useStoresContext()


    const saved = props.store || []
    const BLOCKS = useMemo(() => {
        return fakeInit.map(s => new OutputSizeBlock(s))
    }, [])
    // useEffect(() => {
    //     const saved = RootStore.stores['size_full']?.saved!
    //     setBlocks([...saved].map(s => new OutputSizeBlock(s)))
    // }, [RootStore.stores])
    // if (!size_full) return null
    return (
        <Stack maxHeight={'100%'}
            direction={'row'}
            maxWidth={'80vw'}
            gap={2}
            flexWrap={'wrap'}
            overflow={'auto'}>

            {
                [...saved, ...fakeInit].map(s =>
                    <OutputCard savedSize={s} key={_ID()} />
                )
            }
        </Stack>
    )
}
OutputVers1.displayName = '*** Output_v1 ***'
export default OutputVers1