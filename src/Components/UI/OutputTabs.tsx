import React, { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { ArgsTypes } from '../../Models/ArgsTypeModel';
import { Text } from './Text';
import { observer } from 'mobx-react-lite';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
    clickHandler?: (out: ArgsTypes) => void
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, clickHandler, ...other } = props;


    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            className='pt-8 relative text-black'

            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, }} position={'sticky'} >
                    <Text >{children}</Text>
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {

    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,

    };
}
type TabProps = {
    size_tab?: React.ReactNode
    offset_tab?: React.ReactNode
    size2_tab?: React.ReactNode
}
export const OutputTabs: FC<TabProps> = observer((props) => {
    const { ViewConfig } = useStoresContext()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        const types = [InputsTypeEnum.size_full, InputsTypeEnum.offset5, InputsTypeEnum.size_full]
        setValue(newValue);
        handleChangeIndex(newValue)
        ViewConfig.selectOut(types[newValue])
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position='absolute' sx={{ bgcolor: '#0aa8d8', }} >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor='inherit'
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Size" {...a11yProps(0)} sx={{ fontWeight: 'bold', color: '#a80606' }} />
                    <Tab label="Offset" {...a11yProps(1)} sx={{ fontWeight: 'bold', color: '#a80606' }} />
                    <Tab label="Size2" {...a11yProps(2)} sx={{ fontWeight: 'bold', color: '#a80606' }} />

                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} >
                {props.size_tab ? props.size_tab : <div>"No ELEM!"</div>}
            </TabPanel>
            <TabPanel value={value} index={1} >
                {props.offset_tab ? props.offset_tab : <div>"No ELEM!"</div>}
            </TabPanel>
            <TabPanel value={value} index={2} >
                {props.size2_tab && props.size2_tab}
            </TabPanel>

        </Box>
    );
})

OutputTabs.displayName = "***OutputTabs***"