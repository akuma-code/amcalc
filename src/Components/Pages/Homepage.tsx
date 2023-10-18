import { useState } from 'react'
import { _deg2rad, _log, _promptVar } from '../../Helpers/HelpersFns'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../Hooks/useStoresContext'
// import ActionTemplates from '../Templates/ActionTemplates'
import useInput from '../Hooks/useInput'
import { CalcOffsetFn_Type5 } from '../../ActionComponents/Offset5/Offset5'
import { FlexForm } from '../FlexForm/FlexForm'
import { OutputTable, createOutputTableData } from '../FlexForm/OutputTable'
import { Box, Stack } from '@mui/material'

import dto_astore from '../../ActionComponents/ActionModels/DTO_Store'
_log(dto_astore)

// NetFnItem.addArgs([{ width: 300, height: 500 }])
// NetFnItem.addArgs([{ width: 600, height: 800 }])
// _log(NetFnItem)

const Homepage = observer(() => {
    const { mbxStore } = useStoresContext()
    const [inpX, onChangeX] = useInput(``)
    const [res, setRes] = useState<number | null>(null)
    const stored = mbxStore.store.map(n => createOutputTableData(n.data.initState, n.data.result))
    const newDesc = (text: string | number | null) => {
        if (!text) return null
        const res = typeof text === 'string' ? text : `${text}`
        return res
    }
    const reset = () => {
        setRes(prev => null)
        // setInputX("")
        mbxStore.clear()
        _log(mbxStore.list())
    }

    // _log(Offset5Node)
    function addAction() {
        // const fnScale = _promptVar("input scale rate")
        // const [a, b] = fnScale.split(' ')
        // const multiAction = ActionTemplates.multiple


        // const node = new mbxDataNode(multiAction)
        // mbxStore.store.push(node)
        // const r = mbxStore.list()
        // _log(r)
    }

    return (

        <div >
            <div className='bg-slate-500 w-auto h-auto flex p-2' key={'HomePage'}>

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
                        <FlexForm fields={['W', 'H', 'h', 'da', 'db']}
                            submitFn={CalcOffsetFn_Type5}
                            defaultState={{

                                W: 1000,
                                H: 1500,
                                h: 850,
                                da: 25,
                                db: 25,
                            }}
                        />
                        <OutputTable
                            storedNodes={stored}

                        />
                    </Stack>
                </Box>
            </div>

        </div>
    )
})

export default Homepage

