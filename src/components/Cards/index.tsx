import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { theme } from '@/styles/theme';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Animation = dynamic(
    () => import('../../components/common/Lottie'),
    { loading: () => <p>Loading ...</p>, ssr: true }
)
export default function ImgMediaCard({figma}:any) {
  return (
      <Card sx={{width: 345, mt: 3, backgroundColor: theme.colors.AzulEscuro }} variant="outlined">
          {figma ?   <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image="/DoodlesDoggie.svg"
      /> :  <Animation icon={'figma'} />}
      <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                  {figma? ' website idea to help people with finances': 'my projects in figma'}
     
        </Typography>
      </CardContent>
          <CardActions>
              {figma?  <Link href={'https://www.easycalculos.com.br'} >
              <Button size="small"> Learn More</Button>
              </Link> :  <Link href={'https://www.figma.com/@diogozura'} >
              <Button size="small"> Learn More</Button>
              </Link>}
        
      </CardActions>
    </Card>
  );
}