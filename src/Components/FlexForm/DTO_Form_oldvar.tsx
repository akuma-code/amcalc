import React from 'react'
import { IDataTransferObject } from '../../Models/DTO_ChainStore'
import { Box, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IC_ArgsList, Enum_NodesAction, FnKeys, IC_FuncArgs, TypeSelector } from '../../ActionComponents/ActionTypes/Types'
import { _ID, _log } from '../../Helpers/HelpersFns'
import { StringifyProps } from '../../ActionComponents/ActionTypes/FnProperties'
import { ANYobj } from '../../Interfaces/MathActionsTypes'
import { Button } from '@mui/material'

type FormDTO = Pick<TypeSelector<FnKeys>, 'fields' | 'initstate'>

export type FormProps = {
    type: FnKeys
    initState: FormDTO['initstate']
    submitFn?: (args: FormDTO['initstate']) => void
}

const getInitFields = (obj: FormProps['initState']) => {

    const stringProps2 = Object.entries(obj).reduce((sum, [k, v]) => {

        if (typeof v === 'number') sum = { ...sum, [k as keyof typeof sum]: "" }
        else sum = { ...sum, [k]: v }
        return sum
    }, {} as StringifyProps<FormProps['initState']>)
    return stringProps2

}



const DTOForm: React.FC<FormProps> = ({ initState, submitFn, type }) => {
    const init = getInitFields(initState)
    type TT = typeof type
    type DV = ReturnType<typeof getInitFields>
    const fields = Object.keys(init)

    const { register, handleSubmit } = useForm()

    const regProps = (fieldName: string) => register(fieldName as keyof IC_ArgsList[TT])
    if (!fields) return FieldsError

    function onFinish<K extends IC_FuncArgs>(args: K) {
        if (submitFn && type === 'offset5') submitFn(args)
        if (submitFn && type === 'nets') submitFn(args as IC_ArgsList['nets'])
        _log(args)
        return args
    }
    const inputCounter = (c: number) => `component-helper-${c}`
    const helperCounter = (c: number) => `component-helper-text-${c}`
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={handleSubmit(d => onFinish<IC_ArgsList[TT]>(d as IC_ArgsList[TT]), (er) => _log(er.root?.message))}
            autoComplete="on"
            id='dto_form'
            display={'flex'}
            flexDirection={'column'}
            height={'fit-content'}
        >
            {
                fields && fields.map((f, idx) =>
                    <FormControl variant="standard" key={_ID()}>
                        <InputLabel htmlFor={inputCounter(idx)}>{f}</InputLabel>
                        <Input
                            {...regProps(f as never)}
                            id={inputCounter(idx)}
                            defaultValue=''
                            aria-describedby={helperCounter(idx)}
                        />
                        <FormHelperText id={helperCounter(idx)}>
                            Введите размер
                        </FormHelperText>
                    </FormControl>
                )
            }
            <Button type='submit'
                form='dto_form'
                variant='contained'
                color='success'

            >SUBMIT</Button>

        </Box>
    )
}

const FieldsError = <div>DTO fields not set!</div>
DTOForm.displayName = 'DTO_FORM'
export default DTOForm

// const old = <div className='m-1 p-2 border-slate-400 border-2 rounded-lg w-fit h-fit'>
//             <form name='flexform' id='flex_form'
//                 onSubmit={handleSubmit(onFinish)}
//             >
//                 <div className='flex flex-col gap-2 justify-items-center' >
//                     <span className='text-center'>{type.toUpperCase()}</span>
//                     {

//                         //   fields &&  fields.map((field) =>
//                         <FormControl margin='dense' >
//                             {/* <label className='flex gap-1 flex-row justify-around align-baseline ' key={field}>

//                                 <TextField {...register(field as keyof IFuncArgs, { required: true })}
//                                     color='primary'
//                                     type='number'
//                                     className='border-2 m-1 p-2 bg-slate-300 min-w-[7em]'
//                                     size='small'
//                                     error={errors[field as keyof typeof errors] ? true : false}
//                                     label={field}
//                                     autoComplete='true'
//                                 />
//                                 {
//                                     errors[field as keyof typeof errors]?.type === "required" && (
//                                         <p role="alert" className='mt-2 bg-red-400 p-2'>field "{field}" is required</p>
//                                     )
//                                 }

//                             </label> */}
//                         </FormControl>
//                         // )
//                     }
//                 </div>
//                 <label className='flex flex-row justify-between'>

//                     <button type="submit" placeholder='Calc' id='submit_btn' form='flex_form'
//                         className='border-2 decoration-purple-700 p-1 m-2 min-w-[8em] bg-red-400'
//                     >Calculate
//                     </button>
//                     <button type="reset" placeholder='Calc' id='submit_btn' form='flex_form' onReset={() => { }}
//                         className='border-2 decoration-purple-700 p-1 m-2 min-w-[8em] bg-red-400'
//                     >
//                         Reset [{submitCount}]
//                     </button>
//                 </label>
//             </form>
//         </div>