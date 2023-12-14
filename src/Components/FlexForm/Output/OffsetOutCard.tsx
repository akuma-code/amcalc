import { observer } from 'mobx-react-lite';
import { A_InputArgs, A_Offset5, A_Size } from '../../../Interfaces/CommonTypes';
import { Card, Stack } from '@mui/material';
import { Fn_Output_offset5 } from '../../../ActionComponents/ActionTypes/Types';
import { _ID } from '../../../Helpers/HelpersFns';

type OutputOffsetProps = {
    blockOut: Fn_Output_offset5[];
    blockIn: A_InputArgs;
};
export const OffsetOutCard: React.FC<OutputOffsetProps> = observer(({ blockOut, blockIn }) => {

    let init = {} as A_InputArgs
    switch (blockIn.argType) {
        case 'size_full': {
            // init = {...blockIn} as A_Size
            return
        }
        case 'offset5': {
            init = { ...blockIn as A_Offset5 }
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
                    <span className='text-left font-bold border-b-2 border-black px-1'>Inputs</span>
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
                        {blockOut.map(b =>

                            <ul className=' px-2 mx-1 text-right border-l-2 border-black' key={_ID()}>
                                <li>Угол: {b.angle}</li>
                                <li>Дельта Н: {b.deltaH}</li>
                                <li>Смещение: {b.sumXY}</li>
                                <li className='text-right'>({b.x} + {b.y})</li>

                            </ul>
                        )
                        }
                    </div>
                </Stack>
            </Stack>


        </Card>
    );
});
