import React, { HTMLAttributes } from 'react';
import Icons from '../Icons/SvgIcons';

type IconButtonProps = {
    desc: string;
    svg_icon?: JSX.Element;
    onClickFn?: (...args: any[]) => void;
    type?: 'submit' | 'button' | 'reset'
}
export const IconButton: React.FC<IconButtonProps> = (props) => {
    const { desc, onClickFn, svg_icon, type = 'button' } = props;

    return (

        <button className="flex mx-2 items-center px-6 py-2  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
            onClick={onClickFn}
            type={type}
        >
            <span className='text-red-500'>

                {svg_icon ?? Icons.defaultIcon}
            </span>
            <span className='mx-2'>{desc} </span>
        </button>

    );
};
