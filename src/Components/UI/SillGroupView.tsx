import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, ButtonGroup, Divider, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link, redirect, useParams } from 'react-router-dom';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { MakeSillGroups, _filterSillGroups, _itemsFieldSet, addProp, arrReducer, mergeSills, sill_tag, sortByField, sumCount } from '../../ActionComponents/Calculators/SillCalculator';
import { _ID, _log } from '../../Helpers/HelpersFns';
import { A_Sill, _ArgsMaker } from '../../Interfaces/CommonTypes';
import { toJS } from 'mobx';
import { BasicModal } from './BasicModal';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const isMergePossible = (arr: any[]) => arr.length > 1

export const GroupIdCard: React.FC<PropsWithChildren> = observer(() => {
    const group_id = useParams().group_id as string;

    const [merged, setMerged] = useState<A_Sill[] | []>([])
    const [hl, setHl] = useState<string[]>([]);
    const { SillStore, ViewConfig } = useStoresContext();
    const isHighlited = (id: string) => hl.includes(id);
    const isHighlightPossible = ViewConfig.visible.showPossibleMerge


    const STORE = SillStore?.store
    if (!group_id) return <div className='text-center text-3xl'>Invalid ID!</div>;


    const _groups = useMemo(() => {
        const data = STORE.find(g => g.group_id === group_id)
        return data
    }, [STORE, group_id])

    const _proxyGroup = (group?: { group_data: A_Sill[] }) => group ? MakeSillGroups(group.group_data) : []

    const del = () => {
        group_id && SillStore.delete(group_id)

    }

    const mergeFn = useCallback(() => {
        if (!_groups?.group_data) return
        const { group_data } = _groups
        const _data = group_data
        const res = arrReducer(_data)
        const fg = _filterSillGroups(_data)


        console.log('res', fg)

    }, [_groups])

    useEffect(() => {
        if (!_groups?.group_data) return
        const { group_data } = _groups
        const _data = group_data
        const res = arrReducer(_data) as A_Sill[]
        setMerged(res)

    }, [_groups])


    return (
        <div className="flex flex-col bg-slate-400  m-1 p-1 max-w-[30vw] min-w-fit">
            <div className='text-center text-2xl my-1'>Group_id: {group_id}</div>
            <div className="flex flex-row  justify-around">
                <div className='  text-left flex-shrink px-1 border-2'>
                    #
                </div>
                <div className=' w-full text-center flex-grow border-2'>
                    L, мм
                </div>
                <div className=' w-full text-center flex-grow border-2'>
                    B, мм
                </div>
                <div className=' w-full text-right pr-1 border-2 flex-grow'>
                    Кол-во  ({_groups && sumCount(_groups?.group_data)} шт)
                </div>

            </div>
            <div className="flex flex-col m-1 ">

                {_proxyGroup(_groups).map((g, index) =>
                    <Stack key={index} >
                        {
                            g.map((row, idx) =>
                                <Box key={row._id} component={Stack} flexDirection={'row'} justifyContent={'space-around'}
                                    // onClick={() => setHl(row.matchIds)}
                                    sx={{
                                        bgcolor: isHighlited(row._id) ? '#00dffc' : 'inherit',
                                        // my: '5px'
                                    }}
                                >
                                    <div className="text-center flex-shrink">
                                        {idx + 1})
                                    </div>
                                    <div className='text-center flex-grow'>
                                        <b className='bg-green-200'>{row.L}</b>
                                    </div>
                                    <div className='text-center flex-grow'>
                                        <b className='bg-green-200'>{row.B}</b>
                                    </div>
                                    <div className='text-center flex-grow '>
                                        <b className='bg-green-200'>{row.count}</b>
                                    </div>
                                </Box>
                            )
                        }
                        <Divider textAlign='right'>size: {sumCount(g)}</Divider>
                    </Stack>

                )


                }
            </div>

            <div className="flex justify-between">

                <BasicModal title='Merged Group'
                    button_label='Show Merged'
                >
                    {_groups && <MergedGroup group={merged.map(m => ({ ...m as A_Sill }))} />}
                </BasicModal>

                <ButtonGroup>

                    {/* <Button onClick={mergeFn}>
                        Merge
                    </Button> */}
                    {
                        group_id &&
                        <Button variant='contained' color='warning'
                            onClick={del}>
                            <Link to={'/sill'}>Delete </Link>
                        </Button>
                    }
                    <Button variant='contained' color='error'>
                        <Link to={'/sill'}>Close </Link>
                    </Button>
                </ButtonGroup>
            </div>

        </div>

    );


});
GroupIdCard.displayName = 'GroupCard';

