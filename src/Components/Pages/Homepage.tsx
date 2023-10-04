import React, { useState, useContext } from 'react'
import { _log, _promptVar } from '../../Helpers/HelpersFns'
import Icons from '../Icons/SvgIcons'
import { v2DataNode } from '../../mobXStore/ActionStore'
import { observer } from 'mobx-react-lite'
import { StoresContext, useStoresContext } from '../Hooks/useStoresContext'
import { IDTO_SimpleAction_v1, mbxDataNode } from '../../mobXStore/Stores'
import ActionTemplates from '../Templates/ActionTemplates'
import { InputWHelper } from '../UI/InputWHelper'
import { IconButton } from '../UI/IconButton'



type Props = {}

const Homepage = observer(() => {
    const { mbxStore } = useStoresContext()

    const [inputX, setInputX] = useState<string | number>("")
    const [res, setRes] = useState<number | null>(null)
    const changeFn = (value: string | number) => {
        if (typeof value === 'string') return setInputX(prev => +value)
        else setInputX(prev => value)
    }
    const btnFn = (cb: (n: number) => number) => {
        const x = typeof inputX === 'string' ? +inputX : inputX
        setRes(prev => cb(x))


    }
    const newDesc = (text: string | number | null) => {
        if (!text) return null
        const res = typeof text === 'string' ? text : `${text}`
        return res
    }
    const reset = () => {
        setRes(prev => null)
        setInputX("")
    }

    function addAction() {

        const fnScale = _promptVar("input scale rate")
        const [a, b] = fnScale.split(' ')
        const multiAction = ActionTemplates.multiple
        const res = multiAction.callback(+a, +b)
        _log(res)

        const node = new mbxDataNode(multiAction)
        mbxStore.store.push(node)

    }

    return (
        <div className='bg-slate-500 w-auto h-auto flex p-2'>

            <InputWHelper
                onChangeFn={changeFn}
                descriprion='number'
                placeholder='input Number'
                value={inputX.toString()}
            />
            <IconButton
                // svg_icon={Icons.BadgeCheck}
                desc={'Add func to store'}
                onClickFn={addAction}
            />
            <IconButton
                svg_icon={Icons.PaperAirplane}
                desc={newDesc(res) || 'Calculate'}
                onClickFn={addAction}
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

