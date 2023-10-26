import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import DTOForm from '../../Components/FlexForm/DTO_Form'
import { OutputTable, createOutputTableData } from '../../Components/FlexForm/OutputTable'
import { IDataTransferObject } from '../../Models/DTO_ChainStore'
import { ArgsList, Enum_NodesAction, FnKeys, IFuncArgs, TypeSelector } from '../ActionTypes/Types'
import { useDTO } from '../../Components/Hooks/useDTO'
import { _log } from '../../Helpers/HelpersFns'




type CalcBoxProps = {
    type: Enum_NodesAction
}

const CalcBox = (props: CalcBoxProps) => {

    const { createOutput, formProps } = useDTO(props.type)
    const { fields, initstate } = formProps({ height: 0, width: 0 })



    // const { initState, type, fn } = props.dto_node
    // const [saved, setSaved] = useState<Record<FnKeys, ArgsList[FnKeys][]>>({} as Record<FnKeys, ArgsList[FnKeys][]>)
    // const tabla_data = saved[type].map(s => createOutputTableData(s, fn(s)))
    // const output = createOutput(fn, ...saved[type])
    // const fields = Object.keys(initState)
    return (
        <Box>
            <Stack>
                <DTOForm
                    fields={fields}
                    initState={initstate}
                />
            </Stack>
        </Box>
    )
}

export default CalcBox