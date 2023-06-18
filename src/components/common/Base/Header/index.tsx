import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function AppBarLabel() {
    return (
        <Toolbar>
            <Image src={"/zuralogo.png"} width={48} height={48} alt={"Logo Diogo zura"} />
            <h3 style={{padding: '10px'}}>
                Diogo zura
            </h3>
        </Toolbar>
    );
} 


export default function Header() {
    return (
        <>
            <Stack spacing={3} sx={{ flexGrow: 3,  }}>  
                    <AppBar  position="absolute" sx={{backgroundColor: '#00000050'}}>
                        <AppBarLabel/>
                    </AppBar>
            </Stack>

        </>
    )
}