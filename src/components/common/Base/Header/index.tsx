import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';

export default function Header() {
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: 'rgba(255,255,255,0.75)',
                backdropFilter: 'saturate(180%) blur(6px)',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Image src="/zuralogo.png" width={44} height={44} alt="Logo Diogo zura" />
                        <Typography variant="h6" component="span" sx={{ ml: 1, color: '#111', fontWeight: 700 }}>
                            Diogo zura
                        </Typography>
                    </Link>
                </Box>

                {isMobile ? (
                    <IconButton edge="end" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Button component={Link} href="/" color="inherit">Home</Button>
                        <Button component={Link} href="/website-development" color="inherit">Website</Button>
                        <Button component={Link} href="/dia-ano" color="inherit">Dias do Ano</Button>
                        <Button component={Link} href="/sol" color="inherit">Sol e Lua</Button>
                        <Button
                            component="a"
                            href="https://www.linkedin.com/in/diogo-s-251bb5192/"
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<LinkedInIcon />}
                            sx={{ ml: 2 }}
                        >
                            Conectar
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}