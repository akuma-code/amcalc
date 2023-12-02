import { Button, ButtonGroup, Grid, Stack } from '@mui/material'
import React, { useMemo, useCallback } from 'react'

import { _log } from '../../Helpers/HelpersFns'
import { FactoryDiv } from '../Templates/Factory'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { observer } from 'mobx-react-lite'
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector'
import DynamicInputsForm from '../FlexForm/MultiForms/DynamicInputsForm'
import NetsOutput from '../FlexForm/Output/NetsOutput'
import { InfoBox } from './InfoBox'
import { CardViewState } from '../../Hooks/useOutputCtx'
import { MockServer } from '../Templates/FakeServer'



type PageProps = {}

const test_div = (w: number, h: number, count?: number) => {
    return <div className={`w-[${w}em] h-[${h}em] bg-gray-500`}> |{count ?? 'BLANK'}| </div>
}

const d = FactoryDiv




const BentoLayoutPage: React.FC<PageProps> = observer(() => {
    d.logging = false
    const { RootStore } = useStoresContext()

    function toggleView(view: CardViewState) {
        const order = ['skf', 'simple', 'both'] as const
        const fi = order.findIndex(i => i === view.mode)
        const net_type = order[fi + 1] ? order[fi + 1] : order[0]

    }
    const isSelected = useCallback((input_store: InputsTypeEnum) => input_store === RootStore.active_store,
        [RootStore.active_store])
    const ControlButtonsGroup = useMemo(() => {
        const Group = () => <ButtonGroup sx={{ mx: 1, gap: 1, width: 200 }}
            variant="contained"
            size='large'

            component={Stack}
        >
            <Button fullWidth={true}
                onClick={() => RootStore.selectState(InputsTypeEnum.size_full)}
                color={isSelected(InputsTypeEnum.size_full) ? 'primary' : 'success'}
                sx={isSelected(InputsTypeEnum.size_full) ? { outline: '2px solid red' } : { outline: 'none' }}
            >
                Size Full
            </Button>
            <Button onClick={() => RootStore.selectState(InputsTypeEnum.size_short)}
                color={isSelected(InputsTypeEnum.size_short) ? 'primary' : 'success'}
                sx={isSelected(InputsTypeEnum.size_short) ? { outline: '2px solid red' } : { outline: 'none' }}>
                Size Short
            </Button>
            <Button onClick={() => RootStore.selectState(InputsTypeEnum.offset5)}
                color={isSelected(InputsTypeEnum.offset5) ? 'primary' : 'success'}
                sx={isSelected(InputsTypeEnum.offset5) ? { outline: '2px solid red' } : { outline: 'none' }}>
                Offset5
            </Button>
        </ButtonGroup>

        return Group
    }, [RootStore, isSelected])
    // const clearFn = () => { RootStore.stores && RootStore.stores[InputStore.inpType]?.clear() }
    return (
        <Grid container spacing={2} minHeight={160} maxWidth={'85vw'} key={'MainGridContainer'}
            sx={{
                bgcolor: '#cffafc',
                m: 2,
                p: 1,
            }}>
            <Grid container item spacing={2} maxHeight={250}>
                <Grid item key={'info'}
                    sx={{ bgcolor: '#3cdbe0' }}
                    xs={3}
                    border={'2px solid blue'} p={2}
                >


                    <InfoBox />

                </Grid>
                <Grid key={'selector'}
                    sx={{ bgcolor: '#86a4a5a7' }}
                    xs={9}
                    item
                    container
                    gap={2}
                    p={2}
                >

                    <ControlButtonsGroup />

                </Grid>
            </Grid>


            <Grid container item spacing={2}>
                <Grid item key={'form'} xs={3} border={'2px solid red'} p={2}>

                    <DynamicInputsForm formStateType={RootStore.active_store} />


                </Grid>
                <Grid item container
                    key={'output'}
                    sx={{ bgcolor: '#a9f135' }}
                    xs={9}
                    border={'2px solid green'} p={2}
                    direction={'row'}
                    maxHeight={'80vh'}
                    maxWidth={'80vw'}
                    gap={2}
                    flexWrap={'wrap'}
                    overflow={'auto'}
                >

                    <NetsOutput />

                </Grid>
            </Grid>

        </Grid>
    )
})


BentoLayoutPage.displayName = "____BENTO_____"
export default BentoLayoutPage
