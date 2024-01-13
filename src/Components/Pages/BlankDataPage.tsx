import React, { PropsWithChildren } from 'react'
import { Link, Params, useLoaderData } from 'react-router-dom';
import { _log } from '../../Helpers/HelpersFns';
import { Button } from '@mui/material';
import { URL_dev, URL_script, getGoogleSS } from '../../HTTP/axios';

type BlankPageProps = {} & PropsWithChildren

export const scriptAppLoader = async () => {

    // const response = await fetch(URL_script, { headers: _headers, }).then(res => {
    //     let data: { data: any } = { data: [] };

    //         try {
    //             data.data = res
    //             return data
    //         } catch (error) {
    //             _log("resError! ", error)
    //         }
    // })
    const response = await getGoogleSS()
    console.log('response: ', response)

    return { data: response }

}

export const BlankDataPage: React.FC<BlankPageProps> = () => {

    const data = useLoaderData()
    console.log('data: ', data)
    const recievedData = []



    const clickFn = () => {
        const data = getGoogleSS()
        console.log('data in clickFn', data)
    }

    return (
        <div className='flex flex-row gap-2'>
            <Button variant='contained'>

                <Link to={ URL_dev }
                    target='_blank' referrerPolicy='origin-when-cross-origin'
                >GoogleApp-Dev</Link>
            </Button>
            <Button variant='contained'>

                <Link to={ URL_script }
                    target='_blank' referrerPolicy='origin-when-cross-origin'
                >Google App</Link>
            </Button>

            <Button onClick={ clickFn }>FFF</Button>
        </div>
    )
}

// async function F() {
//         let res: Response | null = null
//         const headers = {
//             'Content-Type': `application/json`,
//             'Access-Control-Allow-Origin': 'http://localhost:3000',
//             'Access-Control-Allow-Headers': "*"
//         }
//         try {

//             const response = await fetch('https://script.google.com/macros/s/AKfycbwbz2dzJ2yL6L-9RkCbKeC8zfxg0xg8UmG8fOik-MUiLtrsQ6mpRY_5f1bGC0kw5XOR/exec',
//                 { headers, mode: 'cors' })
//             res = response
//             return { data: res }
//         } catch (error) {
//             console.log('Load error: ', error)
//         } finally {
//             return res ? res : { data: `error!!` }
//         }
//     }