type MergedGrProps = {
    group: A_Sill[]
}
const MergedGroup = (props: MergedGrProps) => {
    const _proxyGroup = useCallback((group: A_Sill[]) => group.map(g => ({ ...g, _id: _ID() })), [])
    const GRP = _proxyGroup(props.group)

    const [asc, setAsc] = useState(true)
    const [sortField, setsortField] = useState<keyof A_Sill>('B')
    const [active, setActive] = useState(sortField)
    const bgc = (isActive: boolean) => isActive ? `bg-orange-400 ` : 'inherit '
    const SortedGrp = useMemo(() => {
        const result = asc ? [...sortByField(GRP, sortField)] : [...sortByField(GRP, sortField)].reverse()
        return result
    }, [GRP, asc, sortField])
    const sortFn = (field: keyof A_Sill) => {
        setsortField(field)
        if (sortField === field) setAsc(prev => !prev)
    }
    const Summary = {
        L: SortedGrp.reduce((p, c) => p += c.L / 1000, 0).toFixed(2),
        count: SortedGrp.reduce((p, c) => p += c.count, 0)
    }
    useEffect(() => {
        setActive(prev => sortField)


    }, [sortField])
    const headStyle = ` flex flex-row w-full text-center justify-center border-2 hover:cursor-pointer hover:bg-orange-400 `
    return (
        <div>
            <Stack direction={'row'} gap={2} justifyContent={'right'} mb={1}>

                <div>L: {Summary.L} п.м </div>
                <div>Всего: {Summary.count} шт.</div>
            </Stack>
            <div className="flex flex-row  justify-around">

                <div className={bgc(active === 'L') + headStyle}
                    onClick={() => sortFn('L')}>
                    <div>L, мм </div>
                    <div className={asc ? 'rotate-0' : 'rotate-180'}>{active === 'L' && <ArrowUpwardIcon />}</div>
                </div>
                <div className={bgc(active === 'B') + headStyle}
                    onClick={() => sortFn('B')}>
                    B, мм <div className={asc ? 'rotate-0' : 'rotate-180'}>{active === 'B' && <ArrowUpwardIcon />} </div>
                </div>
                <div className={bgc(active === 'count') + headStyle}
                    onClick={() => sortFn('count')}>
                    Кол-во <div className={asc ? 'rotate-0' : 'rotate-180'}> {active === 'count' && <ArrowUpwardIcon />}</div>
                </div>

            </div>
            <div className="flex flex-col m-1 ">

                {
                    SortedGrp.map((row, idx) =>
                        <Box key={row._id} component={Stack} flexDirection={'row'} justifyContent={'space-around'}
                            sx={{
                                bgcolor: 'inherit',
                                [`& div`]: { borderBottom: '1px solid black' },

                            }}
                        >
                            <div className='text-center flex-grow' >
                                <b className=''> {idx + 1})  {row.L}</b>
                            </div>
                            <div className='text-center flex-grow'>
                                <b className=''>{row.B}</b>
                            </div>
                            <div className='text-center flex-grow' >
                                <b className=''>{row.count}</b>
                            </div>
                        </Box>
                    )
                }

            </div>
        </div>
    )
}