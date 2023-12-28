import { Outlet, useNavigation } from 'react-router-dom'
import { SillFormHooked } from './Router/SillFormHooked'
import { SortSillBy_B } from '../../Hooks/useSortByB'



export const action = () => {

}

const SillPage = () => {
    const nav = useNavigation()
    const { formAction, formData, formEncType } = nav
    // _log(_ConvertToStrings({ L: 0, B: 900 }))
    SortSillBy_B([])
    return (


        <div className='bg-slate-100'>
            <div className="flex flex-col">
                <div className='w-[60vw]'>
                    <SillFormHooked />
                </div>
                <div className='w-[100vw]'>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default SillPage

