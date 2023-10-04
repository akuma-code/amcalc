import React from 'react';
import { _styleSet } from '../../Helpers/HelpersFns';

type InputProps = {
    onChangeFn?: (v: string) => void;
    hookChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string;
    descriprion: string;
    placeholder?: string;
};



export const InputWHelper: React.FC<InputProps> = ({ onChangeFn, descriprion, value = "", placeholder, hookChange }) => {

    return (
        <div className="flex relative w-fit">
            <span className={_styleSet(InpStyles.spanStyle)}>
                {descriprion}
            </span>
            <input
                placeholder={placeholder || descriprion}
                type="text"
                id="with-email"
                onChange={hookChange}
                // onChange={(e) => onChangeFn(e.target.value)} 
                value={value || ""}
                name="url"
                className={_styleSet(InpStyles.inputStyle, InpStyles.focusStyle)} />
        </div>
    );
};
export const InpStyles = {
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