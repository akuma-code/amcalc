import React from 'react'
import { Controller, FormProvider, useForm, useFormContext, UseFormRegisterReturn } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { Box, Button, FormControl, FormLabel, Input, InputLabel } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { ANYfn, ANYobj } from '../../../Interfaces/MathActionsTypes'
import { useState } from 'react'
import useInput from '../../Hooks/useInput'
import { DTO_ARGS, InputsTypeEnum } from '../../Hooks/useFormStateSelector'
import { AnyArg } from '../../Hooks/useDynamicInputs'
import { ArgsTypes, ArgsTypesList, DTO_FormDataList } from '../../../Models/ArgsTypeModel'
import { DTO_FormStatesList } from '../DTO_Forms'
import { ExtendedRootStores, IRootStores_v1 } from '../../../Context/RootStore'

type RS = Required<IRootStores_v1>[ArgsTypes]
type Props = {
    active_state?: InputsTypeEnum
}

const DynamicInputsForm = ({ active_state }: Props) => {
    const { RootStore } = useStoresContext()
    // const [current, setCurrent] = useState<InputsTypeEnum | undefined>(InputsTypeEnum.size)
    const methods = useForm<Required<IRootStores_v1>>()

    const { reset, handleSubmit, register } = useForm<RS>()



    if (!active_state) return <div>NONE</div>

    const save = (store_id: InputsTypeEnum, data: ArgsTypesList[typeof active_state]) => {
        _log("saved to ", store_id)
        _log("data: ", data)
        RootStore.saveTostore(store_id, data)
    }

    return (
        <FormProvider {...methods}>


            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                // onSubmit={}
                autoComplete="on"
                id='dform'
                display={'flex'}
                flexDirection={'column'}
                height={'fit-content'}
                margin={1}
            >

                {ControlBtns('dform')}


            </Box>



        </FormProvider>
    )
}

const ControlBtns = (form_id: string) => {
    return <>
        <Button type='submit'
            form={form_id}
            variant='contained'
            color='success'

        >
            SUBMIT
        </Button>
        <Button type='reset'
            form={form_id}
            variant='contained'
            color='error'
            sx={{ margin: 2 }}
        >
            RESET
        </Button>
    </>
}
const InputController = () => {
    const { control } = useFormContext<RS>()



    // const CTRL = ()=>{

    //     return (
    //     <FormControl variant="standard" margin='dense'>
    //         <Input 
    //             onChange={changeFn}
    //             value={val} />

    //     </FormControl>)
    // }

    // if (!control) return <div>No CONTROL</div>
    return (
        <Controller
            control={control}
            name={'add'}
            render={({ field }) =>

                <Input {...field} />
            }
        />
    )
}

const FControl = (K: string, val: number, changeFn: React.ChangeEventHandler<HTMLInputElement>) => {
    return <FormControl variant="standard" key={K} margin='dense'>
        <InputLabel htmlFor={`input_` + K}>{ }</InputLabel>
        <Input id={`input_` + K}
            onChange={changeFn}
            value={val} />

    </FormControl>
}
export default DynamicInputsForm

/* <Button type='submit'
                   form='dform'
                   variant='contained'
                   color='success'

               >
                   SUBMIT
               </Button>
               <Button type='reset'
                   form='dform'
                   variant='contained'
                   color='error'
                   sx={{ margin: 2 }}
               >
                   RESET
               </Button> */