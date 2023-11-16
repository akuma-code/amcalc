import { Box, Stack, FormLabel } from '@mui/material'
import { _log } from '../../Helpers/HelpersFns'
import Divider from '@mui/material/Divider';





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