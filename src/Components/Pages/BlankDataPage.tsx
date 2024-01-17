
import { Link, Params, useLoaderData } from 'react-router-dom';
import { _log, _trim } from '../../Helpers/HelpersFns';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { SheetResponse, URL_script, getGoogleSS, postGoogleSS } from '../../HTTP/axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import { sheetDataParser } from '../../HTTP/SheetDataParser';
import { QueryClient, QueryClientProvider, useIsFetching, useQuery } from 'react-query'
import { useStoresContext } from '../../Hooks/useStoresContext';
import { Loading } from './Loading';
import { observer } from 'mobx-react-lite';
import { PriceTable, _numberArray } from '../UI/SpreadSheet/PriceTable';
type BlankPageProps = {}
type SSResponse = AxiosResponse<{ result: string[][], version: string, sheetId: string }>

export const scriptAppLoader = async () => {


    const response = await getGoogleSS()
    console.log('response: ', response)

    return response

}


const resultParser = (row: string[]) => Array.isArray(row) ? row.map(i => +_trim(i)) : row


export const BlankDataPage: React.FC<BlankPageProps> = observer(() => {
    const { ViewConfig } = useStoresContext();
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
    const [view, setView] = useState<string[][] | null | undefined>(null)
    // const response = useLoaderData() as SSResponse
    const { data, isLoading, isError, error } = useQuery('ssheet', postGoogleSS,
        {
            refetchOnWindowFocus: false, keepPreviousData: true,
        })
    const getSelectedState = (state: string) => setSelectedGroup(state)

    // const MemozData = useMemo(() => {
    //     // const { data } = response
    //     if (!data) return null
    //     const { result } = data


    //     const sheet = result.map(resultParser)
    //     return sheet
    // }, [data])

    const clickFn = async () => {
        console.log('querydata', data)

        // try {
        //     const Aresponse = await postGoogleSS()
        //     const { result, sheetId, version } = Aresponse
        //     console.log('postresult', Aresponse)
        // } catch (error) {
        //     _log(error)
        // }

    }
    useEffect(() => {
        if (!data) return
        const selected = data.find(d => d.groupId === selectedGroup)
        setView(selected?.data)
    }, [data, selectedGroup])
    if (isLoading) return <Loading />
    if (isError) {
        console.log('error: ', error)
        return <Box><b className="text-3xl text-center">Error! </b></Box>
    }
    return (
        <Stack p={ 1 }>

            { data &&
                <div> sheetName: { selectedGroup }</div>
            }
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
                <GroupSelector getState={ getSelectedState } />
            </div>
            <Box
                sx={ {
                    [`& div>div`]: { border: '1px solid black', textAlign: 'center', minWidth: '80px', fontWeight: 'bold' },
                    [`& ol>div>li`]: { border: '1px solid black', textAlign: 'center', minWidth: '80px' },
                    maxWidth: '70vw'
                } }
            >
                { view &&
                    <PriceTable ssData={ view } />
                }
                {
                    //  MemozData &&
                    // <SSTable sdata={ MemozData } />
                }

            </Box>
        </Stack>
    )
})
BlankDataPage.displayName = "***Data Page"
const GroupSelector = ({ getState }: { getState: (state: string) => void }) => {
    const [group, setGroup] = useState("")
    const handleChange = (e: SelectChangeEvent) => {
        setGroup(prev => e.target.value)
        getState(e.target.value)
    }

    return (<FormControl variant="filled" sx={ { m: 1, minWidth: 120 } }>
        <InputLabel id="demo-simple-select-filled-label">Viteogroup</InputLabel>
        <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={ group }
            onChange={ handleChange }
            variant='filled'
        >
            <MenuItem value="">
                {/* <em>None</em> */ }
            </MenuItem>
            <MenuItem value={ 'viteo_Е' }>Viteo E</MenuItem>
            <MenuItem value={ 'viteo_1' }>Viteo 1</MenuItem>
            <MenuItem value={ 'viteo_2' }>Viteo 2</MenuItem>
            <MenuItem value={ 'viteo_3' }>Viteo 3</MenuItem>
            <MenuItem value={ 'viteo_4' }>Viteo 4</MenuItem>
            <MenuItem value={ 'viteo_5' }>Viteo 5</MenuItem>
            <MenuItem value={ 'viteo_6' }>Viteo 6</MenuItem>
        </Select>
    </FormControl>)
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


