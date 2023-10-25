import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import DTOForm from '../../Components/FlexForm/DTO_Form'
import { OutputTable, createOutputTableData } from '../../Components/FlexForm/OutputTable'
import { IDataTransferObject } from '../../Models/DTO_ChainStore'
import { ArgsList, FnKeys, IFuncArgs } from '../ActionTypes/Types'
import { useDTO } from '../../Components/Hooks/useDTO'

type CalcBoxProps = {
    dto_node: IDataTransferObject
}

const CalcBox = (props: CalcBoxProps) => {
    const { createOutput } = useDTO(props.dto_node.type)


    const { initState, type, fn } = props.dto_node
    const [saved, setSaved] = useState<Record<FnKeys, ArgsList[FnKeys][]>>({} as Record<FnKeys, ArgsList[FnKeys][]>)
    const tabla_data = saved[type].map(s => createOutputTableData(s, fn(s)))
    const output = createOutput(fn, ...saved[type])
    const fields = Object.keys(initState)
    return (
        <Box>
            <Stack>
                <DTOForm dto={props.dto_node} fields={fields} />
                <OutputTable output={tabla_data} />
            </Stack>
        </Box>
    )
}

export default CalcBox