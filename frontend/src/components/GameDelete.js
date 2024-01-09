import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AxiosInstance from './Axios';
import { useNavigate, useParams } from 'react-router-dom';

const GameDelete = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState();
  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get(`game/${id}`).then((res) => {
      setGameData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const submission = () => {
    AxiosInstance.delete(`game/${id}/`).then((res) => {
      navigate(`/gameList`);
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
            <Typography sx={{ marginLeft: '20px', color: '#ffffff' }}>Delete Game: {gameData.title}</Typography>
          </Box>

          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', backgroundColor: '#ffffff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '40px' }}>
              Are you sure you want to delete the game: {gameData.title}?
            </Box>
            <Box sx={{ width: '30%' }}>
              <Button variant="contained" onClick={submission} sx={{ width: '100%' }}>
                Delete the Game
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default GameDelete;
