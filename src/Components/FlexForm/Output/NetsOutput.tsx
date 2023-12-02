import React, { useState, useEffect } from 'react'
import { SizeFull, SizeShort } from '../../../Interfaces/CommonTypes'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { observer } from 'mobx-react-lite'
import { Box, Button, ButtonGroup } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { CardViewState, OutputContext } from '../../../Hooks/useOutputCtx'
import { Stack } from '@mui/system'
import { NetsCard, ViewNetsState } from './NetsCard'
import Icons from '../../Icons/SvgIcons'
import { StringsIterator } from '../../../ActionComponents/ActionModels/FnGenerator'
import OutputCard from './OutputCard'
import { InputsTypeEnum } from '../../../Hooks/useFormStateSelector'


export type CardViewMode = 'skf' | 'simple' | 'both'
export enum NetViewEn {
    skf = 'СКФ',
    simple = 'Простая',
    both = 'Обе сразу',
}

type NetOutputProps = {

}

const testsaved = [
    new SizeFull(100, 100),
    new SizeFull(600, 800),
    new SizeFull(300, 500),
]
const view_modes: CardViewMode[] = ['skf', 'simple', 'both']
const ViewModesIterator = new StringsIterator(...view_modes)

const NetsOutput: React.FC<NetOutputProps> = observer(() => {

    const { RootStore, ThemeView } = useStoresContext()
    const [view, setView] = useState<CardViewState>(ThemeView.Options_Nets_out)
    // const { mode, show } = useOutputContext()
    const updateOptions = (mode: CardViewMode) => {
        const { simple, skf } = selectView(mode)
        ThemeView.options('Options_Nets_out', { mode, show: { simple, skf } })

    }
    const saved = RootStore.stores.size_full?.saved || []
    // const CalcedNets = testsaved.map(nets)
    function toggleView() {
        const next_type = ViewModesIterator.next()

        setView(prev => ({ ...prev, mode: next_type, ...selectView(next_type) }))
        updateOptions(next_type)
    }


    const test = () => console.log('stores: ', { ...RootStore.stores })

    useEffect(() => {

        setView(prev => ({ ...prev, show: selectView(view.mode) }))


    }, [view.mode])
    return (
        <Box sx={{ maxHeight: '70vh', width: '100%' }} display={'flex'} flexDirection={'column'}>

            <ButtonGroup sx={{ alignSelf: 'end' }}
                variant="outlined" aria-label="outlined button group">
                <Button
                    onClick={toggleView}
                >
                    Toggle View to {next_view(view.mode)}
                </Button>
                <Button disabled
                    onClick={() => updateOptions(view.mode)}
                >Update Options
                </Button>
                <Button
                    onClick={test}
                >{Icons.defaultIcon}</Button>
            </ButtonGroup>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" >
                <OutputCard savedSize={new SizeShort(300, 550)} viewOptions={{ showSkf: true, showSimple: false }} />
                {testsaved.map((size, idx) =>
                    <NetsCard size={size} idxCounter={idx} key={_ID()} />
                )}
            </Stack>

        </Box>
    )
})

export const next_view = (view_mode: CardViewState['mode']) => {
    const order = ['skf', 'simple', 'both'] as const
    const fi = order.findIndex(i => i === view_mode)
    const next_type = order[fi + 1] ? order[fi + 1] : order[0]
    return next_type
}

export const selectView = (viewMode: CardViewMode): ViewNetsState => {
    let result: Partial<ViewNetsState> = {}
    switch (viewMode) {
        case 'skf': { result = { ...result, skf: true, simple: false }; break }
        case 'simple': { result = { ...result, skf: false, simple: true }; break }
        case 'both': { result = { ...result, skf: true, simple: true }; break }
        // default: result = { ...result, skf: false, simple: false }
    }
    return result as ViewNetsState
}



NetsOutput.displayName = '***NetsOutput***'
export default NetsOutput