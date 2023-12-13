import React from 'react'
import { A_Offset5 } from '../../../Interfaces/CommonTypes'
import CalcControl from '../../../ActionComponents/Calculators/CalcBoxFn'
import { _log } from '../../../Helpers/HelpersFns'

type Props = {
    saved_args: A_Offset5[]
}

const fakeinit = [
    new A_Offset5(100, 100, 50, 10, 10),
    new A_Offset5(200, 200, 100, 10, 20)
]

const fake_result = fakeinit.map(f => CalcControl.offset5.calcMap(f))

const OutputOffsetCard = (props: Props) => {
    _log(fake_result)
    return (
        <div>

        </div>
    )
}

export default OutputOffsetCard