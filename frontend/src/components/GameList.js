import {React, useEffect, useMemo, useState} from 'react'
import AxiosInstance from './Axios'
import {MaterialReactTable} from 'material-react-table';
import { Box, IconButton} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {Link} from 'react-router-dom';


const TableData = () => {

  const[myGameData, setMyGamedata] = useState()
  const[loading,setloading] = useState(true)

  const GetData = () => {
    AxiosInstance.get(`http://127.0.0.1:8000/game/`).then((res) =>{
      setMyGamedata(res.data)
      console.log(res.data)
      setloading(false)
    })
    

  }

  useEffect(() => {
    GetData();
  },[])

  
  
    const columns = useMemo(
  
      () => [
  
        {
          accessorKey: 'title', 
          header: 'Title',
          size: 100,
        },
  
        {
  
          accessorKey: 'description',
          header: 'Description',
          size: 150,
  
        },
 
  
      ],
  
      [],
  
    );
  

  return (
    <div>
      { loading ? <p>loading data ...</p>:
    <MaterialReactTable 
    columns={columns}
    data={myGameData} 
    enableRowActions
      renderRowActions={({row}) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
         
          <IconButton color="secondary" component={Link} to={`gameedit/${row.original.id}`}>
            <EditIcon />
          </IconButton>

          <IconButton color="error" component={Link} to={`gamedelete/${row.original.id}`}>
            <DeleteIcon />
          </IconButton>
        </Box>

      )}
    
    />
      }
    </div>
  )
}

export default TableData
