import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSteps } from '../../../Hooks/useSteps';
import { useFrameData } from '../../../Hooks/useFrameData';
import { observer } from 'mobx-react-lite';
import { _ID, _Point, _SizeF, _p, _ss } from '../../../Helpers/HelpersFns';
import { FilledInputProps, Icon, InputAdornment, InputProps, OutlinedInputProps, TextField } from '@mui/material';
import Icons from '../../../Components/Icons/SvgIcons';


type SizeStepFormData = {
    step_type: 'size',
    fields: [
        {
            label: 'width',
            description: string,
            inputProps: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>,
            _id: string
            value: number
        },
        {
            label: 'height',
            description: string,
            inputProps: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>,
            _id: string
            value: number
        },
    ]
}
type PosStepFormData = {
    step_type: 'pos',
    fields: [
        {
            label: 'x',
            description: string,
            inputProps: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>,
            _id: string
            value: number
        },
        {
            label: 'y',
            description: string,
            inputProps: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>,
            _id: string
            value: number
        },
    ]
}

const createSteps = [
    {
        label: "Set Frame Size",
        description: "Setup frame size ",

    },
    {
        label: "Set Frame Pos",
        description: "Setup frame  start position",
        init_formdata: { pos: _p(0, 0) }
    },
    {
        label: "Set Imposts",
        description: "Setup frame imposts",
        init_formdata: { count: 0, dir: 'vertical' }

    },
    {
        label: "Finish Setup",
        description: "Setup frame nodes and stvs",

    },
]

const sizeFields = ['width', 'height'] as const
const posFields = ['x', 'y'] as const
const sizeProps = {
    icon: {
        width: Icons.WidthIcon,
        height: Icons.HeightIcon
    }
}
export const DrawerStepCreator: React.FC<{}> = observer(() => {

    const [activeStep, { handleBack, handleNext, handleReset }] = useSteps()
    const [form_data, setform_data] = useState<_SizeF & _Point>({ width: 1000, height: 1000, x: 0, y: 0 })
    const [rama] = useFrameData({ rama: { size: { ...form_data }, pos: { ...form_data } } })
    const handleSubmitStep = () => {

        handleNext()
    }
    return (
        <Box sx={ { maxWidth: 400, m: 4 } }>
            <Stepper activeStep={ activeStep } orientation="vertical">

                {
                    createSteps.map((step, index) => (
                        <Step key={ _ID() }>
                            <StepLabel
                                optional={
                                    index === createSteps.length - 1 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                { step.label }
                            </StepLabel>
                            <StepContent>
                                <Typography>{ step.description }</Typography>
                                <Box sx={ { display: 'flex', flexDirection: 'row' } }>
                                    {
                                        index === 0 &&
                                        sizeFields.map(f =>
                                            <TextField
                                                label={ f }
                                                key={ f }
                                                InputProps={ {
                                                    endAdornment: <InputAdornment position="end">
                                                        <Icon>
                                                            { f === 'width'
                                                                ? Icons.WidthIcon
                                                                : Icons.HeightIcon }
                                                        </Icon>
                                                    </InputAdornment>,
                                                } }
                                                value={ form_data[f] }
                                                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setform_data(prev => ({ ...prev, [f]: +e.target.value })) }

                                                sx={ { m: 1, width: '13ch' } }
                                            />
                                        )

                                    }
                                    {
                                        index === 1 &&
                                        posFields.map(f =>
                                            <TextField
                                                // label={ f }
                                                key={ f }
                                                InputProps={ {
                                                    endAdornment: <InputAdornment position="end">{ f }</InputAdornment>,
                                                } }
                                                value={ form_data && form_data[f] }
                                                onChange={ (e) => setform_data(prev => ({ ...prev, [f]: +e.target.value })) }
                                                sx={ { m: 1, width: '13ch' } }
                                            />
                                        )

                                    }

                                </Box>
                                <Box sx={ { mb: 2 } }>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={ handleNext }
                                            sx={ { mt: 1, mr: 1 } }
                                        >
                                            { index === createSteps.length - 1 ? 'Finish' : 'Continue' }
                                        </Button>
                                        <Button
                                            disabled={ index === 0 }
                                            onClick={ handleBack }
                                            sx={ { mt: 1, mr: 1 } }
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))
                }
            </Stepper>
            { activeStep === createSteps.length && (
                <Paper elevation={ 3 } sx={ { mx: 3, p: 3, bgcolor: '#9c7676' } }>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={ handleReset } sx={ { mt: 1, mr: 1 } }>
                        Reset
                    </Button>
                </Paper>
            ) }
        </Box>
    );
})

DrawerStepCreator.displayName = '*** Steps Creator____'