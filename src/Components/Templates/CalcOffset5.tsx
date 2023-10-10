import React, { useState } from 'react'
import { DTO_CalcOffset5 } from '../../Actions/TestAction_Offset5'

type CalcOffset5Props = {
    action: DTO_CalcOffset5['fn']
    args: DTO_CalcOffset5['args']
}

const CalcOffset5 = ({ action, args }: CalcOffset5Props) => {

    const [inputs, setInputs] = useState<typeof args>(args)
    function changeFn(idx: keyof typeof args, value: number) {
        setInputs(prev => ({ ...prev, [idx]: value }))
    }

    const result = action(...inputs)
    return (
        <div>
            <div>

                {
                    inputs.map((arg, idx) =>
                        <input type='number' value={arg} onChange={(e) => changeFn(idx, +e.target.value)} key={idx}>
                        </input>)
                }
            </div>

            <div>
                <ol>
                    {
                        Object.entries(result?.calc!)
                            .map(([key, value], idx) =>
                                <li key={idx}>
                                    {key}:{value}
                                </li>
                            )

                    }
                </ol>
            </div>
        </div>
    )
}

export default CalcOffset5