import React from 'react'
import { Form, Outlet } from 'react-router-dom'
import SillForm from '../FlexForm/SillForm'



const SillPage = () => {

    return (


        <div className='bg-slate-500'>
            <div className="grid-cols-2">
                <div className='min-w-[25inch] min-h-[10em] grid-flow-col-dense'>
                    <SillForm />
                </div>
                <div><Outlet /></div>
            </div>
        </div>

    )
}

export default SillPage

