import { Button, ButtonGroup } from '@mui/material'
import { Outlet, useNavigation } from 'react-router-dom'
import { useStoresContext } from '../../Hooks/useStoresContext'
import SillFormGroups from './Router/SillFormGroups'
import { SillFormHooked } from './Router/SillFormHooked'
import { observer } from 'mobx-react-lite'



const SillPage = observer(() =>
{
    const { ViewConfig } = useStoresContext()


    return (


        <div className='bg-slate-100'>
            <div className="w-[60vw] flex flex-col gap-2">
                <div className=' py-1 self-end'>
                    <ButtonGroup variant='contained' size='small' >
                        <Button onClick={ () => ViewConfig.toggleVisible('devtools') }
                            variant='outlined' color='success'
                            sx={ ViewConfig.visible.devtools ? { bgcolor: '#e09d37', fontWeight: 'bold' } : { bgcolor: 'transparent' } }
                        >show DevTools
                        </Button>
                        <Button onClick={ () => ViewConfig.toggleVisible('showPossibleMerge') }
                            variant='outlined' color='success'
                            sx={ ViewConfig.visible.showPossibleMerge ? { bgcolor: '#e09d37', fontWeight: 'bold' } : { bgcolor: 'transparent' } }
                        >
                            Show possible
                        </Button>
                    </ButtonGroup>
                </div>
                <SillFormHooked />
                <div className='w-[100vw] flex flex-row flex-grow'>
                    <SillFormGroups />

                    <div className="flex-grow">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>

    )
})
SillPage.displayName = '*Sill Page'
export default SillPage

