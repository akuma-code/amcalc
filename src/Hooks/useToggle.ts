import { useState } from "react";

export function useToggle(init?: boolean) {
    const [flag, setFlag] = useState(init || false)

    const On = () => setFlag(true)
    const Off = () => setFlag(false)
    const Switch = () => setFlag(prev => !prev)

    const toggle = { Switch, Off, On }

    return [flag, toggle] as const
}