import { Box, FormControl, FormHelperText, Input, InputLabel, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

import React from 'react'
import { DTO_Node, IDataTransferObject } from '../../Models/DTO_ChainStore'
import { useForm } from 'react-hook-form'
import { Enum_NodesAction, FnKeys, IC_ArgsList, TypeSelector } from '../../ActionComponents/ActionTypes/Types'
import { _log } from '../../Helpers/HelpersFns'
import { ANYobj } from '../../Interfaces/MathActionsTypes'
import { WrapIter } from '../../ActionComponents/ActionModels/FnGenerator'

type NodeFormProps = {
    dto: IDataTransferObject
}
function stateSelect(dto: IDataTransferObject) {
    switch (dto.type) {
        case Enum_NodesAction.nets: {
            return dto as unknown as TypeSelector<'nets'>
        }
        case Enum_NodesAction.offset5: {
            return dto as unknown as TypeSelector<'offset5'>
        }
        default: return
    }
}
const w = WrapIter

//! ****************************
const NodeForm: React.FC<NodeFormProps> = observer(({ dto }: NodeFormProps) => {

    const { type, fields, fn, initState } = dto
    type T = typeof type
    const state = stateSelect(dto)
    if (!state) return <h1>STATE ERROR</h1>

    const { handleSubmit, register } = useForm({ defaultValues: state.initstate as ANYobj })

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            // onSubmit={handleSubmit(d => onFinish<IC_ArgsList[TT]>(d as IC_ArgsList[TT]), (er) => _log(er.root?.message))}
            autoComplete="on"
            id='node_form'
            display={'flex'}
            flexDirection={'column'}
            height={'fit-content'}
        >
            {

                // <FormControl variant="standard" key={_ID()}>
                //     <InputLabel htmlFor={inputCounter(idx)}>{f}</InputLabel>
                //     <Input
                //         {...regProps(f as never)}
                //         id={inputCounter(idx)}
                //         defaultValue=''
                //         aria-describedby={helperCounter(idx)}
                //     />
                //     <FormHelperText id={helperCounter(idx)}>
                //         Введите размер
                //     </FormHelperText>
                // </FormControl>

            }
            <Button type='submit'
                form='node_form'
                variant='outlined'
                color='success'

            >SUBMIT</Button>

        </Box>
    )
})
NodeForm.displayName = '_____NodeForm___'
export default NodeForm