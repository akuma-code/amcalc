import { Box } from '@mui/material';
import { CommonRoutes } from '../../../AppRouter';
import { Link as RouterLink, LinkProps as RLinkPorps } from 'react-router-dom';
import { Link } from '@mui/icons-material';
import { pageRoutes } from '../../../HTTP/PATHS';





export const AppPaths = () => {


    return <Box sx={ {
        [`& ul>li`]: {
            fontFamily: 'Fira Code',
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '25em'
        },
        [`& a:hover`]: {
            color: 'red',

        },
        [`& a:visited`]: { color: 'green' }
        // maxWidth: '22em'
    } }>

        <div className='text-center w-[25em]'> <b>App Paths</b></div>
        <div className='px-2 font-serif'>
            <ul>
                <li>
                    <div className='flex-grow'>
                        <b>/</b>
                    </div>

                    <div className='flex-grow-0'>
                        <RouterLink to={ '/' } >Root</RouterLink>
                    </div>
                </li>
                <li>
                    <div className='flex-grow'>
                        <b>/bento</b>
                    </div>
                    <div className='flex-grow-0'><RouterLink to={ 'bento' } >Bento</RouterLink>  </div>
                </li>
                <li>
                    <div className='flex-grow-0'>
                        <b>/sill</b>
                    </div>
                    <div className='flex-grow-0'><RouterLink to={ 'sill' } >Sill Form</RouterLink>  </div>
                </li>
                <li>
                    <div className='flex-grow'>
                        <b>/sill/groups/print</b>
                    </div>

                    <div className='flex-grow-0'><RouterLink to={ pageRoutes.print }>  Print Page</RouterLink> </div>

                </li>

                <li>
                    <div>
                        <b>/getapp</b>
                    </div>
                    <div className="flex-grow-0">
                        <RouterLink to={ '/getapp' } >AppScript</RouterLink>
                    </div>
                </li>
            </ul>
        </div>
    </Box>;
};
