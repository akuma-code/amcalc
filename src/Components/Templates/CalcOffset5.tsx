import React, { useState } from 'react'
import { CalcOffsetFn_Type5, DTO_CalcOffset5 } from '../../ActionComponents/Offset5/Offset5'
import { InputWHelper } from '../UI/InputWHelper'
import { IconButton } from '../UI/IconButton'
import { _log } from '../../Helpers/HelpersFns'
import InputNumber from '../UI/InputNumber'


const initState = {
    fields: {
        W: '',
        H: '',
        h: '',
        da: '',
        db: '',
    },
    fn: CalcOffsetFn_Type5

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