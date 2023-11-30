import React, { useState, useLayoutEffect } from 'react';
import { ISizeFull, ISizeShort } from '../../../Interfaces/CommonTypes';
import { useFuncs } from '../../../Hooks/useFuncs';
import { observer } from 'mobx-react-lite';
import { Avatar, Box, Card, CardContent, Divider, Stack, IconButton } from '@mui/material';
import { useOutputContext } from '../../../Hooks/useOutputCtx';
import { NetViewEn, CardViewMode, selectView } from './NetsOutput';
import { TextIconChip } from './TextIconChipProps';
import Icons from '../../Icons/SvgIcons';
import { useStoresContext } from '../../../Hooks/useStoresContext';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { LABELS_LIST } from '../../../Interfaces/Enums';
interface NetCardProps {
    size: ISizeFull;
    idxCounter?: number;
    bgColor?: string;
}
export type ViewNetsState = { [Key in 'skf' | 'simple']: boolean }


export const NetsCard: React.FC<NetCardProps> = observer((props) => {
    const { ThemeView } = useStoresContext()
    const { mode, show } = ThemeView.Options_Nets_out

    const [viewNet, setViewNet] = useState({ ...show, mode, desc: NetViewEn[mode] });

    const stateBgColor = (mode: CardViewMode) => {
        switch (mode) {
            case 'simple': { return `#2e5ff1`; }
            case 'skf': { return `#eb7114`; }
            case 'both': { return `#9c9a9a`; }
        }
    };
    const [color, setColor] = useState<string>('#fff');
    const net = useFuncs().nets(props.size);
    const { simple, skf } = net;
    const toggleView = () => setViewNet(prev => ({ ...prev, ...toggleNextView(viewNet.mode) }));

    useLayoutEffect(() => {
        setColor(prev => stateBgColor(viewNet.mode));
        setViewNet(prev => ({ ...prev, desc: NetViewEn[viewNet.mode] }));
    }, [viewNet.mode]);
    return (
        <Card border={1.5} borderColor={'cyan'} borderRadius={1}
            component={Box}
            color="neutral"
            sx={{
                p: 1, m: 1,
                background: color
            }}

            display={'flex'}
            flexDirection={'column'}

        >
            <Box

                //  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m: 2 }}
                component={Stack} useFlexGap flexDirection={'row'} justifyContent={'space-around'}
            >
                <Avatar sx={{ bgcolor: '#3f0e0e', width: 30, height: 30 }}>
                    {(props.idxCounter || props.idxCounter === 0) && props.idxCounter + 1}
                </Avatar>
                <Avatar sx={{ p: 0.5, bgcolor: '#3f0e0e', borderRadius: 2, px: 2, width: 'fit-content', height: 'fit-content' }}
                    variant='square'
                >
                    {viewNet.desc}
                </Avatar>
                <IconButton sx={{ border: '1px solid #000000', bgcolor: '#84e20a' }} size='small'
                    onClick={toggleView}>{Icons.RoundedArrows}</IconButton>
            </Box>
            {viewNet.mode !== 'both' && <Divider>{viewNet.desc}</Divider>}

            <CardBodyBlock nets={{ simple, skf }} viewNets={viewNet} />

            <Divider>входные размеры</Divider>

            <FooterCardSize size={props.size} />

        </Card>
    );

});



type InitSizeChipProps = {
    size: ISizeFull
}


export const FooterCardSize = ({ size }: InitSizeChipProps) => {
    const { width, height } = size
    const W = `${width} мм`
    const H = `${height} мм`
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, mt: 1, fontSize: 16, justifyContent: 'space-around' }}
        >
            <TextIconChip text={W} icon={Icons.WidthIcon} />
            <Divider orientation='vertical' flexItem sx={{ width: '2px', bgColor: 'red' }} variant='fullWidth' />
            <TextIconChip text={H} icon={Icons.HeightIcon} />

        </Box>)
}

type NetSizeBodyProps = {
    short_size: ISizeShort
    isShow: boolean

}
const SizeItemBlock = ({ short_size, isShow }: NetSizeBodyProps) => {
    const { w, h } = short_size
    const W = `${w} мм`
    const H = `${h} мм`
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1, px: 1 }}
        >
            {isShow && <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" justifyContent={'space-between'} >

                <TextIconChip text={W} icon={<Avatar >Ш</Avatar>} />
                <Divider orientation='vertical' flexItem sx={{ mx: 1, width: '2px', bgColor: 'red' }} variant='fullWidth' />
                <TextIconChip text={H} icon={<Avatar >В</Avatar>} />


            </Stack>
            }
        </Box>
    )
}



interface CardBodyProps {
    nets: { skf: ISizeShort, simple: ISizeShort }
    viewNets: ViewNetsState

}


export const CardBodyBlock: React.FC<CardBodyProps> = ({ nets, viewNets }) => {


    return (
        <Box component={CardContent} sx={{

            display: 'flex', justifyContent: 'space-evenly', flexDirection: { xs: 'row', md: 'column' },
        }}>
            <SizeItemBlock short_size={nets.simple} isShow={viewNets.simple} />
            <Divider orientation='vertical' flexItem sx={{ mx: .3, width: '2px', bgColor: 'red' }} variant='fullWidth' />
            <SizeItemBlock short_size={nets.skf} isShow={viewNets.skf} />
        </Box>
    )
}
NetsCard.displayName = 'NetCard';



export function toggleNextView(viewmode: CardViewMode) {
    const order = ['skf', 'simple', 'both'] as const
    const fi = order.findIndex(i => i === viewmode)
    const net_type = order[fi + 1] ? order[fi + 1] : order[0]
    return { ...selectView(net_type), mode: net_type }
}

