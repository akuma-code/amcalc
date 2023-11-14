import { Box, Stack, FormLabel } from '@mui/material'
import { useState } from 'react'
import { IC_ArgsList, Enum_NodesAction, FnKeys, TypeSelector } from '../ActionTypes/Types'
import { useDTO } from '../../Components/Hooks/useDTO'
import { _log } from '../../Helpers/HelpersFns'
import Divider from '@mui/material/Divider';
import { dto_formdata } from '../../Models/ArgsTypeModel'




type CalcBoxProps = {



}

const CalcBox = (props: CalcBoxProps) => {



    return (
        <Box sx={{
            border: '2px solid green',
            p: 1, m: 1,
        }}
            height={'fit-content'}
        >
            <Stack spacing={1}
                justifyContent={'space-between'}
                alignItems={'end'}
                divider={<Divider orientation='horizontal' flexItem />}
            >
                <FormLabel sx={{

                    fontWeight: 'bold',
                    textSizeAdjust: 'auto',
                    fontStyle: 'oblique',
                }}
                >

                </FormLabel>

            </Stack>
        </Box >
    )
}

export default CalcBox