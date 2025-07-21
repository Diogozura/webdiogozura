// components/Base.tsx
import * as React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
    onScroll?: () => void;
}

function ScrollTop(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({ block: 'center' });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default function Base(props: Props) {
    const { children, window, onScroll } = props;

    return (
        <>
            <CssBaseline />
            <Toolbar id="back-to-top-anchor" />
            <Header />
            {children}
            <ScrollTop window={window} onScroll={onScroll}>
                <Fab size="medium" color="info" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            <Footer />
        </>
    );
}
