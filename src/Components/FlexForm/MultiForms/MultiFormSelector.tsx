import React, { useEffect, useMemo } from 'react'

import { useFormContext, FormProvider, useForm, useFieldArray, Controller, UseControllerProps, useController, UseFormRegisterReturn, UseFormRegister } from 'react-hook-form'
import { ISizeFull } from '../../../Interfaces/CommonTypes'
import { Fn_Args_offset5 } from '../../../ActionComponents/ActionTypes/Types'
import { dto_formdata } from '../DTO_Forms'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { Box, Button, FormControl, FormLabel, Input, InputLabel } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { Mbx_InputsStore } from '../../../mobXStore/InputsStore'
import { ANYobj } from '../../../Interfaces/MathActionsTypes'
import { StringifyProps, StringifyProps_2 } from '../../../ActionComponents/ActionTypes/FnProperties'
import { getValue } from '@testing-library/user-event/dist/utils'
import { DTO_ARGS, InputsTypeEnum } from '../../Hooks/useFormStateSelector'
import { ArgsTypes, ArgsTypesList } from '../../../Models/ArgsTypeModel'
import { FormStatePlaceHolder } from '../../../ActionComponents/ActionTypes/ReducerTypes'


type IControlsFullSize = StringifyProps_2<ISizeFull>
type IControlsOffset5 = Fn_Args_offset5
type IFieldsArrayItem<Arg extends ANYobj = ANYobj> = {
    // field: keyof Arg
    props: UseFormRegisterReturn<keyof Arg & string>
    placeholder?: string
}
type MultiFormProps = {}
export const MultiFormSelector = () => {

    const IS = useStoresContext().InputStore
    const { RootStore } = useStoresContext()
    // const { InputStore: IS } = store
    const current_state = IS.inpType
    // const { offset5: of5_dto, size_full } = IS.get_form_data
    // const { payload } = useFormStateSelector(current_state as InputsTypeEnum)
    // console.log('payload: ', payload)
    const { fields, init, desc, placeholder } = IS.get_form_data[current_state]


    const { register, handleSubmit, getValues, reset } = useForm<typeof init>()

    const InputPropsArray = fields.map(f => {
        const pl = placeholder ? placeholder[f as keyof typeof placeholder] : ""
        const fieldprop: IFieldsArrayItem = {

            props: register(f, { required: true, shouldUnregister: true }),
            placeholder: pl
        }
        return fieldprop
    })




    const save = () => {
        switch (current_state) {
            case 'size_full': {
                IS.save(current_state, getValues())
                RootStore.saveTostore(current_state, getValues())
                break
            }
            case 'offset5': {
                IS.save(current_state, getValues())
                RootStore.saveTostore(current_state, getValues())
                break
            }
            case 'size': {
                IS.save(current_state, getValues())
                RootStore.saveTostore(current_state, getValues())
                break

            }
            default: break
        }
        // IS.save(current_state, getValues())
        reset()
        // const s = IS.load('offset5')
    }

    return (
        <FormLabel htmlFor='o5_form'>
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

                {InputPropsArray.map((fprop, idx) =>
                    FCInput(idx, fprop)
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

    )

}


MultiFormSelector.displayName = '______FormSelector___________'


function FCInput(idx: number, inputprops: IFieldsArrayItem<any>) {
    const { placeholder, props } = inputprops

    return <FormControl variant="standard" key={_ID()} margin='dense'>
        <InputLabel htmlFor={`input_` + idx}>{placeholder && placeholder}</InputLabel>
        <Input id={`input_` + idx} {...props}
            defaultValue='' />

    </FormControl>
}

