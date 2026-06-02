import { Box, Button, Grid, Typography, useMediaQuery, Container, Chip, Card, CardContent, CardActions } from "@mui/material";
import dynamic from 'next/dynamic';
import Base from '@/src/components/common/Base';
import Image from "next/legacy/image";
import Link from "next/link";
import { themes } from "@/styles/theme";
import SobreMim from "@/src/components/SobreMim";
import WebsiteDevelopment from "@/src/components/WebsiteDevelopment";
import React, { useRef, useEffect } from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');
    const aboutRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open && aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [open]);

    const handleToggle = () => {
        setOpen(prev => !prev);
    };

    return (
        <Base>
            <>
                {/* Hero Section */}
                <Box
                    component="section"
                    sx={{
                        background: `linear-gradient(135deg, ${themes.colors.Azul}20 0%, ${themes.colors.Vermelho}10 100%)`,
                        minHeight: { xs: '80vh', md: '90vh' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            width: '400px',
                            height: '400px',
                            background: `radial-gradient(circle, ${themes.colors.Azul}15 0%, transparent 70%)`,
                            borderRadius: '50%',
                            top: '-100px',
                            right: '-100px',
                            animation: 'float 6s ease-in-out infinite',
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '300px',
                            height: '300px',
                            background: `radial-gradient(circle, ${themes.colors.Vermelho}10 0%, transparent 70%)`,
                            borderRadius: '50%',
                            bottom: '-50px',
                            left: '-50px',
                            animation: 'float 8s ease-in-out infinite reverse',
                        },
                        '@keyframes float': {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(30px)' },
                        }
                    }}
                >
                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        <Grid container spacing={4} alignItems="center">
                            {/* Conteúdo Text */}
                            <Grid size={{xs: 12, md: 6}}>
                                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                                            fontWeight: 800,
                                            background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            marginBottom: 2,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Olá, eu sou o <br /> Diogo Zura
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: themes.colors.AzulEscuro,
                                            marginBottom: 3,
                                            fontWeight: 300,
                                            fontSize: { xs: '1rem', md: '1.3rem' }
                                        }}
                                    >
                                        Desenvolvedor Full Stack apaixonado por criar experiências incríveis
                                    </Typography>
                                    
                                    {/* Badges */}
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                        <Chip label="React" variant="filled" sx={{ bgcolor: themes.colors.Azul, color: '#fff' }} />
                                        <Chip label="Next.js" variant="filled" sx={{ bgcolor: themes.colors.AzulEscuro, color: '#fff' }} />
                                        <Chip label="TypeScript" variant="filled" sx={{ bgcolor: themes.colors.Vermelho, color: '#fff' }} />
                                    </Box>

                                    {/* Botões de Navegação */}
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={handleToggle}
                                            sx={{
                                                background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
                                                color: '#fff',
                                                fontWeight: 600,
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: 2,
                                                '&:hover': {
                                                    transform: 'translateY(-3px)',
                                                    boxShadow: `0 10px 30px ${themes.colors.Azul}40`,
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Saiba Mais Sobre Mim
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                color: themes.colors.AzulEscuro,
                                                borderColor: themes.colors.Azul,
                                                fontWeight: 600,
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: 2,
                                                border: `2px solid ${themes.colors.Azul}`,
                                                '&:hover': {
                                                    bgcolor: `${themes.colors.Azul}10`,
                                                    transform: 'translateY(-3px)',
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                            href="https://www.linkedin.com/in/diogo-s-251bb5192/"
                                            component="a"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <LinkedInIcon sx={{ mr: 1 }} /> Conectar
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>


                        </Grid>
                    </Container>
                </Box>

                {/* Website Development Section */}
                <WebsiteDevelopment />

                {/* About Section */}
                {open && (
                    <Box
                        ref={aboutRef}
                        id="sobre-mim-section"
                        component="section"
                        sx={{
                            py: { xs: 6, md: 10 },
                            px: { xs: 2, md: 4 },
                            background: `linear-gradient(180deg, transparent 0%, ${themes.colors.Azul}05 100%)`,
                            animation: 'slideIn 0.5s ease-out',
                            '@keyframes slideIn': {
                                from: { opacity: 0, transform: 'translateY(20px)' },
                                to: { opacity: 1, transform: 'translateY(0)' },
                            }
                        }}
                    >
                        <Container maxWidth="md">
                            <Box sx={{ textAlign: 'center', mb: 6 }}>
                                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: themes.colors.AzulEscuro }}>
                                    Sobre Mim
                                </Typography>
                                <Box sx={{ width: '80px', height: '4px', background: `linear-gradient(90deg, ${themes.colors.Azul}, ${themes.colors.Vermelho})`, margin: '0 auto' }} />
                            </Box>
                            <SobreMim />
                            
                            <Box sx={{ textAlign: 'center', mt: 6 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    component="a"
                                    href="https://www.linkedin.com/in/diogo-s-251bb5192/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
                                        color: '#fff',
                                        fontWeight: 600,
                                        px: 5,
                                        py: 2,
                                        borderRadius: 2,
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: `0 15px 40px ${themes.colors.Azul}40`,
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <LinkedInIcon sx={{ mr: 2 }} /> Vamos Conversar
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                )}
            </>
        </Base>
    );
}
