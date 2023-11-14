import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputLabel } from '@mui/material'
import React from 'react'
import { DTO_InputSizeFull, dto_formdata } from '../../Models/ArgsTypeModel'
import { useForm } from 'react-hook-form'
import { _ID, _log } from '../../Helpers/HelpersFns'
import { ISizeFull } from '../../Interfaces/CommonTypes'

type FullSizeInputProps = {
  onFinish: (inputs: ISizeFull) => void
}

const FullSizeForm = ({ onFinish }: FullSizeInputProps) => {

  const { fields, init, desc, placeholder } = dto_formdata.dto_formFullSizes
  const { register, handleSubmit, getValues, watch } = useForm<typeof init>()
  const onSubmitFn = () => {
    const inputs = getValues()
    const W = +watch('width')
    // if (W > 1000) _log("WIDTH EXCEED!")
    onFinish(inputs)
    return inputs
  }

  return (
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
      <FormLabel htmlFor='fs_form' >
        {desc && desc}
      </FormLabel>
      {
        fields.map((f, idx) =>
          <FormControl variant="standard" key={_ID()} margin='dense'>
            <InputLabel htmlFor={`input_` + idx}>{placeholder && placeholder[f]}</InputLabel>
            <Input id={`input_` + idx}
              {...register(f, { required: true })}
              defaultValue=''
            />
            <FormHelperText >
              {placeholder && placeholder[f]}
            </FormHelperText>
          </FormControl>
        )
      }


      <Button type='submit'
        form='fs_form'
        variant='contained'
        color='success'

      >SUBMIT</Button>

    </Box>
  )
}


export default FullSizeForm

