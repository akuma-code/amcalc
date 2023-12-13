import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import CalcControl from '../../../ActionComponents/Calculators/CalcBoxFn'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { A_Offset5, A_Size, _ArgsMaker } from '../../../Interfaces/CommonTypes'
import { useOutputCalc } from '../../../Hooks/useOutputCalc'
import { _log } from '../../../Helpers/HelpersFns'
import OutputOffsetCard from './OutputOffsetCard'
import { Calc } from '../../../Hooks/useFuncs'
import { Box, Card, CardContent, CardHeader, Divider, Stack } from '@mui/material'
import { Fn_Output_offset5 } from '../../../ActionComponents/ActionTypes/Types'
import { InputsTypeEnum } from '../../../Hooks/useFormStateSelector'

type OutputProps = {}


const Output2 = observer((props: OutputProps) => {
    const { RootStore: RS } = useStoresContext()
    const blocks = RS.traverse().map(d => d.output)
    const dataO = RS.select(InputsTypeEnum.offset5).output
    const bb = dataO.blocks as Fn_Output_offset5[][]



    return (
        <div>
            {
                bb.map(bls => bls.map((b, idx) => <OffsetOut block={b} key={idx} />))

            }
        </div>
    )
})

type OutputSizeCardProps = {
    block: {
        angle: number,
        deltaH: number,
        sumXY: number,
        tgA: number,
        x: number,
        y: number
    }
}
const OffsetOut: React.FC<OutputSizeCardProps> = observer(({ block }) => {
    const init = new A_Offset5(100, 100, 50, 10, 10)




    return (
        <Card
            sx={{
                p: 1,
                m: 1,
                borderRadius: 3,

            }}
        >
            <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <Stack flexDirection={'column'}>
                    <b className='text-right'>Inputs</b>

                    <ul className='px-2 mx-1'>
                        {/* <li>Ширина: {init.W} мм</li>
                        <li>Высота: {init.H} мм</li>
                        <li>Высота мин: {init.h} мм</li>
                        <li>дельта А: {init.da} мм</li>
                        <li>дульта В: {init.db} мм</li> */}
                    </ul>
                </Stack>
                <Stack justifyItems={'end'} flexDirection={'column'} >
                    <b className='text-right'>Output</b>

                    <ul className=' px-2 mx-1 text-right border-l-2 border-black'>
                        <li>Угол: {block.angle}</li>
                        <li>Дельта Н: {block.deltaH}</li>
                        <li>Смещение: {block.sumXY}</li>
                        <li className='text-right'>({block.x} + {block.y})</li>

                    </ul>
                </Stack>
            </Stack>


        </Card>
    )
})









Output2.displayName = '*** Output_v2 ***'
export default Output2