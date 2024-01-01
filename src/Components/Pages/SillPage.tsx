import { Outlet, useNavigation } from 'react-router-dom'
import { SillFormHooked } from './Router/SillFormHooked'
import SillFormGroups from './Router/SillFormGroups'
import { observer } from 'mobx-react-lite'
import { ViewControlButtonGroup } from '../UI/ViewControlButtonGroup'
import { Button, ButtonGroup } from '@mui/material'
import { useStoresContext } from '../../Hooks/useStoresContext'




export const action = () => {

}

const SillPage = () => {
    const nav = useNavigation()
    const { ViewConfig } = useStoresContext()
    const { formAction, formData, formEncType } = nav
    // _log(_ConvertToStrings({ L: 0, B: 900 }))

    return (


        <div className='bg-slate-100'>
            <div className="flex flex-col">
                <div className='w-[60vw]'>
                    <ButtonGroup variant='contained' >
                        <Button onClick={() => ViewConfig.toggleVisible('devtools')}
                            variant='outlined' color='success'
                        >Toggle Form DevTools</Button>
                    </ButtonGroup>
                    <SillFormHooked />
                </div>
                <div className='w-[100vw] flex flex-row flex-grow'>
                    <SillFormGroups />
                    <div className="flex-grow">
                        <Outlet />

                    </div>
                </div>
            </div>
        </div>

    )
}

export default SillPage

