
import { Link, Params, useLoaderData } from 'react-router-dom';
import { _log, _trim } from '../../Helpers/HelpersFns';
import { Box, Button, Stack } from '@mui/material';
import { SheetResponse, URL_script, getGoogleSS, postGoogleSS } from '../../HTTP/axios';
import React, { useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import { sheetDataParser } from '../../HTTP/SheetDataParser';

type BlankPageProps = {}


export const scriptAppLoader = async () => {


    const response = await getGoogleSS()
    console.log('response: ', response)

    return response

}


const resultParser = (row: string[]) => Array.isArray(row) ? row.map(i => +_trim(i)) : row

export const BlankDataPage: React.FC<BlankPageProps> = () => {
    const response = useLoaderData() as AxiosResponse<{ result: string[][], version: string }>




    const clickFn = async () => {


        try {

            const Aresponse = await postGoogleSS()
            // as Promise<{ result: string[], title: string, version: string }[]>
            const { result, sheetId, version } = Aresponse

            // console.log('data:', Aresponse.forEach(_log))

            console.log('postresult', Aresponse)


        } catch (error) {
            _log(error)
        }

    }
    const MemozData = useMemo(() => {
        const { data } = response
        const { result } = data


        const sheet = result.map(resultParser)
        return sheet
    }, [response])

    return (
        <Stack p={ 1 }>

            <div className='flex flex-row gap-2 my-2'>
                {/* <Button variant='contained'>
                    <Link to={ URL_dev }
                        target='_blank' referrerPolicy='origin-when-cross-origin'
                    >GoogleApp-Dev</Link>
                </Button>
                <Button variant='contained'>

                    <Link to={ URL_script }
                        target='_blank' referrerPolicy='origin-when-cross-origin'
                    >Google App</Link>
                </Button> */}

                <Button onClick={ clickFn } variant='contained' color='info'>Update</Button>
            </div>
            <Box
                sx={ {
                    [`& div>div`]: { border: '1px solid black', textAlign: 'center', minWidth: '80px', fontWeight: 'bold' },
                    [`& ol>div>li`]: { border: '1px solid black', textAlign: 'center', minWidth: '80px' },
                    maxWidth: '70vw'
                } }
            >{ MemozData &&
                <SSTable sdata={ MemozData } />
                }

            </Box>
        </Stack>
    )
}
const wsize = [.4, .5, .6, .7, .8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5]
const hsize = [.5, .6, .7, .8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4]

const SSTable = ({ sdata }: { sdata: number[][] }) => {
    const THEAD = <div className='flex flex-row max-w-[70wv] self-end'>
        <div>w/h</div>
        { wsize.map((s, i) =>
            <div key={ i }>{ s }</div>
        ) }
    </div>
    return <ol>
        { THEAD }
        { sdata && sdata.map((row, idx) => (
            <div key={ idx } className='flex flex-row '>
                <div>{ hsize[idx] }</div>
                {
                    row.map((s, i) =>
                        <li key={ i } className='flex-grow'>{ s.toFixed(2) }</li>
                    )
                }
            </div>)) }
    </ol>
}
