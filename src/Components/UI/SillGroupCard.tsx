import React from 'react'
import { ArgStorage, StoreGroupData } from '../../Context/ArgStorage'
import { A_Sill } from '../../Interfaces/CommonTypes'
import { Divider } from '@mui/material'
import { observer } from 'mobx-react-lite'

type SillCardProps = {
    data?: ArgStorage<A_Sill>
}

const SillStoreCard: React.FC<SillCardProps> = observer((props) => {

    const { data } = props
    if (!data) return <div>No Storage</div>
    const { store } = data

    return (
        <div className='border-2 w-[15em] border-slate-950'>
            <div className="flex flex-row gap-2 justify-around">
                <b>длина</b>
                <b>ширина</b>
                <b>кол-во</b>
            </div>
            <div>

                {store.map(({ group_data, group_id }) =>
                    <GroupList key={group_id} store={{ group_data, group_id }} />
                )}
            </div>

        </div>
    )
})

export default SillStoreCard


const GroupList: React.FC<{ store: StoreGroupData<A_Sill> }> = observer((props) => {
    const { group_data, group_id } = props.store
    return (
        <div className=' flex-col text-center'>

            {group_data.map(({ L, B, count }, idx) =>
                <div key={idx} className='flex flex-row gap-2 justify-around'>

                    <span>{L}</span>
                    <span>{B}</span>
                    <span>{count}</span>
                </div>
            )}
            <Divider > <span className='text-center'>  groupId: {group_id}</span></Divider>
        </div>
    )
})