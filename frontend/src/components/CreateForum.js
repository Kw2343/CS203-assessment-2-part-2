import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyTextField from './forms/MyTextField';
import MyMultilineTextFields from './forms/MyMultilineField';

const CreateForum = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultValues = {
    threadTitle: '',
    threadContent: '',
  };

  const schema = yup.object({
    threadTitle: yup.string().required('Title is required'),
    threadContent: yup.string().required('Content is required'),
  });

  const { handleSubmit, control, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const getThreads = async () => {
    try {
      const response = await AxiosInstance.get('http://127.0.0.1:8000/thread/'); 
      setThreads(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forum threads:', error);
    }
  };

  useEffect(() => {
    getThreads();
  }, []);

  const submitThread = async (data) => {
    try {
      await AxiosInstance.post('http://127.0.0.1:8000/thread/', {
        title: data.threadTitle,
        content: data.threadContent,
      }); 

      navigate('/forum');
     
      reset();
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <form onSubmit={handleSubmit(submitThread)}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              backgroundColor: '#00003f',
              marginBottom: '10px',
              padding: '10px',
            }}
          >
            <Typography sx={{ marginLeft: '20px', color: '#ffffff' }}>Create a New Thread</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              boxShadow: 3,
              padding: 4,
              flexDirection: 'column',
              backgroundColor: 'rgba(210,210,220,0.90)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
              <MyTextField
                label="Thread Title"
                name="threadTitle"
                control={control}
                placeholder="Enter thread title"
                width={'60%'}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <MyMultilineTextFields
                label="Thread Content"
                name="threadContent"
                control={control}
                placeholder="Enter thread content"
                width={'60%'}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
              <Button variant="contained" type="submit" sx={{ width: '60%' }}>
                Create Thread
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default CreateForum;
