import React, { useEffect, useMemo } from 'react'

import { useFormContext, FormProvider, useForm, useFieldArray, Controller, UseControllerProps, useController } from 'react-hook-form'
import { ISizeFull } from '../../../Interfaces/CommonTypes'
import { Fn_Args_offset5 } from '../../../ActionComponents/ActionTypes/Types'
import { dto_formdata } from '../DTO_Forms'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { Box, Button, FormControl, FormLabel, Input, InputLabel } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { InputsStore } from '../../../mobXStore/InputsStore'
import { ANYobj } from '../../../Interfaces/MathActionsTypes'
import { StringifyProps, StringifyProps_2 } from '../../../ActionComponents/ActionTypes/FnProperties'
import { getValue } from '@testing-library/user-event/dist/utils'


type IControlsFullSize = StringifyProps_2<ISizeFull>
type IControlsOffset5 = Fn_Args_offset5

type MultiFormProps = {}
export const MultiFormSelector = () => {

    const IS = useStoresContext().InputStore
    // const { InputStore: IS } = store
    const current_state = IS.inpType
    // const { offset5: of5_dto, size_full } = IS.get_form_data
    const { fields, init, desc, placeholder } = IS.get_form_data[current_state]

    const { register, handleSubmit, getValues, reset } = useForm<typeof init>()

    const save = () => {
        switch (current_state) {
            case 'size_full': {
                IS.save(current_state, getValues())

                break
            }
            case 'offset5': {
                IS.save(current_state, getValues())
                break
            }
            case 'size': {
                IS.save(current_state, getValues())
                break

            }
            default: break
        }
        IS.save(current_state, getValues())
        reset()
        // const s = IS.load('offset5')
    }




    return (
        FORM()
    )

    function FORM() {
        return <FormLabel htmlFor='o5_form'>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                onSubmit={handleSubmit(save)}
                autoComplete="on"
                id='o5_form'
                display={'flex'}
                flexDirection={'column'}
                height={'fit-content'}
                margin={1}
            >

                {desc && desc}

                {fields.map((f, idx) => <FormControl variant="standard" key={_ID()} margin='dense'>
                    <InputLabel htmlFor={`input_` + idx}>{`placeholder && placeholder[f] as any`}</InputLabel>
                    <Input id={`input_` + idx}
                        {...register(f, { required: true })}
                        defaultValue='' />

                </FormControl>
                )}


                <Button type='submit'
                    form='o5_form'
                    variant='contained'
                    color='success'

                >
                    SUBMIT
                </Button>
                <Button type='reset'
                    form='o5_form'
                    variant='contained'
                    color='error'
                    sx={{ margin: 2 }}
                >
                    RESET
                </Button>

            </Box> </FormLabel>
    }
}


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

export const MultiFormSelector_v2: React.FC<MultiFormProps> = observer(() => {
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
                // onSubmit={handleSubmit(() => InputStore.save('size_full', getValues() as unknown as ISizeFull))}
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
                    // control={control}
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