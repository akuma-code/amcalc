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
        <Box>
            <table>
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((row, idx) =>
                        <td key={ idx }>{ row.toString() }</td>
                    ) }
                </tbody>
            </table>

        </Box>
    )
}

