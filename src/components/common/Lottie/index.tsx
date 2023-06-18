import { Player } from '@lottiefiles/react-lottie-player';
export default function Lottie({ icon }: any) {
    
    return (
        <>
            <Player
  autoplay
  loop
  src={`${icon}.json`}
  style={{ height: '170px', width: '140px' }}
></Player>
        </>
    )
}