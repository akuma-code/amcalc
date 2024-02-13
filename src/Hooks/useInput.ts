import React, { useState } from "react";

export function useInput(initialValue: string | number) {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        typeof initialValue === 'number'
            ? setValue(+v)
            : setValue(v)

    }

    return [
        value, onChange
    ] as const
};
export function useInputObject<T extends { [key: string]: string | number }>(initialValue: T) {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof initialValue) => {
        const v = e.target.value
        setValue(prev => ({
            ...prev,
            [key]: v
        }))


    }

    return [
        value, onChange
    ] as const
};