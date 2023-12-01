import { Box, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

import React from 'react'
import { IDataTransferObject } from '../../Models/DTO_ChainStore'
import { Enum_NodesAction, TypeSelector } from '../../ActionComponents/ActionTypes/Types'
import { _log } from '../../Helpers/HelpersFns'


type NodeFormProps = {
    type: Enum_NodesAction
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


//! ****************************

const NodeForm: React.FC<NodeFormProps> = observer(({ type }: NodeFormProps) => {






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