import React from 'react'
import { useStoresContext } from '../Hooks/useStoresContext'
import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Enum_NodesAction, FnKeys, IC_ArgsList } from '../../ActionComponents/ActionTypes/Types'
import { ReduxState } from '../../Redux/ReduxTypes'
import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { _ID, _log } from '../../Helpers/HelpersFns'

type MobxFormProps = {
    submitInputs: (inputs: IC_ArgsList[FnKeys]) => void
}

type FormInputs = {
}

const MobxForm = observer((props: MobxFormProps) => {

    const { ReduxStore } = useStoresContext()

    const state = ReduxStore.getState()
    // const changeFn = (type: Enum_NodesAction, new_values: IC_ArgsList[typeof type]) => {
    //     _log(type)
    //     _log(new_values)
    //     props.submitInputs(new_values)
    // }
    const { register, handleSubmit, getValues } = useForm<IC_ArgsList[FnKeys]>()
    const current = ReduxStore.active_state ? ReduxStore.active_state.init : state.init
    const inpFields: readonly (keyof typeof current)[] = []

    const onSubmitSwitch = (state_type: Enum_NodesAction, data: IC_ArgsList[keyof IC_ArgsList]) => {
        switch (state_type) {
            case Enum_NodesAction.nets: {
                // const data = getValues()
                _log(data)
                return data
            }

            case Enum_NodesAction.offset5: {
                // const data = getValues()
                _log(data)
                return data
            }
            default:
                _log("State error")
                break;
        }
    }
    const onSubmitFn: SubmitHandler<typeof state.init> = (data) => {
        onSubmitSwitch(ReduxStore.selected_type, data)
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={handleSubmit(onSubmitFn)}
            autoComplete="on"
            id='mobx_form'
            display={'flex'}
            flexDirection={'column'}
            height={'fit-content'}
        >
            {
                inpFields.map((f, idx) =>
                    <FormControl variant="standard" key={_ID()}>
                        <InputLabel htmlFor={`input_` + idx}>{f}</InputLabel>
                        <Input id={`input_` + idx}
                            {...register<keyof typeof state.init>(f as keyof typeof state.init)}
                            defaultValue=''
                        />
                        <FormHelperText >
                            Введите размер
                        </FormHelperText>
                    </FormControl>
                )
            }


            <Button type='submit'
                form='mobx_form'
                variant='contained'
                color='success'

            >SUBMIT</Button>

        </Box>
    )
})

const InputControl = (fields: string[]) => {


    return (
        <FormControl variant="standard" key={_ID()}>

        </FormControl>
    )
}

MobxForm.displayName = '________MobxForm______'
export default MobxForm