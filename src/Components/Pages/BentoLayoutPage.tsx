import { Grid } from '@mui/material'
import React from 'react'

import { observer, } from 'mobx-react-lite'
import { _log } from '../../Helpers/HelpersFns'
import { useStoresContext } from '../../Hooks/useStoresContext'
import DynamicInputsForm from '../FlexForm/MultiForms/DynamicInputsForm'
import OutputVers1 from '../FlexForm/Output/Output_v1'
import Output2 from '../FlexForm/Output/Output_v2'
import { FactoryDiv } from '../Templates/Factory'
import { FCButtonsGroup } from '../UI/FCButtonGroup'
import { OutputTabs } from '../UI/OutputTabs'
import OutputSizeTab from '../UI/Tabs/OutputSizeTab'
import { ViewControlButtonGroup } from '../UI/ViewControlButtonGroup'
import { InfoBox } from './InfoBox'




type PageProps = {}







const BentoLayoutPage: React.FC<PageProps> = observer(() => {

    const { RootStore } = useStoresContext()






    // const clearFn = () => { RootStore.stores && RootStore.stores[InputStore.inpType]?.clear() }
    return (
        <Grid container spacing={2} minHeight={160} maxWidth={'90vw'} key={'MainGridContainer'}
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
                    sx={{ bgcolor: '#7b8b8ba7' }}
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


            <Grid container item spacing={2} sx={{ '& .MuiGrid-container.MuiGrid-item': { p: 0, m: 0 } }}>
                <Grid item key={'form'} xs={3} border={'2px solid red'} >

                    <DynamicInputsForm />


                </Grid>



                <Grid width={'100%'} xs={9} item container
                    key={'output'}
                    sx={{
                        bgcolor: '#d4e0c0',
                    }}
                    border={'2px solid green'}
                >

                    {/* <VisibleControlBotton /> */}

                    <OutputTabs
                        size_tab={<OutputVers1 store={RootStore.stores.size_full!.store} />}
                        offset_tab={<Output2 />}
                        size2_tab={<OutputSizeTab size_args={RootStore.stores.size_full!.store} />}
                    />

                </Grid>
            </Grid>

        </Grid >
    )
})


BentoLayoutPage.displayName = "____BENTO_____"
export default BentoLayoutPage
