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
import { AnyArg, useDinamicInputs } from '../../Hooks/useDynamicInputs'
import { ArgsTypes, ArgsTypesList, DTO_FormDataList } from '../../../Models/ArgsTypeModel'
import { dto_formStates, DTO_FormStatesList } from '../DTO_Forms'
import { DataStore, ExtendedRootStores, IRootStores_v1 } from '../../../Context/RootStore'
import { ISize, ISizeFull } from '../../../Interfaces/CommonTypes'
import { Fn_Args_offset5 } from '../../../ActionComponents/ActionTypes/Types'


type RS = Required<IRootStores_v1>
type Props = {

}

const DynamicInputsForm = observer((props: Props) => {
    const { RootStore } = useStoresContext()
    const AS = RootStore.active_state
    const DIN = useDinamicInputs(AS)
    const methods = useForm<typeof DIN.init>()
    // _log(fields)
    // const methods = useForm<AnyArg>()

    // const current_state = useMemo(() => {
    //     const ac = RootStore.active_state
    //     // if(active_state) return undefined
    //     const dto = dto_formStates
    //     const current = () => dto[ac].init
    //     const s = {
    //         type: ac,
    //         payload: current()
    //     }
    //     switch (RootStore.active_state) {
    //         case InputsTypeEnum.size_full: {
    //             return s.payload as ISizeFull
    //         }
    //         case InputsTypeEnum.offset5: { return s.payload as Fn_Args_offset5 }
    //         case InputsTypeEnum.size: { return s.payload as ISize }
    //         default: return
    //     }
    //     // const data_store = RootStore.stores[RootStore.active_state]!
    //     // const { fields, init } = dto_formStates[RootStore.active_state]


    // }, [RootStore.active_state])

    // const {field,fieldState,formState}=useController<typeof current_state['init']>()




    const save = (store_id: InputsTypeEnum, data: AnyArg) => {
        _log("saved to ", store_id)
        _log("data: ", data)
        RootStore.saveTostore(store_id, data)
    }
    const C1 = useForm<ISizeFull>()
    return (
        <FormProvider {...methods}>


            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                onSubmit={methods.handleSubmit((d) => save(AS, d))}
                autoComplete="on"
                id='dform'
                display={'flex'}
                flexDirection={'column'}
                height={'fit-content'}
                margin={1}
            >

                {/* {
                fields.map(f => */}
                <FormControl variant="standard" margin='dense' >
                    <Controller name={'height'} control={C1.control} shouldUnregister={true}
                        render={({ field: { name, onChange, value } }) =>

                            <div>
                                <InputLabel htmlFor={`input_` + name}>{name}</InputLabel>
                                <Input id={`input_` + name}
                                    onChange={onChange}
                                    value={value} />
                            </div>
                        }
                    />
                </FormControl>
                <FormControl variant="standard" margin='dense' >
                    <Controller name={'width'} control={C1.control} shouldUnregister={true}
                        render={({ field: { name, onChange, value } }) =>

                            <div>
                                <InputLabel htmlFor={`input_` + name}>{name}</InputLabel>
                                <Input id={`input_` + name}
                                    onChange={onChange}
                                    value={value} />
                            </div>
                        }
                    />
                </FormControl>
                {/* )
                } */}

                {ControlBtns('dform')}


            </Box>



        </FormProvider >
    )
})

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
    const { control } = useFormContext()

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



function UcInput(props: UseControllerProps<AnyArg>) {
    const { field } = useController(props);
    const { name, onBlur, onChange, value, ref } = field

    return <FormControl variant="standard" key={name} margin='dense'>
        <InputLabel htmlFor={`input_` + name}>{field.name}</InputLabel>
        <Input id={`input_` + name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
        />

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