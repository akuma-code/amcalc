import { Box, Button, ButtonGroup, Divider, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MakeSillGroups, arrReducer, sumCount } from '../../ActionComponents/Calculators/SillCalculator';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { A_Sill } from '../../Interfaces/CommonTypes';
import { BasicModal } from './BasicModal';
import { MergedGroup } from './MergedGroup';

const isMergePossible = (arr: any[]) => arr.length > 1

export const GroupIdCard: React.FC<PropsWithChildren> = observer(() => {
    const group_id = useParams().group_id as string;

    const [merged, setMerged] = useState<A_Sill[] | []>([])


    const [hl, setHl] = useState<string[]>([]);
    const { SillStore, ViewConfig } = useStoresContext();
    const isHighlited = (id: string) => hl.includes(id);
    const isHighlightPossible = ViewConfig.visible.showPossibleMerge


    const STORE = SillStore.store
    if (!group_id) return <div className='text-center text-3xl'>Invalid ID!</div>;


    const _groups = useMemo(() => {
        const data = STORE.find(g => g.group_id === group_id)
        return data
    }, [STORE, group_id])

    const _proxyGroup = (group?: { group_data: A_Sill[] }) => group ? MakeSillGroups(group.group_data) : []

    const del = () => {
        group_id && SillStore.delete(group_id)

    }



    useEffect(() => {
        if (!_groups?.group_data) return
        const { group_data } = _groups

        const res = arrReducer(group_data) as A_Sill[]
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
                                    sx={{
                                        bgcolor: isHighlited(row._id) ? '#00dffc' : 'inherit',
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
                    <MergedGroup group={merged} />
                </BasicModal>

                <ButtonGroup>

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

