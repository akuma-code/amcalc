import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { FActionLoaderProps } from './SillForm'

type Props = {}


export const group_loader = async ({ request, params }: FActionLoaderProps) => {
    const { group_id } = params
    console.log('group_id', group_id)
    return group_id
}

const SillFormGroups = (props: Props) => {

    return (
        <div className='m-1'>
            Sill Form Submit result

        </div>
    )
}

export default SillFormGroups