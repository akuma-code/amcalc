import React, { useState } from 'react'
import { CalcOffsetType5, DTO_CalcOffset5 } from '../../Actions/TestAction_Offset5'
import { InputWHelper } from '../UI/InputWHelper'
import { IconButton } from '../UI/IconButton'
import { _log } from '../../Helpers/HelpersFns'
import InputNumber from '../UI/InputNumber'

type CalcOffset5Props = {
    args: DTO_CalcOffset5['fn']
    fn: DTO_CalcOffset5['args']
}

const initState = {
    fields: {
        W: '',
        H: '',
        h: '',
        da: '',
        db: '',
    },
    fn: CalcOffsetType5

}

type InputState = { [K in keyof typeof initState['fields']]: number }

const CalcOffset5 = ({ fields, fn }: Partial<typeof initState>) => {

    const [inputs, setInputs] = useState<Record<keyof InputState, number | string>>(fields!)

    return (
        <div>

        </div>
    )
}

export default CalcOffset5