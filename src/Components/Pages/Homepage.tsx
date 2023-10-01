import React, { useState } from 'react'
import { MathFunc, cc } from '../../Actions/ActionFuncs'
import { _log } from '../../Helpers/HelpersFns'
cc.save("plus", new MathFunc().plus, 55)
cc.save("minus", new MathFunc().minus, 150)

type Props = {}

const Homepage = (props: Props) => {
    const [inputX, setInputX] = useState<string | number>("")
    const Plus = (n: number | string) => {
        const res = cc.use("plus 55", n)
        _log("result: ", res)
    }
    return (
        <div className='bg-slate-500 w-auto h-auto'>

            <input type="number" value={inputX || ""} onChange={(e) => setInputX(e.target.value)} />
            <button className={`border-black border-2 mx-2 my-1 px-2 rounded-lg cursor-pointer active:bg-slate-300`}
                onClick={() => Plus(inputX)}
            >USE FUNC</button>
        </div>
    )
}

export default Homepage