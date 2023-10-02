import React, { HTMLAttributes, useState } from 'react'
import { MathFunc, cc } from '../../Actions/ActionFuncs'
import { _log, _styleSet } from '../../Helpers/HelpersFns'
import Icons from '../Icons/SvgIcons'

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
type Props = {}
const tan = (Math.atan(1500 - 1250) / 1500 * 180 / Math.PI)
_log(tan)
const Homepage = (props: Props) => {
    const [inputX, setInputX] = useState<string | number>("")
    const [res, setRes] = useState<number | null>(null)
    const changeFn = (value: string | number) => {
        if (typeof value === 'string') return setInputX(prev => +value)
        else setInputX(prev => value)
    }
    const btnFn = (cb: (n: number) => number) => {
        const x = typeof inputX === 'string' ? +inputX : inputX
        setRes(prev => cb(x))
    }
    const newDesc = (text: string | number | null) => {
        if (!text) return null
        const res = typeof text === 'string' ? text : `${text}`
        return res
    }
    const reset = () => {
        setRes(prev => null)
        setInputX("")
    }
    return (
        <div className='bg-slate-500 w-auto h-auto flex p-2'>

            <InputWHelper
                onChangeFn={changeFn}
                descriprion='number'
                placeholder='input Number'
                value={inputX.toString()}
            />

            <IconButton
                svg_icon={Icons.PaperAirplane}
                desc={newDesc(res) || 'Calculate'}
                onClickFn={() => btnFn(n => n * 5)}
            />

            <IconButton
                svg_icon={Icons.RoundedArrows}
                desc={'reset'}
                onClickFn={reset}
            />
        </div>
    )
}

export default Homepage
type InputProps = {
    onChangeFn: (v: string) => void,
    value?: string,
    descriprion: string,
    placeholder?: string
}

const InputWHelper: React.FC<InputProps> = ({ onChangeFn, descriprion, value = "", placeholder }) => {

    return (
        <div className="flex relative w-fit">
            <span className={_styleSet(InpStyles.spanStyle)}>
                {descriprion}
            </span>
            <input
                placeholder={placeholder || descriprion}
                type="text"
                id="with-email"
                onChange={(e) => onChangeFn(e.target.value)} value={value || ""}
                name="url"
                className={_styleSet(InpStyles.inputStyle, InpStyles.focusStyle)}
            />
        </div>
    )
}
type IconButtonProps = {
    desc: string
    svg_icon?: JSX.Element
    onClickFn: (...args: any[]) => void
}
const IconButton: React.FC<IconButtonProps> = (props) => {
    const { desc, onClickFn, svg_icon } = props
    const defaultIcon = <svg width="20" height="20" fill="currentColor" viewBox="0 0 2304 1792" className="mr-4" xmlns="http://www.w3.org/2000/svg">
        <path d="M1728 448l-384 704h768zm-1280 0l-384 704h768zm821-192q-14 40-45.5 71.5t-71.5 45.5v1291h608q14 0 23 9t9 23v64q0 14-9 23t-23 9h-1344q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h608v-1291q-40-14-71.5-45.5t-45.5-71.5h-491q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h491q21-57 70-92.5t111-35.5 111 35.5 70 92.5h491q14 0 23 9t9 23v64q0 14-9 23t-23 9h-491zm-181 16q33 0 56.5-23.5t23.5-56.5-23.5-56.5-56.5-23.5-56.5 23.5-23.5 56.5 23.5 56.5 56.5 23.5zm1088 880q0 73-46.5 131t-117.5 91-144.5 49.5-139.5 16.5-139.5-16.5-144.5-49.5-117.5-91-46.5-131q0-11 35-81t92-174.5 107-195.5 102-184 56-100q18-33 56-33t56 33q4 7 56 100t102 184 107 195.5 92 174.5 35 81zm-1280 0q0 73-46.5 131t-117.5 91-144.5 49.5-139.5 16.5-139.5-16.5-144.5-49.5-117.5-91-46.5-131q0-11 35-81t92-174.5 107-195.5 102-184 56-100q18-33 56-33t56 33q4 7 56 100t102 184 107 195.5 92 174.5 35 81z">
        </path>
    </svg>
    return (

        <button className="flex mx-2 items-center px-6 py-2  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
            onClick={onClickFn}
        >
            {svg_icon ?? defaultIcon}
            {desc}
        </button>

    )
}


