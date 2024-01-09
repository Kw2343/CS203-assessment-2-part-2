import {React, useEffect, useState} from 'react'
import { Box, Button, Typography} from "@mui/material"
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'

const GameEdit = () => {

const MyParam = useParams()
const MyId = MyParam.id

const[loading,setloading] = useState(true)



const GetData = () => {
    AxiosInstance.get(`http://127.0.0.1:8000/game`).then((res) =>{
        
        console.log(res.data)
        
      })
    AxiosInstance.get(`game/${MyId}`).then((res) =>{
      console.log(res.data)
      setValue('title', res.data.title)
      setValue('description', res.data.description)
      
      setloading(false)
    })
    

  }

  useEffect(() => {
    GetData();
  },[])


const navigate = useNavigate()
const defaultValues = {
    title:'',
    description:'',  

}
const {handleSubmit, setValue, control} = useForm({defaultValues:defaultValues})

const submission = (data) => 
{
    

    AxiosInstance.put(`game/${MyId}/`,{
        title:data.title,
        description:data.description,
       
    })

    .then((res) => {
        navigate(`/gamelist `)

    })
}
  return (
    <div>
         { loading ? <p>loading data ...</p>:  
        <form onSubmit={handleSubmit(submission)}>
        <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
            <Typography sx={{marginLeft:'20px', color:'#ffffff'}}>
                Edit Game list
            </Typography>

        </Box>

        <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column', backgroundColor:'#ffffff'}}>

            <Box sx={{display:'flex', justifyContent:"space-around", marginBottom:'40px'}}>
                <MyTextField
                label="Title"
                name="title"
                control={control}
                placeholder = "Provide a title name "
                width={'30%'}
                />

              <MyTextField
                label="Description"
                name="description"
                control={control}
                placeholder = "Provide Description "
                width={'30%'}
                />                             

          
            </Box>

    

            <Box sx={{display:'flex', justifyContent:"space-around", marginTop:'40px'}}>
                <Button variant="contained" type="submit" sx={{width:'100%'}} >
                        Submit
                    </Button>
            </Box>


        </Box>


        </form>
    }
    </div>
  )
}

export default GameEdit
