import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import dynamic from 'next/dynamic';
import Base from '@/src/components/common/Base';
import ImgMediaCard from '@/src/components/Cards';
import Container from '@mui/material/Container';
import Image from "next/legacy/image";
import Link from "next/link";
import { theme } from "@/styles/theme";
const Animation = dynamic(
    () => import('../../components/common/Lottie'),
    { loading: () => <p>Loading ...</p>, ssr: true }
)

export default function Home() {
    const projetos = [{
        image: '/easy.png',
        alt: 'claro',
        projeto: 'Easy cálculos',
        link: 'https://www.easycalculos.com'
    }, {
        image: '/palavrinhas.png',
        alt: 'clinica palavrinhas - gerador de pseudopalavras',
        projeto: 'Gerador de pseudopalavras',
        link: 'https://www.clinicapalavrinhas.com.br'
    },
    {
        image: '/figma.png',
        alt: 'diogo zura figma',
        projeto: 'Figma',
        link: 'https://www.figma.com/@diogozura'
    }
    ]

    return (
        <>
            <Base>
                <Container>
                    <Box display={'grid'} height={{xs : null , md: '100vh'}} component={'section'} alignItems={'center'} alignContent={'space-evenly'} justifyContent={'space-around'} sx={{ my: 2  }}>
                        <Box>
                            <Animation icon={'rocket'} />
                            <h2>Diogo zura Front end Developer / UX UI  </h2>
                        </Box>

                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {projetos.map((e, index) => (
                                <>
                                    <Grid item xs={8} md={4} m={1} borderRadius={3} padding={2} textAlign={'center'} bgcolor={theme.colors.AzulEscuro} component={'article'} key={index}>
                                        {e.projeto === 'Figma' ? <Animation icon={'figma'} /> :  <Image src={e.image} alt={e.alt} width={450} height={236.25} />}
                                        <Typography component={'h2'} variant={'h5'}>{e.projeto}</Typography>
                                        <Link href={e.link}>Learn More</Link>
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                    </Box>

                </Container>
            </Base>

        </>
    )
}
