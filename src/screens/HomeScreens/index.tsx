import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import dynamic from 'next/dynamic';
import Base from '@/src/components/common/Base';
import ImgMediaCard from '@/src/components/Cards';
import Container from '@mui/material/Container';
import Image from "next/legacy/image";
import Link from "next/link";
import { themes } from "@/styles/theme";
import SobreMim from "@/src/components/SobreMim";
import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Animation = dynamic(
    () => import('../../components/common/Lottie'),
    { loading: () => <p>Loading ...</p>, ssr: true }
)

export default function Home() {
    const projetos = [{
        image: '/projetos/easy-calculos.png',
        alt: 'claro',
        cor: '#FBF5F3',
        projeto: 'Easy cálculos',
        descricao: 'Cálculos para tudo que você precisa ',
        link: 'https://www.easycalculos.com'
    },
    {
        image: '/projetos/easy-bank.png',
        alt: 'diogo zura figma',
        cor: '#FF7477',
        projeto: 'Easy bank',
        descricao: 'Simplificando o banco imobiliário ',
        link: 'https://www.easyimobiliario.com.br'
    },
    {
        image: '/projetos/FIGMA.png',
        alt: 'clinica palavrinhas - gerador de pseudopalavras',
        cor: '#1AC8ED',
        projeto: 'Figma',
        descricao: 'Projetos desenhados',
        link: 'https://www.figma.com/@diogozura'
    },
    ]
    const handleClick = (event: { target: HTMLDivElement; }) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <>
            <Base>
                <Container>
                    <Box display={'grid'} height={{ xs: null, md: '60vh' }} component={'section'} alignItems={'center'} alignContent={'space-evenly'} justifyContent={'space-around'} sx={{ my: 2 }}>


                        <Grid container rowSpacing={2}
                            margin={'auto'}
                            display={'flex'}
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            justifyContent={'space-around'}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Typography component={'h1'} variant="h3">Olá eu sou o Diogo zura !</Typography>
                            {/* {projetos.map((e, index) => (
                                <>
                                    <Grid item xs={8} md={4} m={1} borderRadius={3} width={'305px'} height={'300px'} padding={2} textAlign={'center'}  bgcolor={e.cor} component={'article'} key={index}>
                                        <Link href={e.link} style={{textDecoration: 'none'}}>
                                            <Image src={e.image} alt={e.alt} width={200} height={150} />
                                            <Typography component={'h2'} variant={'h4'} color={'#000000'}>{e.projeto}</Typography>
                                            <Typography component={'p'} variant={'body1'} color={'#1D1A05'}>{e.descricao}</Typography>
                                        </Link>
                                    </Grid>
                                </>
                            ))} */}
                        </Grid>

                    </Box>
                    <Box textAlign={'center'} >
                        <Button sx={{
                            bgcolor: '#51D666', color: themes.colors.Preto, '&:hover': {
                                backgroundColor: '#78ee8a', // Substitua pelo tom desejado
                            },
                            '&:focus': {
                                backgroundColor: '#45b356', // Substitua pelo tom desejado
                            },
                        }} size="large" onClick={handleToggle}>
                            {open ? '- saiba menos' : `+ saiba mais `}
                        </Button>

                    </Box>
                    <Box  textAlign={'center'} component={'section'} display={open ? "block" : "none"}>
                        <SobreMim />
                        <Button
                            sx={{
                                margin: 'auto', bgcolor: themes.colors.Azul, color: themes.colors.Preto, '&:hover': {
                                    backgroundColor: themes.colors.Azul, // Substitua pelo tom desejado
                                },
                                '&:focus': {
                                    backgroundColor: themes.colors.Azul, // Substitua pelo tom desejado
                                },
                            }} size="large"
                        >
                            <Link href={'https://www.linkedin.com/in/diogo-silva-santos-251bb5192/'} style={{color:'#000', display:'flex', alignItems:'center'}}><LinkedInIcon fontSize="large" color="primary"/> Entrar em contato</Link>
                        </Button>

                    </Box>
                </Container>
            </Base>

        </>
    )
}
