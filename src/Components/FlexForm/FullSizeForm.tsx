import { Box, Button, FormControl, FormLabel, Input, InputLabel } from '@mui/material'
import React, { useMemo } from 'react'
import { UseFormRegister, useForm } from 'react-hook-form'
import { _ID, _log } from '../../Helpers/HelpersFns'
import { ISizeFull } from '../../Interfaces/CommonTypes'
import { ANYobj } from '../../Interfaces/MathActionsTypes'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../Hooks/useStoresContext'
import { Fn_Args_offset5 } from '../../ActionComponents/ActionTypes/Types'
import { dto_forms } from '../../mobXStore/InputsStore'
import { StringifyProps } from '../../ActionComponents/ActionTypes/FnProperties'

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
const InputsO5 = observer(() => {
  // const store = useStoresContext()
  // const { InputStore: IS } = store
  // const current_state = IS.inpType
  // // const { offset5: of5_dto, size_full } = IS.get_form_data
  // const { fields, init, desc } = IS.get_form_data[current_state]
  //   ;
  // const { register, handleSubmit, getValues, reset } = useForm<typeof init>()

  // const save = () => {
  //   switch (current_state) {
  //     case 'size_full': {
  //       IS.save(current_state, getValues())

  //       break
  //     }
  //     case 'offset5': {
  //       IS.save(current_state, getValues())
  //       break
  //     }
  //     case 'size': {
  //       IS.save(current_state, getValues())
  //       break

  //     }
  //     default: break
  //   }
  //   IS.save(current_state, getValues())
  //   reset()
  // const s = IS.load('offset5')
  // }

  return (
    <FormLabel htmlFor='o5_form' >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        // onSubmit={handleSubmit(save)}
        autoComplete="on"
        id='o5_form'
        display={'flex'}
        flexDirection={'column'}
        height={'fit-content'}
        margin={1}
      >

        {/* {desc && desc} */}

        {
          // fields.map((f, idx) =>
          //   <FormControl variant="standard" key={_ID()} margin='dense'>
          //     <InputLabel htmlFor={`input_` + idx}>{`placeholder && placeholder[f] as any`}</InputLabel>
          //     <Input id={`input_` + idx}
          //       {...register(f, { required: true })}
          //       defaultValue='' />

          //   </FormControl>
          // )
        }


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
})
InputsO5.displayName = "____________Offset5 Inputs Form_________________"
// export const InputFormSelector = (itype: ArgsTypes) => {
//   const {InputStore} = useStoresContext()
//   const F: Record<ArgsTypes, React.ReactNode> = {
//     offset5: InputsO5(),
//     size_full: InputsFS(),
//     size: InputsFS()
//   }
//   return F[itype]
// }

// export default InputForm

function FieldControl(idx: number, f: keyof Fn_Args_offset5, register: UseFormRegister<Fn_Args_offset5>, placeholder?: StringifyProps<Fn_Args_offset5>,) {
  return <FormControl variant="standard" key={_ID()} margin='dense'>
    <InputLabel htmlFor={`input_` + idx}>{placeholder && placeholder[f]}</InputLabel>
    <Input id={`input_` + idx}
      {...register(f, { required: true })}
      defaultValue='' />
    {/* <FormHelperText >
        {placeholder && placeholder[f]}
      </FormHelperText> */}
  </FormControl>
}

