import { _ID, _SizeF, _p } from '../../Helpers/HelpersFns';
import { ISideStateOffset } from '../../Models/FrameComponent/StvState';
import { _FrameStateWithNodes } from '../../Components/Pages/Router/DrawerPage';

interface IFA_Load {
    type: 'load';
    payload: _FrameStateWithNodes;
}
const initstate: _FrameStateWithNodes = {
    id: _ID(),
    type: 'f',
    size: { width: 350, height: 800 },
    pos: { x: 0, y: 0 },
    nodes: [
        {
            _id: "s1",
            coords: [
                { "x": 0, y: 0 },
                { "x": 350, y: 800 }
            ],
            sides: {
                bottom: "rama",
                left: "rama",
                right: "rama",
                top: "rama"
            },
            nsize: {
                width: 350,
                height: 800
            },
            isShow: false,
        }
    ]
};
const initializer = (size: _SizeF, pos = { x: 0, y: 0 }): _FrameStateWithNodes => {
    const { width, height } = size;
    const { x, y } = pos;
    const state = ({ width, height }: _SizeF, { x = 0, y = 0 }) => ({
        id: _ID(),
        type: 'f',
        size: { width, height },
        pos: { x, y },
        nodes: [
            {
                _id: "s1",
                coords: [
                    { x, y },
                    _p(x + width, y + height)
                ],
                sides: {
                    bottom: "rama",
                    left: "rama",
                    right: "rama",
                    top: "rama"
                },
                nsize: {
                    width,
                    height
                },
                isShow: false,
            }
        ]
    }) satisfies _FrameStateWithNodes;
    return state(size, pos);
};
interface IFA_setNext {
    type: 'setNext';
    payload: { next: ISideStateOffset; id: string; };
}
interface IFA_setId {
    type: 'setId';
    payload: { new_id: string; };
}
type _FrameActions = IFA_Load |
    IFA_setNext;
function frameReducer(state: _FrameStateWithNodes, action: _FrameActions): _FrameStateWithNodes {

    switch (action.type) {
        case 'load': {
            const frame = action.payload;
            return { ...state, ...frame };
        }

        case 'setNext': {
            const { next, id } = action.payload;
            if (!state) return initstate;
            let n = state.nodes;
            n = [...n.map(node => node._id === id ? { ...node, sides: { ...node.sides!, ...next } } : node)];

            return {
                ...state,
                nodes: n
            };


        }
        default: return state;
    }



}
