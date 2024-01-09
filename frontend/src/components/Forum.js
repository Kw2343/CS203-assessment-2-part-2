import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from './Axios';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

const Forum = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getThreads = () => {
    AxiosInstance.get('http://127.0.0.1:8000/thread/').then((res) => {
      setThreads(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getThreads();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
        hide: true,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 200,
      },
      {
        accessorKey: 'content',
        header: 'Content',
        size: 400,
      },
    ],
    []
  );

  const handleCommentClick = (row) => {
    const threadId = row.original.id;
    navigate(`/forum/${threadId}`);
  };

  return (
    <div>
      <Box sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor:'#ffffff' }}>
        <h2>Forum Threads</h2>
        <Button component={Link} to="/createforum" variant="contained" color="primary">
          Create New Thread
        </Button>
      </Box>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <MaterialReactTable
            columns={columns}
            data={threads}
            enableRowActions
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton color="primary" onClick={() => handleCommentClick(row)}>
                  <CommentIcon />
                </IconButton>
              </Box>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Forum;
