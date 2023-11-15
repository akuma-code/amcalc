import React from 'react'
import { useForm } from 'react-hook-form'
import { _log } from '../../Helpers/HelpersFns'
import { FormControl, TextField } from '@mui/material'
import { useStoresContext } from '../Hooks/useStoresContext'
import { mbxDataNode } from '../../mobXStore/Stores'
import { IC_ArgsList, FnKeys } from '../../ActionComponents/ActionTypes/Types'
import { DTO_Node } from '../../Models/DTO_ChainStore'

type FlexFormProps = {
    fields: keyof IC_ArgsList[FnKeys][]
    submitFn?: DTO_Node['fn']
    defaultState?: IC_ArgsList[FnKeys]
}



export const FlexForm: React.FC<FlexFormProps> = ({ fields = [], submitFn, defaultState }) => {
    const init = defaultState ? defaultState : {} as IC_ArgsList[FnKeys]
    const { register, handleSubmit, watch, formState: { errors, submitCount }, setError } = useForm<IC_ArgsList[FnKeys]>({ defaultValues: init })
    // const { mbxStore } = useStoresContext()
    // const F = Object.keys(fields) as unknown as keyof IC_ArgsList[FnKeys][] & string[]
    // // const savedFn = save2(submitFn!)
    // const onFinish = (args: any) => {
    //     if (!submitFn) {
    //         _log("No submit Fn")
    //         return { formdata: args }
    //     }
    //     // const s = savedFn(args)
    //     const data = {
    //         initState: args,
    //         result: submitFn(args)
    //     }
    //     const data_node = new mbxDataNode(data)
    //     mbxStore.add(data_node)
    //     // _log("datanode: ", data_node)
    //     return submitFn(args)
    // }
    // const resetFn = () => {
    //     mbxStore.clear()
    // }
    // if (F.length === 0) return <div>No inputs finded</div>
    return (
        <div className='m-1 p-2 border-slate-400 border-2 rounded-lg w-fit h-fit'>
            {/* <form name='flexform' id='flex_form' onSubmit={handleSubmit(onFinish)} >
                <div className='flex flex-col gap-2 justify-items-center' >
                    {

                        F.map((field) =>
                            <FormControl margin='dense' key={field}>
                                <label className='flex gap-1 flex-row justify-around align-baseline ' key={field}>

                                    <TextField {...register(field as keyof IC_ArgsList[FnKeys], { required: true })}
                                        color='primary'
                                        type='number'
                                        className='border-2 m-1 p-2 bg-slate-300 min-w-[7em]'
                                        size='small'
                                        error={errors[field as keyof IC_ArgsList[FnKeys]] ? true : false}
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
                    <button type="reset" placeholder='Calc' id='submit_btn' form='flex_form' onReset={resetFn}
                        className='border-2 decoration-purple-700 p-1 m-2 min-w-[8em] bg-red-400'
                    >
                        Reset [{submitCount}]
                    </button>
                </label>
            </form> */}
        </div>
    )
}

