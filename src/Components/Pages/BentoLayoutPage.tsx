import { Grid } from '@mui/material'
import React, { useMemo, useReducer, useState } from 'react'
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
import MobxForm from '../FlexForm/MobxForm'
import InputForm, { InputsO5 } from '../FlexForm/FullSizeForm'
import { dto_formdata } from '../../Models/ArgsTypeModel'


type PageProps = {}

const test_div = (w: number, h: number, count?: number) => {
    return <div className={`w-[${w}em] h-[${h}em] bg-gray-500`}> |{count ?? 'BLANK'}| </div>
}

const d = FactoryDiv



const BentoLayoutPage: React.FC<PageProps> = observer(() => {
    d.logging = false
    const { InputStore } = useStoresContext()



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

                    {d.div(InputStore.inpType)}

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
                        onClickFn={() => InputStore.changeInpType('size_full')}
                    />
                    <IconButton
                        desc='OFFSET5'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                        onClickFn={() => InputStore.changeInpType('offset5')}
                    />
                    <IconButton
                        desc='Size'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                        onClickFn={() => InputStore.changeInpType('size')}
                    />
                    <IconButton
                        desc='NOT READY'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                    />

                </Grid>
            </Grid>


            <Grid container item spacing={2}>
                <Grid item key={'form'} xs={3} border={'2px solid red'} p={2}>
                    {/* {CURRENT && <DTOForm initState={CURRENT?.initState} submitFn={saveResult} type={action_type!} />} */}
                    {/* <MobxForm submitInputs={(inputs) => saveResult(inputs)} /> */}
                    {/* <InputForm  {...InputStore.get_form_data(InputStore.inpType)} /> */}
                    {/* <InputForm fields={['width', 'height']} init={{ width: 0, height: 0 }} /> */}
                    <InputsO5 />
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



                </Grid>
            </Grid>

        </Grid>
    )
})
BentoLayoutPage.displayName = "____BENTO_____"
export default BentoLayoutPage
