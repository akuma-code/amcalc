import { Box } from '@mui/material'
import React from 'react'
import { _ID, _trim } from '../../../Helpers/HelpersFns'
import { ZLABEL } from '../../../Interfaces/Enums'

type PriceTableProps = {
    data: number[][]
    groupId?: string | null
}
export const _numberArray = (start: number, end: number, step: number) => {
    let res: number[] = []
    for (let i = start; i <= end; i += step) {

        res = [...res, i]
    }
    return res
}
const wsize = [.4, .5, .6, .7, .8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5]
const hsize = [.5, .6, .7, .8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4]
const resultParser = (row: string[]) => Array.isArray(row) ? row.map(i => _trim(i)) : row
export const ViteoPriceTable = ({ data, groupId: sheetName }: PriceTableProps) => {

    const zname = sheetName ? ZLABEL[sheetName as keyof typeof ZLABEL] : ""

    return (
        <Box sx={ {
            [`& tbody>tr>td`]: { border: '2px solid #000', p: .5 },
            [`& tr>th`]: { border: '2px solid black' },
            [`& td:hover`]: { bgcolor: 'pink', cursor: 'default' }
        } }>
            <table>
                <caption>
                    { sheetName &&
                        <b>
                            Group: { zname }
                        </b>
                    }
                </caption>
                <thead>
                    <tr>
                        <th className='bg-black'></th>
                        {
                            wsize.map(n =>
                                <th key={ _ID() }>
                                    { n }
                                </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    { data.map((row, idx) =>

                        <tr key={ idx }>
                            <td className='w-[50px] text-center'>
                                <b>{ hsize[idx] }</b>
                            </td>
                            {
                                row.map((n, i) =>
                                    <td key={ i }>{ Math.round(n) }</td>
                                ) }
                        </tr>
                    ) }
                </tbody>
            </table>

        </Box>
    )
}
type IsoTablePriceProps = {
    zGroup: {
        data: string[][]
        groupId: string
    }
    ztype: 'viteo' | 'isolite'
}
export const ZhPriceTable: React.FC<IsoTablePriceProps> = ({ zGroup, ztype = 'viteo' }) => {
    const end = ztype === 'viteo' ? 1.4 : 1.8
    const wsteps = _numbs(.3, end, .1)
    const hstep = _numbs(.3, 2.4, .1)

    return (
        <Box sx={ {
            [`& tbody>tr>td`]: { border: '2px solid #000', p: .5 },
            [`& tr>th`]: { border: '2px solid black' },
            [`& td:hover`]: { bgcolor: 'pink', cursor: 'default' }
        } }>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        { wsteps.map(n =>
                            <th key={ n }>
                                <b>{ n }</b>
                            </th>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { zGroup.data.map((row, idx) =>
                        <tr key={ _ID() }>
                            <td>{ hstep[idx] }</td>
                            {
                                row.map(n =>
                                    <td key={ n }>{ n }</td>
                                )
                            }
                        </tr>
                    ) }
                </tbody>
            </table>
        </Box>
    )
}

export const _numbs = (start: number, end: number, step: number) => {
    const res = []
    let _tmp: number = start
    while (_tmp < end) {
        res.push(_tmp)
        _tmp += step
    }
    res.push(end)
    return res.map(n => +n.toFixed(1))
}