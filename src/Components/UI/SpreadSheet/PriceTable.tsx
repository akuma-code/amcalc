import { Box } from '@mui/material'
import React from 'react'
import { _ID, _log, _trim } from '../../../Helpers/HelpersFns'
import { ZLABEL } from '../../../Interfaces/Enums'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { red } from '@mui/material/colors'
type PriceTableProps = {
    data: number[][]
    groupId?: string | null
}

const resultParser = (row: string[]) => Array.isArray(row) ? row.map(i => _trim(i)) : row

type IsoTablePriceProps = {
    zGroup: {
        data: string[][]
        groupId: string
    }
    ztype: 'viteo' | 'isolite'
}
export const ZhPriceTable: React.FC<IsoTablePriceProps> = observer(({ zGroup, ztype = 'viteo' }) => {
    const { ViewConfig } = useStoresContext();

    const end = ztype === 'viteo' ? 1.4 : 1.8
    const wsteps = _numbs(.3, end, .1)
    const hsteps = _numbs(.3, 2.4, .1)


    const tdClickFn = (rowIdx: number, colIdx: number) => (e: React.MouseEvent<HTMLTableCellElement>) => {
        const cellInfo = {
            row: rowIdx + 1,
            col: colIdx + 1,
            price: +e.currentTarget.innerText
        }
        // _log("row: ", rowIdx + 1, "col: ", colIdx + 1, "price: ", e.currentTarget.innerText)
        console.log('cellData: ', cellInfo)
    }
    return (
        <Box sx={ {
            [`& td`]: { border: '2px solid #000', minWidth: 25, px: 1, },
            [`& td[data-datacell]`]: { bgcolor: 'grey', px: 1 },
            [`& th[data-datacell]`]: { border: '2px solid black', bgcolor: 'grey', px: 1 },
            [`& td:hover , th:hover `]: { bgcolor: 'pink', cursor: 'default' },
            [`& th[data-delete-cell]`]: { cursor: 'pointer', bgcolor: 'black' },
            [`& hover:th[data-delete-cell]`]: { cursor: 'pointer', bgcolor: 'red' },
        } }>
            <table className='border-separate'>
                <thead>
                    <tr>
                        { wsteps.map(n =>
                            <th key={ n } data-datacell >
                                <b>{ n }</b>
                            </th>
                        ) }
                        <th className='bg-black border-2 border-black text-white' data-delete-cell
                            onClick={ () => ViewConfig.setActive('zgroup', "") }
                        >
                            <HighlightOffIcon />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { zGroup.data.map((row, idx) =>
                        <tr key={ _ID() + idx }>
                            {
                                row.map((n, i) =>
                                    <td key={ n } onClick={ tdClickFn(idx, i) }>{ parseFloat(_trim(n)) }</td>
                                )
                            }
                            <td data-datacell className='text-center'>
                                <b>{ hsteps[idx] }</b>
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </Box>
    )
})
ZhPriceTable.displayName = '__PriceTable'
export const _numbs = (start: number, end: number, step: number) => {
    const res = []
    let _tmp = start
    while (_tmp < end) {
        res.push(_tmp)
        _tmp += step
    }
    res.push(end)
    return res.map(n => +n.toFixed(1))
}