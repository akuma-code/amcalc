import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputLabel } from '@mui/material'
import React from 'react'
import { ArgsTypes, DTO_FormDataList, DTO_InputSizeFull, DTO_InputsProp, dto_formdata } from '../../Models/ArgsTypeModel'
import { useForm } from 'react-hook-form'
import { _ID, _log } from '../../Helpers/HelpersFns'
import { ISizeFull } from '../../Interfaces/CommonTypes'
import { ANYobj } from '../../Interfaces/MathActionsTypes'

type ANY_InputProps = {
  fields: readonly string[]
  init: ANYobj
  desc?: string
  placeholder?: ANYobj
}

const FullSizeForm: React.FC<ANY_InputProps> = ({ fields, init, desc, placeholder }) => {

  // const { fields, init, desc, placeholder } = dto_formdata.dto_formFullSizes
  const { register, handleSubmit, getValues } = useForm<typeof init>()
  const onSubmitFn = () => {
    const inputs = getValues()
    // if (W > 1000) _log("WIDTH EXCEED!")

    return inputs
  }

  return (<FormLabel htmlFor='fs_form' >
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


export default FullSizeForm

