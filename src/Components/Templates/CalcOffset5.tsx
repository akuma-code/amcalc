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
    const changeFn = (key: keyof InputState, value: number) => setInputs(prev => ({ ...prev, [key]: value }))
    const onSubmitFn = (e: React.FormEvent) => {

        e.preventDefault()
        const target = e.target as typeof e.target & InputState


        _log(e)
    }
    return (
        <div>
            <form onSubmit={onSubmitFn}>
                {
                    Object.entries(inputs).map(([key, v]) =>
                        // <InputWHelper
                        //     placeholder={fields[key as keyof typeof fields]}
                        //     onChangeFn={(e) => changeFn(key as keyof typeof fields, +e.target.value)}
                        //     description={key}
                        //     key={key}
                        //     value={v?.toString()}
                        // />
                        <InputNumber
                            onChangeFn={(e) => changeFn(key as keyof typeof fields, +e.target.value)}
                            value={+inputs[key as keyof typeof inputs]}
                            desc={key}
                            key={key}
                        />
                    )
                }
                <IconButton type='submit'
                    desc='Submit'

                />
            </form>
        </div>
    )
}

export default CalcOffset5