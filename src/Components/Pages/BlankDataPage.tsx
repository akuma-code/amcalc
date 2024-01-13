
import { Link, Params, useLoaderData } from 'react-router-dom';
import { _log } from '../../Helpers/HelpersFns';
import { Box, Button, Stack } from '@mui/material';
import { URL_dev, URL_script, getGoogleSS } from '../../HTTP/axios';
import React, { useState } from 'react';
import { AxiosResponse } from 'axios';

type BlankPageProps = {}

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
    console.log('response: ', response?.data?.result)

    return response

}

export const BlankDataPage: React.FC<BlankPageProps> = () => {
    const response = useLoaderData() as { data: any }
    const { data } = response
    const [resp, setResp] = useState<any | null>(data)

    const recievedData = []



    const clickFn = async () => {
        console.log('data in clickFn', data.result.map((row: string[]) => row.map(i => parseFloat(i))))
        const parsed = data.result.map((row: string[]) => row.map(i => i))
        console.log('parsed', parsed.map((row: string[]) => row.map(s => typeof s === 'string' ? s : s)))
        setResp(data)
        try {
            JSON.parse(response.data.result)
        } catch (error) {
            _log(error)
        }
        // const parsed = data.result.map((row: string) => JSON.parse(row))
        // console.log('parsed', parsed)
    }

    return (
        <Stack>

            <div className='flex flex-row gap-2'>
                <Button variant='contained'>
                    <Link to={URL_dev}
                        target='_blank' referrerPolicy='origin-when-cross-origin'
                    >GoogleApp-Dev</Link>
                </Button>
                <Button variant='contained'>

                    <Link to={URL_script}
                        target='_blank' referrerPolicy='origin-when-cross-origin'
                    >Google App</Link>
                </Button>

                <Button onClick={clickFn}>FFF</Button>
            </div>
            <Box
                sx={{
                    [`& ol>div>li`]: { border: '1px solid black' },
                    maxWidth: '70vw'
                }}
            >
                {resp &&
                    <ol>
                        {
                            resp.result.map((p: string[], idx: number) => (
                                <div key={idx} className='flex flex-row '>
                                    {
                                        p.map((s, i) =>
                                            <li key={i} className='flex-grow'>{s}</li>
                                        )}
                                </div>))
                        }
                    </ol>
                }
            </Box>
        </Stack>
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