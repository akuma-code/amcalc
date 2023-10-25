import React from 'react'
import { IDataTransferObject } from '../../Models/DTO_ChainStore'
import { FormControl, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ArgsList, Enum_NodesAction, FnKeys, IFuncArgs } from '../../ActionComponents/ActionTypes/Types'
import { _log } from '../../Helpers/HelpersFns'

type FormProps = {
    dto: IDataTransferObject
    fields?: string[]
}

const DTOForm: React.FC<FormProps> = ({ dto, }) => {
    const { fields, type, initState } = dto
    const { register, handleSubmit, formState: { errors, submitCount }, setError } = useForm<typeof initState>({ defaultValues: initState })
    if (!fields) return FieldsError

    function onFinish(args: IFuncArgs) {
        _log(args)
        return args
    }

    return (
        <div className='m-1 p-2 border-slate-400 border-2 rounded-lg w-fit h-fit'>
            <form name='flexform' id='flex_form'
                onSubmit={handleSubmit(onFinish)}
            >
                <div className='flex flex-col gap-2 justify-items-center' >
                    <span className='text-center'>{type.toUpperCase()}</span>
                    {

                        fields.map((field) =>
                            <FormControl margin='dense' key={field}>
                                <label className='flex gap-1 flex-row justify-around align-baseline ' key={field}>

                                    <TextField {...register(field as keyof IFuncArgs, { required: true })}
                                        color='primary'
                                        type='number'
                                        className='border-2 m-1 p-2 bg-slate-300 min-w-[7em]'
                                        size='small'
                                        error={errors[field as keyof typeof errors] ? true : false}
                                        label={field}
                                        autoComplete='true'
                                    />
                                    {
                                        errors[field as keyof typeof errors]?.type === "required" && (
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
                    <button type="reset" placeholder='Calc' id='submit_btn' form='flex_form' onReset={() => { }}
                        className='border-2 decoration-purple-700 p-1 m-2 min-w-[8em] bg-red-400'
                    >
                        Reset [{submitCount}]
                    </button>
                </label>
            </form>
        </div>
    )
}

const FieldsError = <div>DTO fields not set!</div>

export default DTOForm