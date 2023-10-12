import React, { HTMLAttributes } from 'react'
import { _styleSet } from '../../Helpers/HelpersFns'

const InpStyles = {
    spanStyle: `rounded-l-md 
            inline-flex  
            items-center 
            px-3 
            border-t
            bg-white 
            border-l 
            border-b 
            border-gray-300
            text-gray-500
            shadow-sm 
            text-sm`,
    inputStyle: `rounded-r-lg 
            flex-1 
            appearance-none 
            border 
            border-gray-300 
            w-full 
            py-2 
            px-4
            bg-white
            text-gray-700 
            placeholder-gray-400
            shadow-sm 
            text-base
                       `,
    focusStyle: ` 
            focus:outline-none 
            focus:ring-2 
            focus:ring-purple-600 
            focus:border-transparent`
}

type InputNumberProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: number | string
    desc?: string

} & HTMLAttributes<HTMLInputElement>

const InputNumber: React.FC<InputNumberProps> = ({ onChange, desc, value }) => {


    return (
        <div className="flex relative w-fit m-1 ">
            <span className={_styleSet(InpStyles.spanStyle, "w-fit min-w-[25%]")}>
                {desc}
            </span>
            <input
                type="number"
                onChange={onChange}
                value={value}
                className={_styleSet(InpStyles.inputStyle, InpStyles.focusStyle)} />
        </div>
    )
}


export const RefInput = React.forwardRef((props: InputNumberProps, ref) => <InputNumber {...props} />)
export default InputNumber

