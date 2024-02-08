import React, { useState } from 'react';

const LineikaH: React.FC<{ _count: number; }> = ({ _count }) => {

    const _d = [`m0 0`, ..._stepsV(_count), 'z'].join(" ");
    const initSteps = _stepsSize(_count).map(n => ({
        numb: n, t: <text textAnchor="start" x={ -120 } y={ n === 0 ? 30 : n } fontSize={ 32 } key={ n }>{ n }</text>
    })
    );
    const [steps, setSteps] = useState(initSteps);

    return (

        <svg viewBox={ `0 0 100 2000` } preserveAspectRatio='xMinYMin meet' x={ 0 } pointerEvents={ 'none' } xmlns=''>

            <path stroke='black' d={ _d } />
            <g>

                { initSteps.map((step, i) => <text key={ step.numb }
                    textAnchor="start" x={ 60 } y={ step.numb === 0 ? 30 : step.numb }
                    fontSize={ 32 }>{ step.numb }</text>
                ) }
            </g>
        </svg>
    );
};
const LineikaW: React.FC<{ _count: number; }> = ({ _count }) => {

    const _d = [`m0 0`, ..._stepsH(_count), 'z'].join(" ");
    const initSteps = _stepsSize(_count).map(n => ({
        numb: n, t: <text textAnchor="start" x={ n === 0 ? 30 : n } y={ 120 } fontSize={ 32 } key={ n }>{ n }</text>
    })
    );
    const [steps, setSteps] = useState(initSteps);

    return (

        <svg viewBox={ `0 0 2000 100` } preserveAspectRatio='xMinYMin meet' x={ 0 } pointerEvents={ 'none' }>

            <path stroke='black' d={ _d } />
            <g>

                { initSteps.map((step, i) => <text key={ step.numb }
                    textAnchor="start" y={ 60 } x={ step.numb === 0 ? 30 : step.numb }
                    fontSize={ 32 }>{ step.numb }</text>
                ) }
            </g>
        </svg>
    );
};
const _stepsV = (count: number) => {
    let c = 1;
    let res: string[] = [];
    while (c <= count) {
        res.push([
            `h50 `,
            `h-50`,
            `v25`,
            `h20`,
            `h-20`,
            `v25`,
            `h20`,
            `h-20`,
            `v25`,
            `h20 `,
            `h-20`,
            `v25`,
        ].join(" ")
        );
        c++;
    }

    return res;
};
const _stepsH = (count: number) => {
    let c = 1;
    let res: string[] = [];
    while (c <= count) {
        res.push([
            `v50 `,
            `v-50`,
            `h100`,
            `v50`,
            `v-50`,
        ].join(" ")
        );
        c++;
    }

    return res;
};
const _stepsSize = (count: number) => {
    let c = 0;
    let res: number[] = [];
    while (c < count + 1) {
        res.push(100 * c);
        c++;
    }

    return res;
};
export const Rulers = ({ c }: { c: number; }) => (<svg viewBox='0 0 2000 2000' opacity={ 0.3 }>

    <LineikaW _count={ 20 } />
    <LineikaH _count={ 20 } />
</svg>);
