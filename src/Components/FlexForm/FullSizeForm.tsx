import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputLabel } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { ArgsTypes, DTO_FormDataList, DTO_InputSizeFull, DTO_InputsProp } from '../../Models/ArgsTypeModel'
import { useForm } from 'react-hook-form'
import { _ID, _log } from '../../Helpers/HelpersFns'
import { ISizeFull } from '../../Interfaces/CommonTypes'
import { ANYobj } from '../../Interfaces/MathActionsTypes'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../Hooks/useStoresContext'
import { Fn_Args_offset5 } from '../../ActionComponents/ActionTypes/Types'
import { InputsStore, dto_forms } from '../../mobXStore/InputsStore'

type ANY_InputProps = {
  fields: readonly string[]
  init: ANYobj
  desc?: string
  placeholder?: ANYobj
}



const InputForm: React.FC<ANY_InputProps> = ({ fields, init, desc, placeholder }) => {

  // const { fields, init, desc, placeholder } = dto_formdata.dto_formFullSizes
  const { register, handleSubmit, getValues } = useForm<typeof init>()
  const onSubmitFn = () => {
    const inputs = getValues()
    _log(inputs)
    return inputs
  }

  return (
    <FormLabel htmlFor='fs_form' >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit(onSubmitFn)}
        autoComplete="on"
        id='fs_form'
        display={'flex'}
        flexDirection={'column'}
        height={'fit-content'}
      >

        {desc && desc}

        {
          fields.map((f, idx) =>
            <FormControl variant="standard" key={_ID()} margin='dense'>
              <InputLabel htmlFor={`input_` + idx}>{placeholder && placeholder[f]}</InputLabel>
              <Input id={`input_` + idx}
                {...register(f, { required: true })}
                defaultValue=''
              />
              {/* <FormHelperText >
              {placeholder && placeholder[f]}
            </FormHelperText> */}
            </FormControl>
          )
        }


        <Button type='submit'
          form='fs_form'
          variant='contained'
          color='success'

        >SUBMIT</Button>

      </Box> </FormLabel>
  )
}
export const InputsFS = (): React.ReactNode => {

  // const { InputStore } = useStoresContext()

  const { register, handleSubmit, getValues, } = useForm<ISizeFull>()
  // const fields = ['width', 'height'] as const
  // const desc = "FullSize"
  // const placeholder: Record<keyof ISizeFull, string> = {
  //   height: "Высота",
  //   width: "Ширина"
  // }

  const save = () => {
    // savedata('size_full', getValues())

  }
  const Form = useMemo(() => {
    const { size_full } = dto_forms()
    const f = InputForm({ ...size_full })
    return f
  }, [])
  return Form
  // (
  //   <FormLabel htmlFor='fs_form' >
  //     <Box
  //       component="form"
  //       sx={{
  //         '& .MuiTextField-root': { m: 1, width: '25ch' },
  //       }}
  //       onSubmit={handleSubmit(save)}
  //       autoComplete="on"
  //       id='fs_form'
  //       display={'flex'}
  //       flexDirection={'column'}
  //       height={'fit-content'}
  //     >

  //       {desc && desc}

  //       {
  //         fields.map((f, idx) =>
  //           <FormControl variant="standard" key={_ID()} margin='dense'>
  //             <InputLabel htmlFor={`input_` + idx}>{placeholder && placeholder[f]}</InputLabel>
  //             <Input id={`input_` + idx}
  //               {...register(f, { required: true })}
  //               defaultValue=''
  //             />
  //             {/* <FormHelperText >
  //             {placeholder && placeholder[f]}
  //           </FormHelperText> */}
  //           </FormControl>
  //         )
  //       }


  //       <Button type='submit'
  //         form='fs_form'
  //         variant='contained'
  //         color='success'

  //       >SUBMIT</Button>

  //     </Box> </FormLabel>
  // )
}
export const InputsO5 = () => {
  const store = useStoresContext()
  const { register, handleSubmit, getValues } = useForm<Fn_Args_offset5>()
  const fields = ['H', "W", "da", "db", "h"] as const
  const desc = "Offset5"
  const placeholder: Record<keyof Fn_Args_offset5, string> = {
    H: "Высота",
    W: "Ширина",
    da: "дельта А",
    db: "дельта Б",
    h: "Высота мин"
  }
  const save = () => {
    store.InputStore.save('offset5', getValues())
    const s = store.InputStore.load('offset5')
    _log(...s)
  }

  return (
    <FormLabel htmlFor='fs_form' >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit(save)}
        autoComplete="on"
        id='fs_form'
        display={'flex'}
        flexDirection={'column'}
        height={'fit-content'}
      >

        {desc && desc}

        {
          fields.map((f, idx) =>
            <FormControl variant="standard" key={_ID()} margin='dense'>
              <InputLabel htmlFor={`input_` + idx}>{placeholder && placeholder[f]}</InputLabel>
              <Input id={`input_` + idx}
                {...register(f, { required: true })}
                defaultValue=''
              />
              {/* <FormHelperText >
              {placeholder && placeholder[f]}
            </FormHelperText> */}
            </FormControl>
          )
        }


        <Button type='submit'
          form='fs_form'
          variant='contained'
          color='success'

        >SUBMIT</Button>

      </Box> </FormLabel>
  )
}
// export const InputFormSelector = (itype: ArgsTypes) => {
//   const {InputStore} = useStoresContext()
//   const F: Record<ArgsTypes, React.ReactNode> = {
//     offset5: InputsO5(),
//     size_full: InputsFS(),
//     size: InputsFS()
//   }
//   return F[itype]
// }

export default InputForm

