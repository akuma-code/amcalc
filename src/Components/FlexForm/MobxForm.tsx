import React from 'react'
import { useStoresContext } from '../Hooks/useStoresContext'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { Enum_NodesAction, FnKeys } from '../../ActionComponents/ActionTypes/Types'
import { ReduxState } from '../../Redux/ReduxTypes'
import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { _ID } from '../../Helpers/HelpersFns'

type MobxFormProps = {

}

type FormInputs = {
}

const MobxForm = observer((props: MobxFormProps) => {

    const { ReduxStore } = useStoresContext()

    const state = ReduxStore.getState()
    const changeFn = (type: Enum_NodesAction, new_values: Partial<typeof state.init>) => {
        if ('W' in new_values) {
        }
    }
    const { register, handleSubmit } = useForm<typeof state.init>({ defaultValues: state.init })
    const inputProps = (field: keyof typeof state.init) => register(field)
    const inpFields = Object.keys(state.init)
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={() => { }}
            autoComplete="on"
            id='mobx_form'
            display={'flex'}
            flexDirection={'column'}
            height={'fit-content'}
        >
            {
                inpFields.map((f) =>
                    <FormControl variant="standard" key={_ID()}>
                        <InputLabel htmlFor={'mobx_form'}>{f}</InputLabel>
                        <Input
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
                form='dto_form'
                variant='contained'
                color='success'

            >SUBMIT</Button>

        </Box>
    )
})

MobxForm.displayName = '________MobxForm______'
export default MobxForm