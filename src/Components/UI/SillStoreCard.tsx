import React, { useCallback, useContext } from 'react'
import { ArgStorage, StoreGroupData } from '../../Context/ArgStorage'
import { A_Sill } from '../../Interfaces/CommonTypes'
import { Button, Divider } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Link, redirect, useLoaderData, useNavigation } from 'react-router-dom'
import { _log } from '../../Helpers/HelpersFns'
import { isEqualSills } from '../../ActionComponents/Calculators/SillCalculator'

type SillCardProps = {
    data?: ArgStorage<A_Sill>
}

const SillStoreCard: React.FC<SillCardProps> = observer((props) => {
    const load_data = useLoaderData() as { data?: ArgStorage<A_Sill> }
    // load_data && _log(load_data)
    const { data } = props
    if (!data) return <div>No Storage</div>
    const { store } = data

    return (
        <div >
            {store.length >= 1 &&
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

            }
        </div>
    )
})

export default SillStoreCard


export const GroupList: React.FC<{ store: StoreGroupData<A_Sill> }> = (props) => {
    const { group_data, group_id } = props.store
    return (
        <div className=' flex-col text-left'>

            {group_data.map(({ L, B, count }, idx) =>
                <div key={idx} className='flex flex-row gap-2 justify-around'>

                    <span>{L}</span>
                    <span>{B}</span>
                    <span>{count}</span>
                </div>
            )}
            <Divider >
                <Button variant='text'>
                    <Link to={`/sill/groups/${group_id}`}>groupId: {group_id}</Link>
                </Button>
            </Divider>
        </div>
    )
}

