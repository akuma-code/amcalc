import { Box } from '@mui/material'
import React from 'react'
import { FrameFactory } from '../../../Models/FrameFactory'
import { _ID, _log, _s, _ss } from '../../../Helpers/HelpersFns'

type TestPageProps = {}

export const TestPage: React.FC<TestPageProps> = (props) => {

    const tt = new FrameFactory('tt')



    return (
        <Box position={ 'relative' }
            sx={ { width: 1000, height: 850, border: '2px solid #000', bgcolor: '#1e8fff42' } }
        >
            <FrameBox frame={ TestFrame } />

            {/* <Box position={ 'absolute' } left={ 20 } top={ 20 }
                sx={ { width: 800, height: 400, bgcolor: 'turquoise' } }
            >

            </Box> */}

        </Box>

    )
}


export const FrameBox = ({ frame }: { frame: typeof TestFrame }) => {
    const rama = {
        size: frame.size,
        borders: {
            top: 'rama',
            right: 'rama',
            bottom: 'rama',
            left: 'rama',
        }
    }

    const nodes = frame.nodes
    return (
        <Box sx={ { border: '2px solid #000', ...rama.size } } >
            <img src='https://github.com/akuma-code/amcalc/blob/master/src/Assets/ff.svg' alt='ff'
            />
        </Box>
    )


}

// const testbox = <Box sx={ { ...rama.size, border: "2px solid black" } } position={ 'relative' } key={ 'rama' }>
//         { nodes.map(n =>
//             <Box key={ n._id } sx={ { ...n.resultSize, ...n.pos, border: "2px solid black", position: 'absolute' } } >
//                 {/* <Box sx={ { ...n.resultSize, ...n.pos, bgcolor: '#ffffff' } } textAlign={ 'center' }>
//                     nodeId: { n._id }
//                 </Box> */}
//             </Box>
//         ) }
//     </Box>

const TestFrame = {
    size: { width: 450, height: 600 },
    nodes: [
        {
            _id: 1,
            _size: _ss(200, 600),
            pos: { left: 10, top: 10 },
            bsides: {
                top: 'rama',
                right: 'impost',
                bottom: 'rama',
                left: 'rama',
            },
            bdelta: {
                top: 10,
                right: 6,
                bottom: 10,
                left: 10,
            },
            state: 'fix',
            resultSize: {
                width: 200 - 6 - 10,
                height: 600 - 10 - 10
            }
        },
        {
            _id: 2,
            _size: _ss(250, 600),
            pos: { left: 210, top: 13 },
            bsides: {
                top: 'rama',
                right: 'rama',
                bottom: 'rama',
                left: 'impost',
            },
            bdelta: {
                top: 13,
                right: 13,
                bottom: 13,
                left: 9,
            },
            state: 'stv',
            resultSize: {
                width: 250 - 13 - 9,
                height: 600 - 13 - 13
            }
        }]
}

