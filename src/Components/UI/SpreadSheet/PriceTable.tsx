import { Box } from '@mui/material'
import React from 'react'
import { _trim } from '../../../Helpers/HelpersFns'

type PriceTableProps = {
    ssData: string[][]
}
export const _numberArray = (start: number, end: number, step: number) => {
    let res: number[] = []
    for (let i = start; i <= end; i += step) {

        res = [...res, i]
    }
    return res
}

const resultParser = (row: string[]) => Array.isArray(row) ? row.map(i => _trim(i)) : row
export const PriceTable = (props: PriceTableProps) => {
    const data = props.ssData

    return (
        <Box sx={ {
            [`& tbody>tr>td`]: { border: '2px solid black' }
        } }>
            <table>
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((row, idx) =>
                        <tr key={ idx }>{ row.map((c, i) =>
                            <td key={ i }>{ c }</td>) }</tr>
                    ) }
                </tbody>
            </table>

        </Box>
    )
}

