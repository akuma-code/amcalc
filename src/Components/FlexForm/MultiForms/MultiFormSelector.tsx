
import { Controller, useForm, useFormContext, UseFormRegisterReturn } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { Box, Button, FormControl, FormLabel, Input, InputLabel } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { ANYfn, ANYobj } from '../../../Interfaces/MathActionsTypes'
import { useState } from 'react'
import useInput from '../../Hooks/useInput'
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector'
import { AnyArg } from '../../Hooks/useDynamicInputs'



type IFieldsArrayItem<Arg extends ANYobj = ANYobj> = {
    // field: keyof Arg
    props: UseFormRegisterReturn<keyof Arg & string>
    placeholder?: string
}
type MultiFormProps = {}
export const MultiFormSelector = observer(() => {


    const { RootStore, InputStore: IS } = useStoresContext()

    const current_state = RootStore.active_state || InputsTypeEnum.size

    const { fields, init, desc, placeholder } = IS.get_form_data[current_state]


    const { register, handleSubmit, getValues, reset, control } = useForm<typeof init>()

    const InputPropsArray = fields.map(f => {
        const pl = placeholder ? placeholder[f as keyof typeof placeholder] : ""
        const fieldprop: IFieldsArrayItem = {
            props: register(f, { required: true, shouldUnregister: true }),
            placeholder: pl
        }
        return fieldprop
    })
    const CONTR = (f: keyof AnyArg) => {

        const K = _ID()
        return <Controller name={f}
            control={control}
            render={(field) =>
                <FormControl variant="standard" key={K} margin='dense'>
                    <InputLabel htmlFor={`input_` + K}>{f}</InputLabel>
                    <Input id={`input_` + K}
                        {...register(f)}
                    />
                </FormControl>}

        />
    }

    const save = () => {
        switch (current_state) {
            case 'size_full': {
                // IS.save(current_state, getValues())
                RootStore.saveTostore(current_state, getValues())
                break
            }
            case 'offset5': {
                // IS.save(current_state, getValues())
                RootStore.saveTostore(current_state, getValues())
                break
            }
            case 'size': {
                // IS.save(current_state, getValues())
                RootStore.saveTostore(current_state, getValues())
                break

            }
            default: break
        }
        reset()
    }

    return (
        <FormLabel htmlFor='form' key={'MultiFormSelector'}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                onSubmit={handleSubmit(save)}
                autoComplete="on"
                id='form'
                display={'flex'}
                flexDirection={'column'}
                height={'fit-content'}
                margin={1}
            >

                {desc && desc}

                {
                    InputPropsArray.map((fprop, idx) =>
                        FCInput(idx, fprop)
                    )
                }

                {/* <DinamicInput onChangeFn={(v) => _log(v)} />
                <DinamicInput onChangeFn={(v) => _log(v)} /> */}
                <Button type='submit'
                    form='form'
                    variant='contained'
                    color='success'

                >
                    SUBMIT
                </Button>
                <Button type='reset'
                    form='form'
                    variant='contained'
                    color='error'
                    sx={{ margin: 2 }}
                >
                    RESET
                </Button>

            </Box>
        </FormLabel>

    )

})


MultiFormSelector.displayName = '___MultiFormSelector'


function FCInput(idx: number, inputprops: IFieldsArrayItem<any>) {
    const { placeholder, props } = inputprops

    return <FormControl variant="standard" key={_ID()} margin='dense'>
        <InputLabel htmlFor={`input_` + idx}>{placeholder && placeholder}</InputLabel>
        <Input id={`input_` + idx} {...props}
            defaultValue='' />

    </FormControl>
}

export interface DinInputProps {

    onChangeFn: (val: number) => void
}
const DinamicInput = (props: DinInputProps) => {
    // const v = typeof props.value === 'string' ? props.value : `${props.value}`
    const [val, onChange] = useInput("")
    const chHand: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {

        onChange(e)
        props.onChangeFn(+e.target.value)
    }
    const K = _ID()
    return (
        <FormControl variant="standard" key={K} margin='dense'>
            <InputLabel htmlFor={`input_` + K}>{ }</InputLabel>
            <Input id={`input_` + K}
                onChange={chHand}
                value={val} />

        </FormControl>
    )
}

const DiControl = () => {

}