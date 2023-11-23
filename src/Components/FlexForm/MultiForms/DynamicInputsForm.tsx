import React, { useMemo } from 'react'
import { Controller, FormProvider, useController, UseControllerProps, useForm, useFormContext, UseFormRegisterReturn } from 'react-hook-form'
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
import { dto_formStates, DTO_FormStatesList } from '../DTO_Forms'
import { DataStore, ExtendedRootStores, IRootStores_v1 } from '../../../Context/RootStore'
import { ISize, ISizeFull } from '../../../Interfaces/CommonTypes'
import { Fn_Args_offset5 } from '../../../ActionComponents/ActionTypes/Types'


type RS = Required<IRootStores_v1>[ArgsTypes]
type Props = {

}

const DynamicInputsForm = (props: Props) => {
    const { RootStore } = useStoresContext()
    const { reset, handleSubmit, register } = useForm<AnyArg>()

    const current_state = useMemo(() => {
        const ac = RootStore.active_state
        // if(active_state) return undefined
        const dto = dto_formStates
        const current = () => dto[ac].init
        const s = {
            type: ac,
            payload: current()
        }
        switch (RootStore.active_state) {
            case InputsTypeEnum.size_full: {
                return s.payload as ISizeFull
            }
            case InputsTypeEnum.offset5: { return s.payload as Fn_Args_offset5 }
            case InputsTypeEnum.size: { return s.payload as ISize }
            default: return s.payload as never
        }
        // const data_store = RootStore.stores[RootStore.active_state]!
        // const { fields, init } = dto_formStates[RootStore.active_state]


    }, [RootStore.active_state])

    // const {field,fieldState,formState}=useController<typeof current_state['init']>()




    const save = (store_id: InputsTypeEnum, data: ArgsTypesList[typeof RootStore.active_state]) => {
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
                // onSubmit={handleSubmit(save)}
                autoComplete="on"
                id='dform'
                display={'flex'}
                flexDirection={'column'}
                height={'fit-content'}
                margin={1}
            >
                <FormControl>
                    {current_state.fields.map(f => UC_Input(current_state.init))}
                </FormControl>
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


type FormValues = {
    FirstName: string;
};

function UC_Input(props: UseControllerProps<FormValues>) {
    const { field, fieldState } = useController(props);

    return (
        <FormControl variant="standard" key={field.name} margin='dense'>
            <InputLabel htmlFor={`input_` + field.name}>{ }</InputLabel>
            <Input id={`input_` + field.name}
                {...field}
            />

        </FormControl>
    );
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