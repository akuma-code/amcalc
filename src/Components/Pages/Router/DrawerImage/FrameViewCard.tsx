import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader, Divider, Link, Paper } from '@mui/material';
import { _FrameStateWithNodes } from '../DrawerPage';
import { DrawCanvas } from '../DrawCanvas';
import { drawframe } from '../../../../Models/Drower/DrawerFns';
import { _DRAWPATH } from '../../../../Models/Drower/DrawPaths';
import { Link as LinkR, NavLink, redirect, useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../../../HTTP/PATHS';
import { IFrameVariants } from '../../../../Interfaces/Enums';
import { _log } from '../../../../Helpers/HelpersFns';

export default function FrameViewCard({ frame }: { frame: _FrameStateWithNodes }) {

    const { id, nodes, type, pos, size } = frame
    const currentFrameRoute = `${pageRoutes.frames}/${id}` as const
    const nav = useNavigate()

    const dataView = () => {

    }
    return (
        <Card sx={ {
            maxHeight: 'fit-content',
            border: '2px solid gray',
            p: 2,
            minWidth: '20%',
            maxWidth: 300

        } } component={ Paper }>
            <CardHeader
                title={ <NavLink to={ currentFrameRoute }

                    className={ ({ isActive, isPending }) => `bg-${isActive
                        ? 'red-500'
                        : isPending
                            ? 'green-500'
                            : 'yellow'}` }
                >
                    Saved frame (id:{ id })

                </NavLink> }
                titleTypographyProps={ {
                    sx: {
                        textTransform: 'capitalize',
                        fontSize: 19

                    }
                } }
            // sx={ { [`& :hover`]: { bgcolor: '#83eb83' } } }
            />


            <CardActionArea sx={ { display: 'flex', bgcolor: '#cccaca' } }
                onClick={ () => nav(currentFrameRoute) }
            >
                <Preview type={ type } />
            </CardActionArea>
            <Divider flexItem sx={ { my: 1, lineHeight: 5, border: '1px solid' } } variant='middle' />
            <CardContent sx={ { bgcolor: '#f0efef' } }>

                <div className='flex flex-row justify-between'>

                    frameType:<b>  { type }</b>
                </div>
                <div className='flex flex-row justify-between'>
                    Width: <b> { size.width } mm</b>
                </div>
                <div className='flex flex-row justify-between'>
                    Height:<b>  { size.height } mm</b>
                </div>
                <div className='flex flex-row justify-between'>
                    Coords:<b>  { pos.x }, { pos.y } </b>
                </div>

            </CardContent>
        </Card>
    );
}


const Preview = ({ type }: { type: IFrameVariants }) => (
    <svg viewBox='0 0 100 100' height={ 150 } >
        { drawframe(_DRAWPATH.f, { strokeWidth: 4 }) }
        { drawframe(_DRAWPATH[type]) }
    </svg>
)