import { Box, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Form } from 'react-router-dom'
import SillForm from '../FlexForm/SillForm'



const SillPage = observer(() => {

    return (


        <div className='min-w-[15em] bg-slate-500'>
            <SillForm />
        </div>

    )
})

export default SillPage

