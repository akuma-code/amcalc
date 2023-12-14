import React, { PropsWithChildren } from 'react'
import { _styleSet } from '../../Helpers/HelpersFns'

type TextProps = {
    styles?: string


} & PropsWithChildren

export const Text: React.FC<TextProps> = ({ styles, children }) => {
    const _style = _styleSet(styles || "")
    return (
        <div className={"text-lg" + _style}>{children}</div>
    )
}