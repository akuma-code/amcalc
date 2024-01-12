import React, { PropsWithChildren } from 'react'
import { Link, Params, useLoaderData } from 'react-router-dom';
import { _log } from '../../Helpers/HelpersFns';
import { Button } from '@mui/material';

type BlankPageProps = {} & PropsWithChildren
const URL_dev = `https://script.google.com/macros/s/AKfycbzDwO9fxSndxIjRChCOlclJ5Le0J_mJ2HK8r0Lbg1c/dev`
const URL_script = `https://script.google.com/macros/s/AKfycbwbz2dzJ2yL6L-9RkCbKeC8zfxg0xg8UmG8fOik-MUiLtrsQ6mpRY_5f1bGC0kw5XOR/exec`

const _headers = {
    'Content-Type': `application/json`,
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': "*"
}

export const scriptAppLoader = async () => {

    const response = await fetch(URL_script, { headers: _headers, mode: 'no-cors' }).then(res => {
        let data: { data: any } = { data: [] };
        if (typeof res === 'string') {
            try {
                data.data = JSON.parse(res)
                return data
            } catch (error) {
                _log("resError! ", error)
            }

        } else {
            data.data = res
            return data
        }
        return data
    })
    return response

}

export const BlankDataPage: React.FC<BlankPageProps> = () => {

    const data = useLoaderData()
    console.log('data: ', data)
    const recievedData = []


    async function F() {
        let res: Response | null = null
        const headers = {
            'Content-Type': `application/json`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': "*"
        }
        try {

            const response = await fetch('https://script.google.com/macros/s/AKfycbwbz2dzJ2yL6L-9RkCbKeC8zfxg0xg8UmG8fOik-MUiLtrsQ6mpRY_5f1bGC0kw5XOR/exec',
                { headers, mode: 'cors' })
            res = response
            return { data: res }
        } catch (error) {
            console.log('Load error: ', error)
        } finally {
            return res ? res : { data: `error!!` }
        }
    }
    const clickFn = () => {
        F().then(_log)
    }

    return (
        <div>
            <Button variant='contained'>

                <Link to={'https://script.google.com/macros/s/AKfycbzDwO9fxSndxIjRChCOlclJ5Le0J_mJ2HK8r0Lbg1c/dev'}
                    target='_self' referrerPolicy='origin-when-cross-origin' rel="noreferrer"
                >GoogleApp-Dev</Link>
            </Button>
            <Button variant='contained'>

                <Link to={'https://script.google.com/macros/s/AKfycbwbz2dzJ2yL6L-9RkCbKeC8zfxg0xg8UmG8fOik-MUiLtrsQ6mpRY_5f1bGC0kw5XOR/exec'}
                    target='_self' referrerPolicy='unsafe-url' rel="noreferrer"
                >Google App</Link>
            </Button>
            <Button>

                <Link to={'https://script.google.com/macros/library/d/1Fsvj2W_Xw670xMQRrz23V4w_Ll_VC3vOF6XX27hS8oKNVSlvleVdaTvi/1'}
                    target='_blank' referrerPolicy='no-referrer' rel="noreferrer"
                >Lib</Link>
            </Button>
            <Button onClick={clickFn}>FFF</Button>
        </div>
    )
}

