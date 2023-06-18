import Image from "next/image"
import Link from "next/link"
import { Box } from "@mui/material";
export default function Footer() {
   const redes = [{
        nome: 'Instagram',
        link:'https://instagram.com/diogozura_'
   },
   {
    nome: 'LinkedIn',
    link:'https://www.linkedin.com/in/diogo-silva-santos-251bb5192/'
       },
       {
        nome: 'Github',
        link:'https://github.com/Diogozura'
       },
       {
        nome: 'Telegram',
        link:'https://t.me/Diogozura'
       },
    ]
    
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                mt:5
            }}>
                <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                    justifyContent: 'space-between',
                alignItems:'center'
            }}>
                    <Image src={"/zuralogo.png"} width={48} height={48} alt={"Logo Diogo zura"} />
                    <h4 style={{padding: '10px'}}>Diogo zura</h4>
               </Box>
                

           
                <h4 style={{padding: '10px'}}>&copy; Desenvolvido por Diogo zura -2021  2023</h4>
                <Box>
                {redes.map((items) => (
                      <>
                      <Link href={items.link} >
                     <Image src={`/${items.nome}.svg`} width={48} height={48} alt={items.nome} />
                        </Link>
                        </>
                ) ) }
                </Box>
               
           
            </Box>
           
            
        </>
    )
}