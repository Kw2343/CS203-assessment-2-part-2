import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';  
import MonopolyImage from '../assets/monopoly.jpg';
import MathBingoImage from '../assets/MathBingo.jpg'; 
import MysteryScienceImage from '../assets/Mystery Science.jpg';
import UnoImage from '../assets/uno.jpg';
import ScrabbleImage from '../assets/scrabble.jpg';
import ProdigyImage from '../assets/prodigy.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative', // Added to position the play button
  img: {
    maxWidth: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  playButton: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4caf50', 
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    
    
  },
}));

const ResponsiveGrid = () => {
  const [games, setGames] = React.useState([]);

  React.useEffect(() => {
    // Fetch game data from your Django backend
    axios.get('http://127.0.0.1:8000/game/')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('Error fetching game data:', error);
      });
  }, []);  // Empty dependency array to run the effect only once

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {games.map((game) => (
          <Grid key={game.id} xs={2} sm={4} md={4}>
            <Item>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              
              {
                (game.photo || game.title === 'Monopoly') && (
                  <img 
                    src={
                      game.title === 'Monopoly' ? MonopolyImage :
                      game.title === 'Math Bingo' ? MathBingoImage :
                      game.title === 'Mystery science' ? MysteryScienceImage :
                      game.title === 'Uno' ? UnoImage :
                      game.title === 'Scrabble' ? ScrabbleImage :
                      game.title === 'Prodigy' ? ProdigyImage : ''
                    } 
                    alt={game.title} 
                  />
                )
              }

              
              <div className={Item.playButton} onClick={() => console.log(`Play ${game.title}`)}>
                Play
              </div>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResponsiveGrid;
