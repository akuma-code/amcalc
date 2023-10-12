import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { CalcOffsetType5 } from '../../Actions/TestAction_Offset5'
import { _log } from '../../Helpers/HelpersFns'

type OutputTableProps = {
    storedNodes?: ReturnType<typeof createOutputTableData>[]
}
type NodesRowProps = {
    initState: { [field: string]: number },
    result: { [field: string]: number },
}
const NodesRow: React.FC<NodesRowProps> = ({ initState, result }) => {


    return <TableRow

        sx={{
            // display: 'flex',
            // justifyContent: 'space-between',
            alignItems: 'center'
        }}>
        <TableCell sx={{ border: 2, borderTop: 0, borderLeft: 0, flexWrap: 'wrap', display: 'flex', borderRight: 0 }} align='right'>
            {Object.entries(initState).map(([k, v]) =>
                <li key={k} className='  p-1'>{k}:{v}</li>
            )}
        </TableCell>
        <TableCell sx={{ border: 2, borderRadius: '2em', borderTop: 0, borderRight: 0 }}>
            {Object.entries(result).map(([k, v]) =>
                <li key={k} className='flex flex-row justify-between'><span>{k}: </span><b>{v}</b></li>
            )}
        </TableCell>
    </TableRow>
}
export const OutputTable: React.FC<OutputTableProps> = ({ storedNodes = stored }) => {

    const nodes = storedNodes || []

    return (
        <TableContainer sx={{ border: '2px solid', borderRadius: '2%', margin: '1em', maxWidth: 800 }}
            component={Paper}  >
            <Table>
                <TableHead >
                    <TableRow >
                        <TableCell align='center' sx={{ border: 2, borderRadius: '2em', borderTop: 0 }}>Вводные</TableCell>
                        <TableCell align='center' sx={{ border: 2, borderRadius: '2em', borderTop: 0 }}>Результат</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
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
    initState: { [Key: string]: number },
    result: { [Key: string]: number | string },
    fn?: (...args: any[]) => any
) {
    return { initState, result, fn } as const
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
].map(n => createOutputTableData(n, CalcOffsetType5(n), CalcOffsetType5))
