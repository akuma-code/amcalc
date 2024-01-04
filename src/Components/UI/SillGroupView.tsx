import React, { PropsWithChildren, useMemo, useState } from 'react';
import { Box, Button, ButtonGroup, Divider, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link, redirect, useParams } from 'react-router-dom';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { MakeSillGroups, mergeSills, sill_tag } from '../../ActionComponents/Calculators/SillCalculator';
import { _log } from '../../Helpers/HelpersFns';


export const GroupIdCard: React.FC<PropsWithChildren> = observer(() => {
    const { group_id } = useParams() as { group_id?: string; };
    const [hl, setHl] = useState<string[]>([]);
    const isHighlited = (id: string) => hl.includes(id);
    const { SillStore } = useStoresContext();


    const STORE = SillStore?.store
    if (!STORE || !group_id) return <div className='text-center text-3xl'>Invalid ID!</div>;


    const _groups = useMemo(() => {
        const data = STORE.find(g => g.group_id === group_id)
        const grs = data ? MakeSillGroups(data.group_data) : []
        return grs
    }
        , [STORE, group_id])
    const del = () => {
        SillStore.delete(group_id)

    }

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
                    Кол-во, шт
                </div>

            </div>
            <div className="flex flex-col m-1 ">

                {_groups.map((g, index) =>
                    <Stack key={index} >
                        {
                            g.map((row, idx) =>
                                <Box key={row._id} component={Stack} flexDirection={'row'} justifyContent={'space-around'}
                                    onClick={() => setHl(row.matchIds)}
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
                        <Divider ></Divider>
                    </Stack>

                )


                }
            </div>
            <div className="text-end">
                <ButtonGroup>

                    <Button onClick={() => _log(..._groups.reduce((s, c) => [...s, ...c]))}>
                        Merge
                    </Button>
                    {
                        group_id &&
                        <Button variant='contained' color='warning'
                            onClick={del}>
                            <Link to={'/sill'}>Delete </Link>
                        </Button>}
                    <Button variant='contained' color='error'>
                        <Link to={'/sill'}>Close </Link>
                    </Button>
                </ButtonGroup>
            </div>
        </div>

    );


});
GroupIdCard.displayName = 'GroupCard';
