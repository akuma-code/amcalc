import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { Box, Button, ButtonGroup, Divider, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link, redirect, useParams } from 'react-router-dom';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { MakeSillGroups, arrReducer, mergeSills, sill_tag, sumCount } from '../../ActionComponents/Calculators/SillCalculator';
import { _log } from '../../Helpers/HelpersFns';
import { A_Sill, _ArgsMaker } from '../../Interfaces/CommonTypes';
import { toJS } from 'mobx';

const isMergePossible = (arr: any[]) => arr.length > 1

export const GroupIdCard: React.FC<PropsWithChildren> = observer(() => {
    const group_id = useParams().group_id as string;

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
        const _data = group_data ? [...group_data] : []
        const res = arrReducer(_data) as A_Sill[]
        console.log('reducer: ', res)
        // mergeSills(_data)
    }, [_groups])

    return (
        <div className="flex flex-col bg-slate-400  m-1 p-1 max-w-[30vw]">
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
                    Кол-во, шт ({_groups && sumCount(_groups?.group_data)})
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
                                        bgcolor: isHighlited(row._id) ? '#fc00009b' : 'inherit',
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
            <div className="text-end">
                <ButtonGroup>

                    <Button onClick={mergeFn}>
                        Merge
                    </Button>
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
