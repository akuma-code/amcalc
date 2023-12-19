
import React from 'react'
import { Box, Button, FormLabel } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { BrandType } from '../../../Interfaces/CommonTypes'

export type Args_Sill = {

    L: number
    B: number
    count: number
}
type A_Sill = BrandType<Args_Sill, 'sill'>
type dtoSill = {
    fields: ReadonlyArray<keyof A_Sill>
    init: A_Sill
}
const dto_SILL_FORM: dtoSill = {
    fields: ['L', 'B', 'count'],
    init: { L: 0, B: 110, count: 1, argType: 'sill' }
}

export const MultiFieldsForm: React.FC<{}> = observer(() => {


    return (
        <FormLabel htmlFor='form' key={'MultiFormSelector'}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                // onSubmit={handleSubmit(save)}
                autoComplete="on"
                id='form'
                display={'flex'}
                flexDirection={'column'}
                height={'fit-content'}
                margin={1}
            >


                <Button type='submit'
                    form='form'
                    variant='contained'
                    color='success'

                >
                    SUBMIT
                </Button>
                <Button type='reset'
                    form='form'
                    variant='contained'
                    color='error'
                    sx={{ margin: 2 }}
                >
                    RESET
                </Button>

            </Box>
        </FormLabel>

    )

})


MultiFieldsForm.displayName = '___MultiFormSelector'
