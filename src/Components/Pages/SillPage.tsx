import React from 'react'
import { Form, Outlet } from 'react-router-dom'
import SillForm from './Router/SillForm'
import { _log } from '../../Helpers/HelpersFns'
import { _ConvertToStrings } from '../../Hooks/useFieldSet'



export const action = () => {

}

const SillPage = () => {

    // _log(_ConvertToStrings({ L: 0, B: 900 }))

    return (


        <div className='bg-slate-100'>
            <div className="grid-cols-2">
                <div className='min-w-[25inch] min-h-[10em] grid-flow-col-dense'>
                    <SillForm />
                </div>
                <div className='grid'>
                    <Outlet /></div>
            </div>
        </div>

    )
}

export default SillPage

