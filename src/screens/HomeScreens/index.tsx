import { Box, useMediaQuery } from "@mui/material";
import dynamic from 'next/dynamic';
import Base from '@/src/components/common/Base';
import ImgMediaCard from '@/src/components/Cards';

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
                        justifyContent: 'space-around',
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
