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
import { ArgsList, Enum_NodesAction, FnKeys, Fn_Args_nets, IFuncsList, IFunctions } from '../../ActionComponents/ActionTypes/Types'
import { IDataTransferObject } from '../../Models/DTO_ChainStore'
import { DataNode } from '../../Models/LinkedList'


type PageProps = {}

const test_div = (w: number, h: number, count?: number) => {
    return <div className={`w-[${w}em] h-[${h}em] bg-gray-500`}> |{count ?? 'BLANK'}| </div>
}

const d = FactoryDiv
const BentoLayoutPage: React.FC<PageProps> = observer(() => {
    d.logging = false
    const { dto_Store } = useStoresContext()

    const [action_type, setType] = useState(Enum_NodesAction.nets)
    const [fs, setFs] = useState<IDataTransferObject | null>(null)
    const [saved, setSaved] = useState<Record<FnKeys, ArgsList[FnKeys][]>>({ nets: [], offset5: [] })
    const [out, setout] = useState<Record<FnKeys, ReturnType<IFunctions[FnKeys]>[]>>({ nets: [], offset5: [] })
    const saveResult = (args: any) => {
        setSaved(prev => ({ ...prev, [action_type]: [...prev[action_type], args] }))
    }


    useEffect(() => {
        const dd = dto_Store.search(n => n.type === action_type)?.data
        if (!dd) return
        setFs(dd)
    }, [action_type, dto_Store])

    useEffect(() => {
        if (!fs) return
        const fn = dto_Store.fnSearch(d => d.type === action_type)!
        if (action_type === Enum_NodesAction.nets) {

            setout(prev => ({ ...prev, nets: saved.nets.map(a => fn(a as any)) }))
        }
    }, [])
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

                    {d.div(action_type)}

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
                    {
                        fs && <DTOForm initState={fs.initState} submitFn={saveResult} />
                    }

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

export default BentoLayoutPage
