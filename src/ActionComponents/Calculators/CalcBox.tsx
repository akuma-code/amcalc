import { Box, Stack, FormLabel } from '@mui/material'
import { useState } from 'react'
import DTOForm from '../../Components/FlexForm/DTO_Form'
import { IC_ArgsList, Enum_NodesAction, FnKeys, TypeSelector } from '../ActionTypes/Types'
import { useDTO } from '../../Components/Hooks/useDTO'
import { _log } from '../../Helpers/HelpersFns'
import Divider from '@mui/material/Divider';




type CalcBoxProps = {
    type: Enum_NodesAction
    init: TypeSelector<FnKeys>['arg']

}

const CalcBox = (props: CalcBoxProps) => {
    const [saved_args, Save] = useState<Record<FnKeys, IC_ArgsList[FnKeys][]> | {}>({})
    const { createOutput, formProps } = useDTO(props.type)
    const { fields, initstate } = formProps(props.init)


    const save = (arg: IC_ArgsList[FnKeys]) => {
        Save(prev => ({ ...prev, [props.type]: [arg] }))
        _log(saved_args)

    }

    // const { initState, type, fn } = props.dto_node
    // const [saved, setSaved] = useState<Record<FnKeys, ArgsList[FnKeys][]>>({} as Record<FnKeys, ArgsList[FnKeys][]>)
    // const tabla_data = saved[type].map(s => createOutputTableData(s, fn(s)))
    // const output = createOutput(fn, ...saved[type])
    // const fields = Object.keys(initState)
    return (
        <Box sx={{
            border: '2px solid green',
            p: 1, m: 1,
        }}
            height={'fit-content'}
        >
            <Stack spacing={1}
                justifyContent={'space-between'}
                alignItems={'end'}
                divider={<Divider orientation='horizontal' flexItem />}
            >
                <FormLabel sx={{

                    fontWeight: 'bold',
                    textSizeAdjust: 'auto',
                    fontStyle: 'oblique',
                }}
                >
                    {props.type.toUpperCase()}
                </FormLabel>
                <DTOForm

                    initState={initstate}
                    submitFn={save}
                />
            </Stack>
        </Box >
    )
}

export default CalcBox