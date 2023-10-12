import React, { FormEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputNumber, { RefInput } from '../UI/InputNumber'
import { CalcOffsetType5 } from '../../Actions/TestAction_Offset5'
import { _log } from '../../Helpers/HelpersFns'
import Input from '@mui/material/Input'
import { FormControl, InputLabel, TextField } from '@mui/material'
type FormProps = {
    W: number
    H: number
    h: number
    da: number
    db: number
}
type FlexFormProps = {
    fields: string[]
    submitFn?: (...args: any) => any
    defaultState?: { [Key: string]: number }
}
const initFormState: FormProps = {
    W: 1000,
    H: 1500,
    h: 850,
    da: 25,
    db: 25,
}
export const FlexForm: React.FC<FlexFormProps> = ({ fields = [], submitFn, defaultState }) => {
    const { register, handleSubmit, watch, formState: { errors, submitCount }, setError } = useForm<FormProps>({
        defaultValues: defaultState ?? {}
    })


    const onFinish: SubmitHandler<FormProps> = (formdata: FormProps) => {
        if (!submitFn) {
            _log("No submit Fn")
            return { formdata }
        }

        const res = submitFn(formdata)
        _log("result: ", res)
        return res
    }
    const resetFn = () => {
        setError('root', { message: "RESET" })
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

                                    <TextField {...register(field as keyof FormProps, { required: true })}
                                        color='primary'
                                        type='number'
                                        className='border-2 m-1 p-2 bg-slate-300 min-w-[7em]'
                                        size='small'
                                        error={errors[field as keyof FormProps] ? true : false}
                                        label={field}
                                        autoComplete='true'
                                    />
                                    {
                                        errors[field as keyof FormProps]?.type === "required" && (
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

