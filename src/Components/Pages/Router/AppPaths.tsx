import { Box } from '@mui/material';

export const AppPaths = () => {



    return <Box sx={{
        [`& ul>li`]: {
            fontFamily: 'Fira Code',
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '25em'
        },
        // maxWidth: '22em'
    }}>

        <div className='text-center w-[25em]'> <b>App Paths</b></div>
        <div className='px-2 font-serif'>
            <ul>
                <li>
                    <div className='flex-grow'>
                        <b>/</b>
                    </div>

                    <div className='flex-grow-0'>
                        Root
                    </div>
                </li>
                <li>
                    <div className='flex-grow'>
                        <b>/bento</b>
                    </div>
                    <div className='flex-grow-0'> Bento</div>
                </li>
                <li>
                    <div className='flex-grow-0'>
                        <b>/sill</b>
                    </div>
                    <div className='flex-grow-0'> Sill Form</div>
                </li>
                <li>
                    <div className='flex-grow'>
                        <b>/sill/groups/:group_id</b>
                    </div>

                    <div className='flex-grow-0'> Sill groups</div>

                </li>
                <li>
                    <div className='flex-grow'>
                        <b>/tabs</b>
                    </div>
                    <div className="flex-grow-0"> Tabs</div>
                </li>
                <li>
                    <div>
                        <b>/offset</b>
                    </div>
                    <div className="flex-grow-0"> Offset</div>
                </li>
            </ul>
        </div>
    </Box>;
};
