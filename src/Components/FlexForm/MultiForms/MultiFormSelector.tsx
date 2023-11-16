import React, { useEffect, useMemo } from 'react'

import { useFormContext, FormProvider, useForm, useFieldArray, Controller, UseControllerProps, useController } from 'react-hook-form'
import { ISizeFull } from '../../../Interfaces/CommonTypes'
import { Fn_Args_offset5 } from '../../../ActionComponents/ActionTypes/Types'
import { dto_formdata } from '../DTO_Forms'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { Box, Button, FormControl, Input, InputLabel } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { InputsStore } from '../../../mobXStore/InputsStore'
import { ANYobj } from '../../../Interfaces/MathActionsTypes'
import { StringifyProps, StringifyProps_2 } from '../../../ActionComponents/ActionTypes/FnProperties'
import { getValue } from '@testing-library/user-event/dist/utils'


type IControlsFullSize = StringifyProps_2<ISizeFull>
type IControlsOffset5 = Fn_Args_offset5

type MultiFormProps = {}


export const MultiFormSelector: React.FC<MultiFormProps> = observer(() => {
    const { InputStore } = useStoresContext()
    const inst = InputStore.inpType
    const dto = useMemo(() => {
        return dto_formdata[inst]
    }, [inst])

    const methods = useForm<IControlsFullSize>({
        defaultValues: {
            height: "",
            width: "",
        },
        mode: 'onChange'
    })
    const { control, handleSubmit, reset, getValues } = methods


    const onAddArgs = () => {
        const args = getValues()
        InputStore.save('size_full', args as unknown as ISizeFull)


    }
    const onDelete = (arg_idx: number) => {

    }

    // useEffect(() => {
    //     reset({ full_size: [] })
    // }, [reset])
    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                onSubmit={handleSubmit(() => InputStore.save('size_full', getValues() as unknown as ISizeFull))}
                autoComplete="on"
                id='fs_form'
                display={'flex'}
                flexDirection={'column'}
                height={'fit-content'}
            >

                {['width', 'height'].map((f, idx) => (

                    <InputControl
                        name={f as keyof ISizeFull}
                        key={idx}
                        control={control}
                    />
                ))}
            </Box>
            <Button type='submit'
                form='fs_form'
                variant='contained'
                color='success'

            >
                SUBMIT
            </Button>
        </FormProvider>
    )
})
MultiFormSelector.displayName = '______FormSelector___________'
type InputProps = {
    field_name: string
    onChangeFn?: (...args: any) => void
}
type InputControlProps = UseControllerProps<StringifyProps_2<ISizeFull>, keyof ISizeFull>

const InputControl = ({ name, control }: InputControlProps) => {
    // const { control, register } = useFormContext()
    const { field, fieldState } = useController({ name })
    return (
        <Controller
            name={name}
            control={control}
            // defaultValue={''}
            render={({ field: { value, onChange } }) => (
                <FormControl variant="standard" key={_ID()} margin='dense'>
                    {/* <InputLabel htmlFor={`input_` + idx}>{placeholder && placeholder[f]}</InputLabel> */}
                    <Input value={value} onChange={onChange}
                    />

                </FormControl>
            )}
        />
    )
}