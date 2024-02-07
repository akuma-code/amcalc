import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Box, Dialog } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { _ID, _trim } from '../../../Helpers/HelpersFns'
import { useStoresContext } from '../../../Hooks/useStoresContext'
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
type ICellData = {
    row: number
    col: number
    rowIdx: number
    colIdx: number
    price: number

}
type ICellStateType = "none" | "_watched" | "_watched_row" | "_watched_col" | "_selected" | "_selected_row" | "_selected_col"
// console.log('PS', PS)
export const ZhPriceTable: React.FC<IsoTablePriceProps> = observer(({ zGroup, ztype = 'viteo' }) => {
    const { ViewConfig } = useStoresContext();
    const [cell, setCell] = useState<ICellData | null>(null)
    const [watch, setWatch] = useState<{ rowIdx: number, colIdx: number }>({ rowIdx: -1, colIdx: -1 })
    const [isWatched, setIsWatched] = useState(false)
    const end = ztype === 'viteo' ? 1.4 : 1.8
    const wsteps = _numbs(.3, end, .1)
    const hsteps = _numbs(.3, 2.4, .1)
    const [open, setOpen] = useState(false)
    const isHighlightRow = (rowIdx: number, colIdx: number) => {
        if (!cell) return false
        return cell.rowIdx === rowIdx && colIdx >= cell.colIdx
    }
    const isHighlightCol = (rowIdx: number, colIdx: number) => {
        if (!cell) return false
        return cell.rowIdx >= rowIdx && colIdx === cell.colIdx
    }


    const tdClickFn = (rowIdx: number, colIdx: number) => (e: React.MouseEvent<HTMLTableCellElement>) => {
        const rowValue = wsteps[rowIdx]
        const colValue = hsteps[colIdx]
        const cellInfo = {
            rowIdx, colIdx,
            row: rowValue,
            col: colValue,
            price: +e.currentTarget.innerText,
        }
        if (!cell) return setCell(cellInfo)
        setCell(prev => cellInfo)

    }

    const handleEnter = (ri: number, ci: number) => (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        setIsWatched(prev => true)
        // if (!watch) return setWatch({ rowIdx: ri, colIdx: ci })
        setWatch(prev => ({ ...prev, rowIdx: ri, colIdx: ci }))
        // console.log('cellData: ', getCellState(watch.rowIdx!, watch.colIdx!))
    }
    const handleLave = (ri: number, ci: number) => (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        setIsWatched(prev => false)

        // console.log('cellData: ', getCellState(ri, ci))

    }


    const color = (cond: boolean) => cond ? 'green-200' : 'inherit'
    const colorWatched = (cond: boolean) => cond ? 'green-100' : 'inherit'
    const colorSX = (cond: boolean) => cond ? 'green-300' : 'gray-400'
    const getCellState = (ir: number, ic: number): ICellStateType => {
        const current = {
            w: watch, c: cell ? cell : { rowIdx: -1, colIdx: -1 }
        }
        if (ir === current.w.rowIdx && ic === current.w.colIdx) return '_watched'
        if (current.w.rowIdx === ir && ic >= current.w.colIdx) return '_watched_row'
        if (ir <= current.w.rowIdx && ic === current.w.colIdx) return '_watched_col'
        if (ir === current.c.rowIdx && ic === current.c.colIdx) return '_selected'
        if (current.c.rowIdx === ir && ic >= current.c.colIdx) return '_selected_row'
        if (ir <= current.c.rowIdx && ic === current.c.colIdx) return '_selected_col'
        return 'none'
    }
    return (
        <Box sx={ {
            [`& td`]: { border: '2px solid #000', minWidth: 25, px: 1, },

            [`& td[data-cell-state=_watched]`]: { bgcolor: '#c2fac7' },
            [`& td[data-cell-state=_watched_row]`]: { bgcolor: '#f3ff85' },
            [`& td[data-cell-state=_watched_col]`]: { bgcolor: '#f3ff85' },
            [`& td[data-cell-state=_selected]`]: { bgcolor: 'red' },
            [`& td[data-cell-state=_selected_row]`]: { bgcolor: '#83f1ff' },
            [`& td[data-cell-state=_selected_col]`]: { bgcolor: '#83f1ff' },
            [`& td[data-datacell]`]: { px: 1 },
            [`& th[data-datacell]`]: { border: '2px solid black', px: 1 },
            [`& td[data-selected_cell=true]`]: { bgcolor: 'pink', cursor: 'default', fontWeight: 'bold' },
            [`& th[data-delete-cell]`]: { cursor: 'pointer', bgcolor: 'black' },
            [`& hover:th[data-delete-cell]`]: { cursor: 'pointer', bgcolor: 'red' },
        } }>
            <table className='border-separate'>
                <thead>
                    <tr>
                        { wsteps.map((n, colIdx) =>
                            <th key={ n } data-datacell className={ `bg-${colorSX(colIdx === cell?.colIdx)}` }>
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
                    { zGroup.data.map((row, rowInd) =>
                        <tr key={ _ID() + rowInd }>
                            {
                                row.map((price, colInd) =>
                                    <td
                                        // className={`bg-${color(isHighlightRow(rowInd, colInd) || isHighlightCol(rowInd, colInd))}`}
                                        key={ price }
                                        onClick={ tdClickFn(rowInd, colInd) }
                                        data-selected_cell={ isHighlightRow(rowInd, colInd) && isHighlightCol(rowInd, colInd) }
                                        data-cell-state={ getCellState(rowInd, colInd) }
                                    // onMouseEnter={handleEnter(rowInd, colInd)}
                                    // onMouseLeave={handleLave(rowInd, colInd)}
                                    >{ parseFloat(_trim(price)) }</td>
                                )
                            }
                            <td data-datacell className={ `text-center bg-${colorSX(rowInd === cell?.rowIdx)}` }>
                                <b>{ hsteps[rowInd] }</b>
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
            <Dialog open={ open }>
                {/* <Box component={ Stack } flexDirection={ 'row' } justifyContent={ 'space-around' }
                    sx={ {
                        bgcolor: 'inherit',
                        [`& div`]: { borderBottom: '1px solid black' },
                    } }
                >
                    <div className='text-center flex-grow'>
                        <b className=''> </b>
                    </div>
                    <div className='text-center flex-grow'>
                        <b className=''></b>
                    </div>
                    <div className='text-center flex-grow'>
                        <b className=''></b>
                    </div>
                </Box> */}
            </Dialog>
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


