import { Grid } from '@mui/material'
import React, { useCallback, useMemo, useReducer, useState } from 'react'
import { IconButton } from '../UI/IconButton'
import Icons from '../Icons/SvgIcons'

import { _log } from '../../Helpers/HelpersFns'
import { FactoryDiv } from '../Templates/Factory'
import { useStoresContext } from '../Hooks/useStoresContext'
import { observer } from 'mobx-react-lite'
import { IC_ArgsList, Enum_NodesAction, FnKeys, IC_DataList } from '../../ActionComponents/ActionTypes/Types'
import { MainStore_ } from '../../mobXStore/MainStore'
import NodeForm from '../FlexForm/NodeForm'
import { CalcReducer } from '../../Redux/ActionReducer'
import { InitStateRedux, ReduxState } from '../../Redux/ReduxTypes'
import InputForm, { InputsFS, InputsO5 } from '../FlexForm/FullSizeForm'
import { MultiFormSelector } from '../FlexForm/MultiForms/MultiFormSelector'
import { InputsTypeEnum } from '../Hooks/useFormStateSelector'
import DynamicInputsForm from '../FlexForm/MultiForms/DynamicInputsForm'
import SizeFullForm from '../FlexForm/MultiForms/SizeFullForm'



type PageProps = {}

const test_div = (w: number, h: number, count?: number) => {
    return <div className={`w-[${w}em] h-[${h}em] bg-gray-500`}> |{count ?? 'BLANK'}| </div>
}

const d = FactoryDiv




const BentoLayoutPage: React.FC<PageProps> = observer(() => {
    d.logging = false
    const { RootStore } = useStoresContext()


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



                </Grid>
                <Grid key={'selector'}
                    sx={{ bgcolor: '#86a4a5' }}
                    xs={9}
                    justifyContent={'space-between'}
                    item
                    container
                    gap={2}
                    border={'2px solid yellow'} p={2}
                >

                    <IconButton
                        desc='FullSize'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                        onClickFn={() => RootStore.selectState(InputsTypeEnum.size_full)}
                    />
                    <IconButton
                        desc='OFFSET5'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                        onClickFn={() => RootStore.selectState(InputsTypeEnum.offset5)}
                    />
                    <IconButton
                        desc='Size'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                        onClickFn={() => RootStore.selectState(InputsTypeEnum.size_short)}
                    />


                    <IconButton
                        desc='Clear Current Store'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                    />

                </Grid>
            </Grid>


            <Grid container item spacing={2}>
                <Grid item key={'form'} xs={3} border={'2px solid red'} p={2}>

                    <DynamicInputsForm formStateType={RootStore.active_state} />
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

                    {/* <SizeFullForm getSize={(s) => RootStore.saveTostore(InputsTypeEnum.size_full, s)} /> */}

                </Grid>
            </Grid>

        </Grid>
    )
})
BentoLayoutPage.displayName = "____BENTO_____"
export default BentoLayoutPage
