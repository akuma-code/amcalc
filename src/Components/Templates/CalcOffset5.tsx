import React, { useState } from 'react'
import { CalcOffsetType5, DTO_CalcOffset5 } from '../../Actions/TestAction_Offset5'

type CalcOffset5Props = {
    args: DTO_CalcOffset5['fn']
    fn: DTO_CalcOffset5['args']
}
const initState = {
    args: ['W', 'H', 'h', 'da', 'db'],
    fn: CalcOffsetType5
}
const CalcOffset5Component = ({ fn, args }: CalcOffset5Props) => {

    const [inputs, setInputs] = useState<typeof args>(args)



    return (
        <div>
            <div>


            </div>

            <div>
                <ol>
                    {


                    }
                </ol>
            </div>
        </div>
    )
}

export default CalcOffset5Component