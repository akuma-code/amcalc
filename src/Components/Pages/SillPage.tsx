import { Outlet, useNavigation } from 'react-router-dom'
import { SillFormHooked } from './Router/SillFormHooked'
import SillFormGroups from './Router/SillFormGroups'
import { observer } from 'mobx-react-lite'




export const action = () => {

}

const SillPage = observer(() => {
    const nav = useNavigation()
    const { formAction, formData, formEncType } = nav
    // _log(_ConvertToStrings({ L: 0, B: 900 }))

    return (


        <div className='bg-slate-100'>
            <div className="flex flex-col">
                <div className='w-[60vw]'>
                    <SillFormHooked />
                </div>
                <div className='w-[100vw]'>
                    <SillFormGroups />
                    <Outlet />
                </div>
            </div>
        </div>

    )
})

export default SillPage

