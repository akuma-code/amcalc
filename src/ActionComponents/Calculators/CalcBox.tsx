import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import DTOForm from '../../Components/FlexForm/DTO_Form'
import { OutputTable, createOutputTableData } from '../../Components/FlexForm/OutputTable'
import { IDataTransferObject } from '../../Models/DTO_ChainStore'
import { IFuncArgs } from '../ActionTypes/Types'

type CalcBoxProps = {
    dto_node: IDataTransferObject
}

const CalcBox = (props: CalcBoxProps) => {

    const { initState, type, fn } = props.dto_node
    const [saved, setSaved] = useState<{ args: IFuncArgs, output: ReturnType<typeof fn> }[]>()
    const tabla_data = saved?.map(s => createOutputTableData(s.args, s.output)) ?? []

    return (
        <Box>
            <Stack>
                <DTOForm dto={props.dto_node} />
                <OutputTable output={tabla_data} />
            </Stack>
        </Box>
    )
}

export default CalcBox