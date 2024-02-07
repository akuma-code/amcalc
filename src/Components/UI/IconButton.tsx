import React, { HTMLAttributes } from 'react';
import Icons from '../Icons/SvgIcons';

type IconButtonProps = {
    desc?: string;
    svg_icon?: JSX.Element;
    onClickFn?: (...args: any[]) => void;
    type?: 'submit' | 'button' | 'reset'
    rounded?: boolean
    bgcolor?: string
}
export const IconButton: React.FC<IconButtonProps> = (props) => {
    const { desc, onClickFn, svg_icon, type = 'button', rounded = true, bgcolor = 'inherit' } = props;

    return (

        <button className={ `flex  items-center p-2  
        transition ease-in duration-200 uppercase 
        ${rounded ? `rounded-full` : `rounded-b-md`} 
        ${bgcolor}
         hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none`}
            onClick={ onClickFn }
            type={ type }
        >
            <span className='text-red-500'>

                { svg_icon ?? Icons.defaultIcon }
            </span>
            { desc ? <span className='mx-2'>{ desc } </span> : null }
        </button>

    );
};
