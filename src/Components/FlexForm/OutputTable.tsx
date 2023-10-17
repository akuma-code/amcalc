import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { CalcOffsetFn_Type5 } from '../../ActionComponents/Offset5/Offset5'
import { _log } from '../../Helpers/HelpersFns'

type OutputTableProps = {
    storedNodes?: ReturnType<typeof createOutputTableData>[]
}
type NodesRowProps = {
    args: { [field: string]: number },
    result: { [field: string]: number },
}
const NodesRow: React.FC<NodesRowProps> = ({ args, result }) => {


    return <TableRow

        sx={{

        }}>
        <TableCell sx={{
            // border: 2,
            borderTop: 0,
            borderLeft: 0,
            borderRight: 2,
            // flexDirection: 'row',
        }}
        >
            {
                Object.entries(args).map(([k, v]) =>
                    <li key={k} className='flex flex-row justify-between'><span>{k}: </span><b>{v}</b></li>
                )
            }
        </TableCell>
        <TableCell sx={{
            // border: 2,
            borderTop: 0,
            borderRight: 0,
            borderLeft: 2
        }}
            scope='row'
            component={'th'}>
            {
                Object.entries(result).map(([k, v]) =>
                    <li key={k} className='flex flex-row justify-between'><span>{k}: </span><b>{v}</b></li>
                )
            }
        </TableCell>
    </TableRow>
}
export const OutputTable: React.FC<OutputTableProps> = ({ storedNodes = stored }) => {

    const nodes = storedNodes || []

    return (
        <TableContainer sx={{
            border: '2px solid',
            borderRadius: '2%',
            margin: '1em',
            maxWidth: 300,
            height: 'fit-content',
            maxHeight: 600

        }}
            component={Paper}
        >
            <Table stickyHeader>
                <TableHead >
                    <TableRow >
                        <TableCell align='center' sx={{ border: 2, borderTop: 0 }}>Вводные</TableCell>
                        <TableCell align='center' sx={{ border: 2, borderTop: 0 }}>Результат</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{

                    }} >
                    {
                        nodes.map((node, idx) =>
                            <NodesRow {...node as NodesRowProps} key={idx} />
                        )
                    }

                </TableBody>
                <TableFooter>

                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export function createOutputTableData(
    args: { [Key: string]: number },
    result: { [Key: string]: number | string },

) {
    return { args, result }
}

const stored = [
    {
        W: 1000,
        H: 1500,
        h: 850,
        da: 25,
        db: 25,
    },
    {
        W: 1300,
        H: 1000,
        h: 850,
        da: 25,
        db: 25,
    },
    {
        W: 800,
        H: 1100,
        h: 850,
        da: 20,
        db: 20,
    },
    {
        W: 1000,
        H: 1500,
        h: 850,
        da: 10,
        db: 10,
    },
].map(n => createOutputTableData(n, CalcOffsetFn_Type5(n)))
