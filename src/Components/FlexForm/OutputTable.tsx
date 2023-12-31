import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { _log } from '../../Helpers/HelpersFns'
import { IC_ArgsList, Enum_NodesAction, IC_FuncsList, IC_Functions } from '../../ActionComponents/ActionTypes/Types'
import { ANYobj } from '../../Interfaces/MathActionsTypes'




export function createOutputTableData<K extends keyof typeof Enum_NodesAction>(
    args: IC_ArgsList[K],
    output: ReturnType<IC_Functions[K]>,
) {
    return { args, output }
}

type IOutputProps = ReturnType<typeof createOutputTableData<Enum_NodesAction>>


type OutputTableProps = {
    output?: IOutputProps[]
}
type NodesRowProps = {
    args: IOutputProps['args'],
    output: IOutputProps['output'],
}

//! ****************************************************
//* <<<<<<<<<<<<<<<<<<<< TABLE ROW >>>>>>>>>>>>>>>>>>>>>
const NodesRow: React.FC<NodesRowProps> = ({ args, output }) => {


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
                Object.entries(output).map(([k, v]) =>
                    <li key={k} className='flex flex-row justify-between'><span>{k}: </span><b>{v}</b></li>
                )
            }
        </TableCell>
    </TableRow>
}
//! ****************************************************
//* <<<<<<<<<<<<<<<<<<<< TABLE Main >>>>>>>>>>>>>>>>>>>>>
export const OutputTable: React.FC<OutputTableProps> = ({ output }) => {

    const rows = output || []

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
                        rows.map((node, idx) =>
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



