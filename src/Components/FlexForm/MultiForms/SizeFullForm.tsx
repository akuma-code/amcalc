import { Box, Button, FormControl, Input, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { Controller, UseControllerProps, useController, useForm, useFormContext } from 'react-hook-form'
import { ISizeFull, SizeFull } from '../../../Interfaces/CommonTypes'
import { dto_formStates } from '../DTO_Forms'
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector'


type Props = {
    getSize: (size: ISizeFull) => void
}

type FieldValues = ISizeFull
type FormFieldValues = {
    width: string | number,
    height: string | number
}
type ControllerProps = UseControllerProps<FormFieldValues>


const SizeFullForm = ({ getSize }: Props) => {
    const dto = dto_formStates.size_full
    const [field_vals, setField_vals] = useState(dto.init)
    const FC = useFormContext<FormFieldValues, FormFieldValues>()
    const { register, handleSubmit, control } = useForm<FormFieldValues>({ defaultValues: { width: "", height: "" } })
    // const { field, fieldState } = useController<FieldValues>({name:'height'})

    const onSubmitFn = (size: FormFieldValues) => {
        const w = typeof size.width === 'string' ? parseInt(size.width) : size.width
        const h = typeof size.height === 'string' ? parseInt(size.height) : size.height
        setField_vals(prev => ({ ...prev, height: h, width: w }))
        getSize(new SizeFull(w, h))
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={handleSubmit(onSubmitFn)}
            autoComplete="on"
            id='dform'
            display={'flex'}
            flexDirection={'column'}
            height={'fit-content'}
            margin={1}
        >

            {/* {
                fields.map(f => */}
            {dto.fields.map(F =>
                <FormControl variant="standard" margin='dense' key={F} >


                    {/* <ControllledInput name={F}  */}
                    {/* /> */}

                    {ControlledInput({ name: F, control: control })}
                </FormControl>
            )}

            <Button type='submit' >Submit</Button>






        </Box>
    )
}
const ControlledInput = (props: ControllerProps) => {
    const { field } = useController(props)
    // const {name }=field
    return (


        <Controller {...props}

            name={field.name}
            key={field.name}
            rules={{ required: true }}
            render={({ field }) =>
                <Input {...field} />
            }

        />
    )
}
export default SizeFullForm