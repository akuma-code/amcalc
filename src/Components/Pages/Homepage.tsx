import { useState } from 'react'
import { _deg2rad, _log, _promptVar } from '../../Helpers/HelpersFns'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../Hooks/useStoresContext'
import { createOutputTableData } from '../FlexForm/OutputTable'
import { Box, Stack } from '@mui/material'
import CalcBox from '../../ActionComponents/Calculators/CalcBox'



const Homepage = observer(() => {

    // const { mbxStore, dto_Store } = useStoresContext()
    // const dtos = dto_Store.traverse()

    const [res, setRes] = useState<number | null>(null)
    // const stored = mbxStore.store.map(n => createOutputTableData(n.data.initState, n.data.result))

    const reset = () => {
        setRes(prev => null)
        // setInputX("")
        // mbxStore.clear()
        // _log(mbxStore.list())
    }

    // _log(Offset5Node)

    return (

        <div >
            <div className='bg-slate-500 w-auto h-auto flex p-2' key={'HomePage'}>

                {/* <PatchBox
                    view_mode='inline'
                    // bg_color='#0936ca'
                    width={300}
                    height={100}
                    rows={1}


                /> */}
            </div>
            {/* <div className='border-red-950 border-2 p-2 mt-2'>
                <CalcOffset5Component
                    fields={{
                        W: "",
                        da: "",
                        db: "",
                        H: "",
                        h: "",
                    }}
                />
            </div> */}
            <div key={'OffsetType5 Container'} >
                <Box

                >
                    <Stack direction={'row'}>
                        {/* <FlexForm fields={['W', 'H', 'h', 'da', 'db']}
                            submitFn={CalcOffsetFn_Type5.fn}
                            defaultState={{

                                W: 1000,
                                H: 1500,
                                h: 850,
                                da: 25,
                                db: 25,
                            }}
                    /> */}


                    </Stack>
                </Box>
            </div>

        </div>
    )
})

export default Homepage

