import { Grid } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IconButton } from '../UI/IconButton'
import Icons from '../Icons/SvgIcons'

import DTOForm, { FormProps } from '../FlexForm/DTO_Form'
import { OutputTable } from '../FlexForm/OutputTable'
import { _log } from '../../Helpers/HelpersFns'
import { FactoryDiv } from '../Templates/Factory'
import { useStoresContext } from '../Hooks/useStoresContext'
import { observer } from 'mobx-react-lite'
import { IC_ArgsList, Enum_NodesAction, FnKeys, Fn_Args_nets, IC_FuncsList, IC_Functions, IFuncsState, IC_DataList, IC_FuncArgs } from '../../ActionComponents/ActionTypes/Types'
import { IDataTransferObject } from '../../Models/DTO_ChainStore'
import { DataNode } from '../../Models/LinkedList'
import { MainStore, MainStore_ } from '../../mobXStore/MainStore'
import NodeForm from '../FlexForm/NodeForm'


type PageProps = {}
type IState = {} & IFuncsState
const test_div = (w: number, h: number, count?: number) => {
    return <div className={`w-[${w}em] h-[${h}em] bg-gray-500`}> |{count ?? 'BLANK'}| </div>
}

const d = FactoryDiv



const BentoLayoutPage: React.FC<PageProps> = observer(() => {
    d.logging = false
    const { dto_Store } = useStoresContext()
    const MAIN = new MainStore_(dto_Store)


    const [action_type, setType] = useState<Enum_NodesAction>(Enum_NodesAction.nets)
    const [ST, setST] = useState<IC_DataList>(MAIN.statesList)
    const CURRENT = useMemo(() => {
        if (!action_type) return null
        return ST[action_type]
    }, [ST, action_type])
    // const [fs, setFs] = useState<IDataTransferObject | null>(null)
    const [saved, setSaved] = useState<Record<FnKeys, IC_ArgsList[FnKeys][]>>({ nets: [], offset5: [] })
    // const [out, setout] = useState<Record<FnKeys, ReturnType<IC_Functions[FnKeys]>[]>>({ nets: [], offset5: [] })
    const saveResult = (args: IC_ArgsList[FnKeys]) => {
        if (!action_type) return
        if (action_type === 'nets') setSaved(prev => ({ ...prev, [action_type]: [...prev[action_type], args as IC_ArgsList['nets']] }))
        if (action_type === 'offset5') setSaved(prev => ({ ...prev, [action_type]: [...prev[action_type], args as IC_ArgsList['offset5']] }))
        // if ('W' in args) setSaved(prev => ({ ...prev, [action_type]: [...prev[action_type], args] }))
        // if ('width' in args) setSaved(prev => ({ ...prev, [action_type]: [...prev[action_type], args] }))
    }


    // useEffect(() => {
    //     const dd = dto_Store.search(n => n.type === action_type)?.data
    //     if (!dd) return
    //     setFs(dd)
    // }, [action_type, dto_Store])

    // useEffect(() => {
    //     if (!fs) return
    //     const fn = dto_Store.fnSearch(d => d.type === action_type)!
    //     if (action_type === Enum_NodesAction.nets) {

    //         setout(prev => ({ ...prev, nets: saved.nets.map(a => fn(a as any)) }))
    //     }
    // }, [action_type, dto_Store, fs, saved.nets])

    // useEffect(() => {
    //     const node = dto_Store.search(n => n.type === action_type)
    //     if (!node) return
    //     M.importDTO(node.data)
    // }, [action_type, dto_Store])
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

                    {d.div(action_type!)}

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
                        desc='NETS'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                        onClickFn={() => setType(Enum_NodesAction.nets)}
                    />
                    <IconButton
                        desc='OFFSET5'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
                        onClickFn={() => setType(Enum_NodesAction.offset5)}
                    />
                    <IconButton
                        desc='NOT READY'
                        svg_icon={Icons.RoundedArrows}
                        type='button'
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
                    {CURRENT && <NodeForm dto={CURRENT} />}
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
