import { v4 } from 'uuid'


export const _log = console.log

export const _styleSet = (...args: string[]): string => {
    return args.join(' ')
}

export const _promptVar = (msg: string) => prompt(msg) ?? ""

export const _ID = () => v4().slice(0, 4)