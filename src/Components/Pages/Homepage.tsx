import { useState } from 'react'
import { _log, _promptVar } from '../../Helpers/HelpersFns'
import Icons from '../Icons/SvgIcons'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../Hooks/useStoresContext'
import { mbxDataNode } from '../../mobXStore/Stores'
import ActionTemplates from '../Templates/ActionTemplates'
import { InputWHelper } from '../UI/InputWHelper'
import { IconButton } from '../UI/IconButton'
import useInput from '../Hooks/useInput'



type Props = {}

const Homepage = observer(() => {
    const { mbxStore } = useStoresContext()
    const [inpX, onChangeX] = useInput(`26`)
    // const [inputX, setInputX] = useState<string | number>("")
    const [res, setRes] = useState<number | null>(null)
    // const changeFn = (value: string | number) => {
    //     if (typeof value === 'string') return setInputX(prev => +value)
    //     else setInputX(prev => value)
    // }
    // const btnFn = (cb: (n: number) => number) => {
    //     const x = typeof inputX === 'string' ? +inputX : inputX
    //     setRes(prev => cb(x))


    // }
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
        <div className='bg-slate-500 w-auto h-auto flex p-2' key={'HomePage'}>

            <InputWHelper
                // onChangeFn={()=>onChangeX(inpX)}
                hookChange={onChangeX}
                descriprion='number'
                placeholder='input Number'
                value={inpX}
            />
            <IconButton
                // svg_icon={Icons.BadgeCheck}
                desc={'Add func to store'}
                onClickFn={addAction}
            />
            <IconButton
                svg_icon={Icons.PaperAirplane}
                desc={newDesc(res) || 'Calculate'}
                onClickFn={() => { }}
            />

            <IconButton
                svg_icon={Icons.RoundedArrows}
                desc={'reset'}
                onClickFn={reset}
            />


        </div>
    )
})

export default Homepage

