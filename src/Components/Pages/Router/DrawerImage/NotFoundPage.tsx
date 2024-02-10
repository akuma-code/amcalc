import { FiAlertTriangle } from "react-icons/fi";
import { Avatar, Box, Paper } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import { pageRoutes } from '../../../../HTTP/PATHS';

export const NotFoundPage: React.FC<{ id?: string, message: string }> = (props) => {
    return <Box
        component={ Paper }
        sx={ { bgcolor: '#c73f09', p: 4, mx: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, mt: 2 } }
    >
        <Avatar>
            <FiAlertTriangle size={ 38 } color="red" />
        </Avatar>
        <NavLink to={ pageRoutes.drawer }>

            { props.id !== undefined
                ? <strong>  Node with id: { props.id } not found! </strong>
                : <strong>  { props.message || "Something gone wrong!" } </strong> }
            <ReplyIcon sx={ { fontSize: 42, bgcolor: 'red', borderRadius: '45%', color: '#fff', mx: 2 } } />
        </NavLink>
    </Box>;
};
