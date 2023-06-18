import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Box, Typography, useMediaQuery } from "@mui/material";
import dynamic from 'next/dynamic';
import Base from '@/src/components/common/Base';
import ImgMediaCard from '@/src/components/Cards';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import Link from 'next/link';
import { theme } from '@/styles/theme';
const inter = Inter({ subsets: ['latin'] })


const Animation = dynamic(
    () => import('../../components/common/Lottie'),
    { loading: () => <p>Loading ...</p>, ssr: true }
)

export default function Home() {

    const isLargeScreen = useMediaQuery('(min-width: 740px)');

    const containerStyle = {
        height: isLargeScreen ? '100vh' : 'auto',
    };
    return (
        <>
            <Base>
                <Box style={containerStyle}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        textAlign: 'center',

                    }}>
                        <Animation icon={'rocket'} />
                        <h2>Diogo zura Front end Developer / UX UI  </h2>

                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        mt: 2

                    }}>
                        <ImgMediaCard figma={true} />
                        <ImgMediaCard figma={false} />

                    </Box>
                </Box>
            </Base>

        </>
    )
}
