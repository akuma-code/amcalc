import React, { useCallback, useMemo, useState } from 'react'
import BentoLayoutPage from '../Pages/BentoLayoutPage'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'

type LSelectorProps = {}

type LayoutState = {
    type: 'bento' | 'sill'
    render: React.ReactNode
}

const LAYOUTS: Record<LayoutState['type'], LayoutState> = {
    bento: { type: 'bento', render: <BentoLayoutPage /> },
    sill: { type: 'sill', render: <div>SILL</div> }
}

export const LayoutSelector: React.FC<LSelectorProps> = observer((props) => {




    return (<>
        {/* {ViewConfig.layout.path === 'bento' && <BentoLayoutPage />}
        {ViewConfig.layout.path === 'sill' && <div className='pt-10'>SILL</div>} */}
    </>)


})

LayoutSelector.displayName = 'LayoutSelector'