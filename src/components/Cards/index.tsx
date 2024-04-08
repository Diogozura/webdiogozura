import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { themes } from '@/styles/theme';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Animation = dynamic(
  () => import('../../components/common/Lottie'),
  { loading: () => <p>Loading ...</p>, ssr: true }
)
export default function ImgMediaCard({ figma }: any) {
  return (
    <Card sx={{ width: 345, mt: 3, backgroundColor: themes.colors.AzulEscuro, textAlign: 'center' }} variant="outlined">
      {figma ? <CardMedia
        sx={{padding: 3}}
        component="img"
        alt="Easy cálculos"
        height="240"
        image="/claro.png"
      /> : <Animation icon={'figma'} />}
      <CardContent>
        <Typography gutterBottom variant="h4" component="h3">
          {figma ? 'Easy calculos' : 'my projects in figma'}

        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-evenly' }}>
        {figma ? <Link href={'https://www.easycalculos.com.br'} >
          <Button variant="contained"
            color="primary" size="small"> Learn More</Button>
        </Link> : <Link href={'https://www.figma.com/@diogozura'} >
          <Button variant="contained"
            color="primary" size="small"> Learn More</Button>
        </Link>}

      </CardActions>
    </Card>
  );
}