import React, { PropsWithChildren, useContext, useMemo } from 'react'
import { ArgStorage, StoreGroupData } from '../../Context/ArgStorage'
import { A_Sill } from '../../Interfaces/CommonTypes'
import { Button, Divider } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Link, redirect, useLoaderData, useNavigation, useParams } from 'react-router-dom'
import { _log } from '../../Helpers/HelpersFns'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { mergeSills } from '../../ActionComponents/Calculators/SillCalculator'

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

export const GroupIdCard: React.FC<PropsWithChildren> = observer(() => {
    const { group_id } = useParams() as { group_id?: string }

    const { SillStore } = useStoresContext()
    const searhItem = useMemo(() => {
        const item = SillStore?.store.find(g => g.group_id === group_id)
        // item && item.group_data.map(d=>({...d, }))
        return item
    }, [SillStore?.store, group_id])

    if (!searhItem) return <div className='text-center text-3xl'>Invalid ID!</div>

    const { group_data } = searhItem
    const items = group_data
    return (
        <div className="flex flex-col bg-slate-400  m-1 p-1 max-w-[30vw]">
            <div className="flex flex-row  justify-around">
                <div className='  text-left flex-shrink px-1 border-2' >
                    #
                </div>
                <div className=' w-full text-center flex-grow border-2' >
                    L, мм
                </div>
                <div className=' w-full text-center flex-grow border-2'>
                    B, мм
                </div>
                <div className=' w-full text-right pr-1 border-2 flex-grow'>
                    Кол-во, шт
                </div>

            </div>
            <div className="flex flex-col m-1">

                {group_data.map(({ L, B, count }, idx) =>

                    <div key={idx} className='flex flex-row gap-2   justify-around' >
                        <div className="text-center flex-shrink">
                            {idx + 1})
                        </div>
                        <div className='text-center flex-grow'>
                            <b className='bg-green-200'>{L}</b>
                        </div>
                        <div className='text-center flex-grow'>
                            <b className='bg-green-200' >{B}</b>
                        </div>
                        <div className='text-center flex-grow '>
                            <b className='bg-green-200'>{count}</b>
                        </div>
                    </div>
                )
                }
            </div >
            <div className="text-end">
                <Button onClick={() => mergeSills(items)}>
                    Merge
                </Button>
                <Button variant='contained' color='error'>
                    <Link to={'/sill'}>Close </Link>
                </Button>
            </div>
        </div >

    )


})