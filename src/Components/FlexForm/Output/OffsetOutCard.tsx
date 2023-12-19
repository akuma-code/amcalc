import { observer } from 'mobx-react-lite';
import { A_InputArgs, A_Offset5, A_Size } from '../../../Interfaces/CommonTypes';
import { Card, Stack } from '@mui/material';
import { Fn_Output_offset5 } from '../../../ActionComponents/ActionTypes/Types';
import { _ID } from '../../../Helpers/HelpersFns';
import { ANYobj } from '../../../Interfaces/MathActionsTypes';
import { OffsetResult, OutItem } from '../../../Context/DataOutputBlock';

type OutputOffsetProps = {
    blockOut: OutItem<A_Offset5>
    blockIn: A_InputArgs;
    index?: number
};
export const OffsetOutCard: React.FC<OutputOffsetProps> = observer(({ blockOut, blockIn, index }) => {

    let init = {} as A_InputArgs
    let out = []
    switch (blockIn.argType) {
        case 'size_full': {
            // init = {...blockIn} as A_Size
            return
        }
        case 'offset5': {
            init = { ...blockIn as A_Offset5 }
            out = blockOut.out as unknown as Fn_Output_offset5[]
            // console.log('blockout', blockOut.out)
            break
        }
    }



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
                    <span className='text-left font-bold border-b-2 border-black px-1'>{index && index}) Inputs</span>
                    <div>

                        <ul className='px-2 mx-1'>
                            <li>Ширина: {init.W} мм</li>
                            <li>Высота: {init.H} мм</li>
                            <li>Высота мин: {init.h} мм</li>
                            <li>дельта А: {init.da} мм</li>
                            <li>дульта В: {init.db} мм</li>
                        </ul>
                    </div>
                </Stack>
                <Stack justifyItems={'end'} flexDirection={'column'}>
                    <span className='text-right font-bold border-b-2  border-black'>Output</span>
                    <div>

                        {out.map(o =>

                            <ul className=' px-2 mx-1 text-right border-l-2 border-black' key={_ID()}>
                                <li>Угол: {o.angle}</li>
                                <li>Дельта Н: {o.deltaH}</li>
                                <li>Смещение: {o.sumXY}</li>
                                <li className='text-right'>({o.x} + {o.y})</li>

                            </ul>

                        )
                        }
                    </div>
                </Stack>
            </Stack>


        </Card>
    );
});
