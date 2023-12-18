import { Box, Grid } from '@mui/material'
import React, { useCallback } from 'react'

import { observer, } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { ArgsTypes } from '../../Models/ArgsTypeModel'
import DynamicInputsForm from '../FlexForm/MultiForms/DynamicInputsForm'
import OutputVers1 from '../FlexForm/Output/Output_v1'
import Output2 from '../FlexForm/Output/Output_v2'
import { FactoryDiv } from '../Templates/Factory'
import { FCButtonsGroup } from '../UI/FCButtonGroup'
import { OutputTabs } from '../UI/OutputTabs'
import { VisibleControlBotton } from '../UI/VisibleControlButton'
import { InfoBox } from './InfoBox'
import { ViewControlButtonGroup } from '../UI/ViewControlButtonGroup'




type PageProps = {}

const test_div = (w: number, h: number, count?: number) => {
    return <div className={`w-[${w}em] h-[${h}em] bg-gray-500`}> |{count ?? 'BLANK'}| </div>
}

const d = FactoryDiv




const BentoLayoutPage: React.FC<PageProps> = observer(() => {
    d.logging = false
    const { RootStore, ViewConfig } = useStoresContext()



    const clearStore = useCallback((store_id: ArgsTypes) => RootStore.select(store_id).clear(), [RootStore])



    // const clearFn = () => { RootStore.stores && RootStore.stores[InputStore.inpType]?.clear() }
    return (
        <Grid container spacing={2} minHeight={160} maxWidth={'85vw'} key={'MainGridContainer'}
            sx={{
                bgcolor: '#cffafc',
                m: 2,
                // p: 1,
            }}>
            <Grid container item spacing={2} maxHeight={250}>
                <Grid item key={'info'}
                    sx={{ bgcolor: '#3cdbe0' }}
                    xs={3}
                    border={'2px solid blue'} p={2}
                >


                    <InfoBox items={RootStore.storesSize()} />


                </Grid>
                <Grid key={'selector'}
                    sx={{ bgcolor: '#86a4a5a7' }}
                    xs={9}
                    item
                    container
                    gap={2}
                    justifyContent={'space-between'}
                >
                    <Grid item
                        alignSelf={'flex-start'}
                    >
                        <ViewControlButtonGroup />
                    </Grid>

                </Grid>
            </Grid>


            <Grid container item spacing={2} >
                <Grid item key={'form'} xs={3} border={'2px solid red'} >
                    <FCButtonsGroup />
                    <DynamicInputsForm />


                </Grid>
                <Grid item={true} maxWidth={'fit-content'}
                    key={'output'}
                    sx={{ bgcolor: '#a9f135', position: 'relative', p: 0, m: 0 }}
                    xs={9}
                    border={'2px solid green'}
                >

                    {/* <VisibleControlBotton /> */}
                    <OutputTabs
                        size_elem={<OutputVers1 store={RootStore.stores.size_full!.store} />}
                        offset_elem={<Output2 />}
                    />


                </Grid>
            </Grid>

        </Grid >
    )
})


BentoLayoutPage.displayName = "____BENTO_____"
export default BentoLayoutPage
