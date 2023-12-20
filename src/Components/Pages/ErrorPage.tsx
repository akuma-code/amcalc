import React from 'react'
import { useRouteError } from 'react-router-dom'

type Props = {}

const ErrorPage = (props: Props) => {
    const err = useRouteError()

    console.log('error', err)
    return (
        <div className='w-full h-full flex-row   text-center pt-20'>
            <span className='text-7xl'>Ошибка! Нет такой страницы!</span>


        </div>
    )
}

export default ErrorPage