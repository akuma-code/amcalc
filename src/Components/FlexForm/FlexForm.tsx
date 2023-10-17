import React, { FormEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputNumber, { RefInput } from '../UI/InputNumber'
import { CalcOffsetType5 } from '../../Actions/TestAction_Offset5'
import { _log } from '../../Helpers/HelpersFns'
import Input from '@mui/material/Input'
import { FormControl, InputLabel, TextField } from '@mui/material'
import { useStoresContext } from '../Hooks/useStoresContext'
import { mbxDataNode } from '../../mobXStore/Stores'
import { save2, saveWrapper } from '../../Helpers/saveWrapper'

type Offset5Args = {
    W: number
    H: number
    h: number
    da: number
    db: number
}
type FlexFormProps<T> = {
    fields: (keyof T)[]
    submitFn?: (...args: any) => any
    defaultState?: { [Key: string]: number }
}
const initFormState: Offset5Args = {
    W: 1000,
    H: 1500,
    h: 850,
    da: 25,
    db: 25,
}
export const FlexForm: React.FC<FlexFormProps<Offset5Args>> = ({ fields = [], submitFn, defaultState }) => {
    const { register, handleSubmit, watch, formState: { errors, submitCount }, setError } = useForm<Offset5Args>({
        defaultValues: defaultState ?? {}
    })
    const { mbxStore } = useStoresContext()

    const loggedSubmitFn = saveWrapper<Offset5Args>(submitFn!)
    // const savedFn = save2(submitFn!)
    const onFinish: SubmitHandler<Offset5Args> = (args: Offset5Args) => {
        if (!submitFn) {
            _log("No submit Fn")
            return { formdata: args }
        }
        const res = loggedSubmitFn(args)
        // const s = savedFn(args)
        const data = {
            initState: args,
            result: res
        }
        const data_node = new mbxDataNode(data)
        mbxStore.add(data_node)
        // _log("datanode: ", data_node)
        return res
    }
    const resetFn = () => {
        mbxStore.clear()
    }
    if (fields.length === 0) return <div>No inputs finded</div>
    return (
        <div className='m-1 p-2 border-slate-400 border-2 rounded-lg w-fit h-fit'>
            <form name='flexform' id='flex_form' onSubmit={handleSubmit(onFinish)} >
                <div className='flex flex-col gap-2 justify-items-center' >
                    {

                        fields.map((field) =>
                            <FormControl margin='dense' key={field}>
                                <label htmlFor="flex_form" className='flex gap-1 flex-row justify-around align-baseline ' key={field}>

                                    <TextField {...register(field as keyof Offset5Args, { required: true })}
                                        color='primary'
                                        type='number'
                                        className='border-2 m-1 p-2 bg-slate-300 min-w-[7em]'
                                        size='small'
                                        error={errors[field as keyof Offset5Args] ? true : false}
                                        label={field}
                                        autoComplete='true'
                                    />
                                    {
                                        errors[field as keyof Offset5Args]?.type === "required" && (
                                            <p role="alert" className='mt-2 bg-red-400 p-2'>field "{field}" is required</p>
                                        )
                                    }

                                </label>
                            </FormControl>
                        )
                    }
                </div>
                <label className='flex flex-row justify-between'>

                    <button type="submit" placeholder='Calc' id='submit_btn' form='flex_form'
                        className='border-2 decoration-purple-700 p-1 m-2 min-w-[8em] bg-red-400'
                    >Calculate
                    </button>
                    <button type="reset" placeholder='Calc' id='submit_btn' form='flex_form' onReset={resetFn}
                        className='border-2 decoration-purple-700 p-1 m-2 min-w-[8em] bg-red-400'
                    >
                        Reset [{submitCount}]
                    </button>
                </label>
            </form>
        </div>
    )
}

