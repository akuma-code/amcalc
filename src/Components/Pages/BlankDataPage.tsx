
import React, { useMemo, Suspense } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react-lite';
import { IsoResponse, ViteoResponse, _proxy, getGoogleSS, url_isolite, url_viteo } from '../../HTTP/axios';
import { _trim } from '../../Helpers/HelpersFns';
import { useFetch } from '../../Hooks/useQueryFetcher';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { ZhPriceTable } from '../UI/SpreadSheet/PriceTable';
import { Loading } from './Loading';
import { ZGroupSelector, _isoOptions, _viteoOptions } from './ZGroupSelector';
import { Fallback } from './Fallback';
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
    const { data: Vdata, isLoading, error, isError } = useFetch<ViteoResponse[]>(_proxy + url_viteo)
    const { data: Idata } = useFetch<IsoResponse[]>(_proxy + url_isolite)

    const clickFn = () => {


    }


    const MemoViteoData = useMemo(() => {
        if (!Vdata) return null
        const { zgroup } = ViewConfig.active
        const _selected = Vdata.find(d => d.groupId === zgroup)
        if (!_selected) return null
        return _selected
    }, [Vdata, ViewConfig.active])

    const MemoIsoData = useMemo(() => {
        if (!Idata) return null
        const { zgroup } = ViewConfig.active
        const _iso = Idata.find(d => d.groupId === zgroup)
        if (!_iso) return null
        return _iso

    }, [Idata, ViewConfig.active])


    if (isLoading) return <Fallback />
    if (isError) {
        console.log('error: ', error)
        return <Box><b className="text-3xl text-center">Error! </b></Box>
    }
    return (
        <Stack p={ 1 }>

            <div className='flex flex-row gap-2 my-2'>

                <Button onClick={ clickFn } variant='contained' color='info'>Update</Button>

                <ZGroupSelector options={ [..._viteoOptions, ..._isoOptions,] } title='Изолайт+Витео' />
            </div>
            <Suspense fallback={ <Fallback /> }>

                <Box
                    sx={ {

                        maxWidth: 'full'
                    } }
                >
                    {
                        MemoViteoData &&

                        <ZhPriceTable zGroup={ MemoViteoData } ztype='viteo' />
                    }
                    {
                        MemoIsoData &&
                        <ZhPriceTable zGroup={ MemoIsoData } ztype='isolite' />
                    }
                </Box>
            </Suspense>
        </Stack>
    )
})
BlankDataPage.displayName = "***Data Page"



