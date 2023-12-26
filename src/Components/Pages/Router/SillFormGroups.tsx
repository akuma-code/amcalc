import React from 'react'
import { useLoaderData } from 'react-router-dom'

type Props = {}

const SillFormGroups = (props: Props) => {

    const groups = useLoaderData()
    console.log('groups in groups', groups)
    return (
        <div className='m-1'>
            Sill Form Submit result

        </div>
    )
}

export default SillFormGroups