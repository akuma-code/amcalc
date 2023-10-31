import { Grid } from '@mui/material'
import React from 'react'

type PageProps = {}

const BentoLayoutPage = (props: PageProps) => {


    return (
        <Grid container spacing={1} width={'100vw'} sx={{ bgcolor: '#03575a' }}>
            <Grid container item spacing={2}>
                <Grid item key={'info'} sx={{ bgcolor: '#3cdbe0' }}>INFO</Grid>
                <Grid item key={'selector'} sx={{ bgcolor: '#86a4a5' }}>SELECTOR</Grid>
            </Grid>
            <Grid container item spacing={2}>
                <Grid item key={'form'} sx={{ bgcolor: '#58aa29' }}>FORM</Grid>
                <Grid item key={'output'} sx={{ bgcolor: '#a9f135' }}>OUTPUT</Grid>
            </Grid>

        </Grid>
    )
}

export default BentoLayoutPage