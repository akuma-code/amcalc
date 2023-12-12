import { Button, ButtonGroup, Grid, Stack } from '@mui/material'
import React, { useMemo, useCallback } from 'react'

import { _log, _toJSON } from '../../Helpers/HelpersFns'
import { FactoryDiv } from '../Templates/Factory'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { toJS } from 'mobx'
import { observer, } from 'mobx-react-lite'
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector'
import DynamicInputsForm from '../FlexForm/MultiForms/DynamicInputsForm'
import NetsOutput from '../FlexForm/Output/NetsOutput'
import { InfoBox } from './InfoBox'
import { CardViewState } from '../../Hooks/useOutputCtx'
import { MockServer } from '../Templates/FakeServer'
import OutputVers1 from '../FlexForm/Output/Output_v1'
import Icons from '../Icons/SvgIcons'
import { ANYobj } from '../../Interfaces/MathActionsTypes'
import Output2 from '../FlexForm/Output/Output_v2'





type PageProps = {}

const test_div = (w: number, h: number, count?: number) => {
    return <div className={`w-[${w}em] h-[${h}em] bg-gray-500`}> |{count ?? 'BLANK'}| </div>
}

const d = FactoryDiv




const BentoLayoutPage: React.FC<PageProps> = observer(() => {
    d.logging = false
    const { RootStore, ViewConfig } = useStoresContext()

    const logStores = () => {
        const s = RootStore.select(ViewConfig.selected_store)
        if (!s) return
        const args = toJS(s.store)

        // _log(s.store.map(a => Calcul.run('skf', a)))
        _log({ ...toJS(s) })
    }
    const SelectStoreAndOut = useCallback((type: InputsTypeEnum) => {
        ViewConfig.selectStore(type)
        ViewConfig.selectOut(type)
    }, [ViewConfig])
    const isSelected = useCallback((input_store: InputsTypeEnum) => input_store === ViewConfig.selected_store,
        [ViewConfig.selected_store])
    const ControlButtonsGroup = useMemo(() => {
        const Group = () => <ButtonGroup sx={{ mx: 1, gap: 1, width: 200, height: 'fit-content' }}
            variant="contained"
            size='large'
            component={Stack}
        >
            <Button fullWidth={true}
                onClick={() => SelectStoreAndOut(InputsTypeEnum.size_full)}
                color={isSelected(InputsTypeEnum.size_full) ? 'primary' : 'success'}
                sx={isSelected(InputsTypeEnum.size_full) ? { outline: '2px solid red' } : { outline: 'none' }}
            >
                Size Full
            </Button>
            {/* <Button onClick={() => SelectStoreAndOut(InputsTypeEnum.size_short)}
                color={isSelected(InputsTypeEnum.size_short) ? 'primary' : 'success'}
                sx={isSelected(InputsTypeEnum.size_short) ? { outline: '2px solid red' } : { outline: 'none' }}>
                Size Short
            </Button> */}
            <Button onClick={() => SelectStoreAndOut(InputsTypeEnum.offset5)}
                color={isSelected(InputsTypeEnum.offset5) ? 'primary' : 'success'}
                sx={isSelected(InputsTypeEnum.offset5) ? { outline: '2px solid red' } : { outline: 'none' }}>
                Offset5
            </Button>
        </ButtonGroup>

        return Group
    }, [SelectStoreAndOut, isSelected])

    const info_items = RootStore.storesSize()
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


                    <InfoBox items={info_items} />

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
                    <ButtonGroup sx={{ alignSelf: 'start' }}
                        variant="contained" >
                        <Button onClick={logStores}
                            color='warning'
                        >
                            Log stores
                        </Button>

                        <Button
                            onClick={() => _log(RootStore.storesSize())}
                        >{Icons.defaultIcon}</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>


            <Grid container item spacing={2}>
                <Grid item key={'form'} xs={3} border={'2px solid red'} p={2}>

                    <DynamicInputsForm />


                </Grid>
                <Grid item container
                    key={'output'}
                    sx={{ bgcolor: '#a9f135' }}
                    xs={9}
                    border={'2px solid green'} p={2}

                >

                    {ViewConfig.selected_output === InputsTypeEnum.size_full && <OutputVers1 store={RootStore.stores.size_full!.store} />}
                    <Output2 />
                    {/* <NetsOutput /> */}

                </Grid>
            </Grid>

        </Grid>
    )
})


BentoLayoutPage.displayName = "____BENTO_____"
export default BentoLayoutPage
