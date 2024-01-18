
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { _proxy, fetchIsoliteData, fetchViteoData, getGoogleSS, url_isolite, url_viteo } from '../../HTTP/axios';
import { _trim } from '../../Helpers/HelpersFns';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { PriceTable } from '../UI/SpreadSheet/PriceTable';
import { Loading } from './Loading';
import { useFetch } from '../../Hooks/useQueryFetcher';
type BlankPageProps = {}
type SSResponse = AxiosResponse<{ result: string[][], version: string, sheetId: string }>

export const scriptAppLoader = async () => {


    const response = await getGoogleSS()
    console.log('response: ', response)

    return response

}


const resultParser = (row: string[]) => Array.isArray(row) ? row.map(i => +_trim(i)) : row


export const BlankDataPage: React.FC<BlankPageProps> = observer(() => {
    const { ViteoStore, ViewConfig } = useStoresContext();
    const { data, isLoading, error, isError } = useFetch<{ data: number[][] }>(_proxy + url_viteo)
    // const { data, isLoading, isError, error } = useQuery('viteo', fetchViteoData,)
    // const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
    // const response = useLoaderData() as SSResponse
    // const query_iso = useQuery('isolite', fetchIsoliteData)
    const clickFn = () => {

        console.log('ff', data)
    }
    const MemoTableData = useMemo(() => {
        if (!data) return null
        const { zgroup } = ViewConfig.active
        const _selected = ViteoStore.store[zgroup]
        return _selected
    }, [ViteoStore.store, ViewConfig.active, data])



    if (isLoading) return <Loading />
    if (isError) {
        console.log('error: ', error)
        return <Box><b className="text-3xl text-center">Error! </b></Box>
    }
    return (
        <Stack p={1}>

            <div className='flex flex-row gap-2 my-2'>

                <Button onClick={clickFn} variant='contained' color='info'>Update</Button>
                <GroupSelector />
            </div>
            <Box
                sx={{
                    [`& div>div`]: { border: '1px solid black', textAlign: 'center', minWidth: '80px', fontWeight: 'bold' },
                    [`& ol>div>li`]: { border: '1px solid black', textAlign: 'center', minWidth: '80px' },
                    maxWidth: '90vw'
                }}
            >
                {
                    MemoTableData &&
                    <PriceTable data={MemoTableData} groupId={ViewConfig.active.zgroup} />
                }

            </Box>
        </Stack>
    )
})
BlankDataPage.displayName = "***Data Page"
const GroupSelector = ({ getState }: { getState?: (state: string) => void }) => {
    const [group, setGroup] = useState("")
    const { ViewConfig } = useStoresContext()

    const handleChange = (e: SelectChangeEvent) => {
        setGroup(prev => e.target.value)
        // getState(e.target.value)
    }

    useEffect(() => {
        if (group === "") return
        ViewConfig.setActive('zgroup', group)

    }, [ViewConfig, group])
    return (<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Жалюзи</InputLabel>
        <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={group}
            onChange={handleChange}
            variant='filled'
        >
            <MenuItem value=""></MenuItem>
            <MenuItem value={'viteo_E'}>Viteo E</MenuItem>
            <MenuItem value={'viteo_1'}>Viteo 1</MenuItem>
            <MenuItem value={'viteo_2'}>Viteo 2</MenuItem>
            <MenuItem value={'viteo_3'}>Viteo 3</MenuItem>
            <MenuItem value={'viteo_4'}>Viteo 4</MenuItem>
            <MenuItem value={'viteo_5'}>Viteo 5</MenuItem>
            <MenuItem value={'viteo_6'}>Viteo 6</MenuItem>
        </Select>
    </FormControl>)
}



