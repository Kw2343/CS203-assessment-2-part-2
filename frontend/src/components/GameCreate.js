import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyMultilineTextFields from './forms/MyMultilineField';
import AxiosInstance from './Axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const GameCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm();

  const submission = (data) => {
    // Update the logic based on your API and data structure
    AxiosInstance.post('game/', {
      title: data.title,
      description: data.description,
      // Add more fields as needed
    })
      .then((res) => {
        navigate('/gameList');
      })
      .catch((error) => {
        console.error('Error creating game:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#ffffff', height:'40px',marginTop:'15px'}}>Create Game</Typography>
        </Box>

        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', backgroundColor: '#ffffff' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <MyTextField label="Title" name="title" control={control} placeholder="Enter game title" width={'30%'} />
            
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <MyMultilineTextFields
              label="Description"
              name="description"
              control={control}
              placeholder="Enter game description"
              width={'30%'}
            />
          
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
            <Button variant="contained" type="submit" sx={{ width: '100%' }}>
              Create Game
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default GameCreate;
