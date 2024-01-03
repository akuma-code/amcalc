import { Button } from '@mui/material'
import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import UndoIcon from '@mui/icons-material/Undo';
type Props = {}

const ErrorPage = (props: Props) => {
    const err = useRouteError()

    console.log('error', err)
    return (
        <div className='h-full flex flex-col   text-center pt-20'>
            <b className='text-7xl'>Ошибка! Нет такой страницы!</b>
            <div>
                <Button sx={{ fontSize: 48, gap: 2 }} variant='outlined' size='small'>
                    <UndoIcon /> <Link to={'/'} >Home</Link>
                </Button>
            </div>

        </div>
    )
}

export default ErrorPage