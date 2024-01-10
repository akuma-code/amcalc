import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, Stack } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { sortByField } from '../../ActionComponents/Calculators/SillCalculator';
import { _ID } from '../../Helpers/HelpersFns';
import { A_Sill } from '../../Interfaces/CommonTypes';

type MergedGrProps = {
    group: A_Sill[];
};
export const MergedGroup = (props: MergedGrProps) => {
    const _proxyGroup = useCallback((group: A_Sill[]) => group.map(g => ({ ...g, _id: _ID() })), []);
    const GRP = _proxyGroup(props.group);

    const [asc, setAsc] = useState(true);
    const [sortField, setsortField] = useState<keyof A_Sill>('count');
    const [active, setActive] = useState(sortField);

    const SortedGrp = useMemo(() => {
        const result = asc ? [...sortByField(GRP, sortField)] : [...sortByField(GRP, sortField)].reverse();
        return result;
    }, [GRP, asc, sortField]);


    const sortFn = (field: keyof A_Sill) => {
        setsortField(field);
        if (sortField === field) setAsc(prev => !prev);
    };

    const Summary = {
        L: SortedGrp.reduce((p, c) => p += c.L / 1000, 0).toFixed(2),
        count: SortedGrp.reduce((p, c) => p += c.count, 0)
    };

    const bgc = (isActive: boolean) => isActive ? `bg-orange-400 ` : 'inherit ';

    useEffect(() => {
        setActive(prev => sortField);


    }, [sortField]);
    const headStyle = ` flex flex-row w-full text-center justify-center border-2 hover:cursor-pointer hover:bg-orange-400 `;
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

                {SortedGrp.map((row, idx) => <Box key={row._id} component={Stack} flexDirection={'row'} justifyContent={'space-around'}
                    sx={{
                        bgcolor: 'inherit',
                        [`& div`]: { borderBottom: '1px solid black' },
                    }}
                >
                    <div className='text-center flex-grow'>
                        <b className=''> {idx + 1})  {row.L}</b>
                    </div>
                    <div className='text-center flex-grow'>
                        <b className=''>{row.B}</b>
                    </div>
                    <div className='text-center flex-grow'>
                        <b className=''>{row.count}</b>
                    </div>
                </Box>
                )}

            </div>
        </div>
    );
};
