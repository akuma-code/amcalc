import { Box, Button, ButtonGroup, Grid } from '@mui/material'
import React, { FC, useCallback } from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { observer, } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { LABELS_LIST } from '../../Interfaces/Enums'
import { ArgsTypes } from '../../Models/ArgsTypeModel'
import DynamicInputsForm from '../FlexForm/MultiForms/DynamicInputsForm'
import OutputVers1 from '../FlexForm/Output/Output_v1'
import Output2 from '../FlexForm/Output/Output_v2'
import { FactoryDiv } from '../Templates/Factory'
import { FCButtonsGroup } from '../UI/FCButtonGroup'
import { OutputTabs } from '../UI/OutputTabs'
import VisibleControlBotton from '../UI/VisibleControlButton'
import { InfoBox } from './InfoBox'




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
                    pb={2}
                    pr={2}
                    justifyContent={'space-between'}
                    
                >
                    <Box sx={{position:'relative' ,display:'flex', flexDirection:'row', alignItems:'center'}}>
<ViewControlButtonGroup clearStore={clearStore} />
<VisibleControlBotton />
                    </Box>
                    {/* <ControlButtonsGroup /> */}
                    {/* {ViewControlButtonGroup(clearStore, ViewConfig)} */}
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
type BtnGroupProps = {
    clearStore: (store_id: ArgsTypes) => void,

}

const ViewControlButtonGroup: FC<BtnGroupProps> = observer(({ clearStore }) => {
    const { ViewConfig } = useStoresContext()
    return (
    <ButtonGroup
        sx={{ alignSelf: 'end', display: 'flex', maxWidth: 'fit-content'}}
        orientation='horizontal'
        variant="contained" >

        <span>
        <Button sx={{ display: 'flex', gap: 1, fontFamily: 'Fira Code' }}
            onClick={() => clearStore(ViewConfig.selected_output)}
        >
            Очистить {LABELS_LIST[ViewConfig.selected_output]}
            <DeleteOutlinedIcon color='warning' />
        </Button>

        </span>
        
    </ButtonGroup>)
})

// const ControlButtonsGroup = useMemo(() => {
    
    // const logStores = useCallback(() => {
    //     const s = RootStore.select(ViewConfig.selected_store)
    //     if (!s) return
    //     _log({ ...toJS(s) })
    // }, [RootStore, ViewConfig.selected_store])

    // const SelectStore = useCallback((type: InputsTypeEnum) => {
    //     ViewConfig.selectForm(type)
    // }, [ViewConfig])

    // const isSelected = useCallback((input_store: InputsTypeEnum) => input_store === ViewConfig.selected_store,
    //     [ViewConfig.selected_store])

    // 

//     const ButtonControlGroup = () => <ButtonGroup sx={{ gap: 1, width: 150, height: 'fit-content' }}
//         variant="contained"
//         size='large'
//         component={Stack}
//         orientation='vertical'
//     >
//         <Button
//             onClick={() => SelectStore(InputsTypeEnum.size_full)}
//             color={isSelected(InputsTypeEnum.size_full) ? 'primary' : 'success'}
//             sx={isSelected(InputsTypeEnum.size_full) ? { outline: '2px solid red' } : { outline: 'none' }}
//         >
//             Size Full
//         </Button>

//         <Button onClick={() => SelectStore(InputsTypeEnum.offset5)}
//             color={isSelected(InputsTypeEnum.offset5) ? 'primary' : 'success'}
//             sx={isSelected(InputsTypeEnum.offset5) ? { outline: '2px solid red' } : { outline: 'none' }}>
//             Offset5
//         </Button>
//         <Button onClick={logStores}

//             color='error'
//             sx={{}}
//         >
//             Log stores
//         </Button>
//     </ButtonGroup>

//     return ButtonControlGroup
// }, [SelectStore, isSelected, logStores])