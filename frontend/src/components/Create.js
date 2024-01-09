import {React, useEffect, useState} from 'react'
import { Box, Button, Typography} from "@mui/material"
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultilineTextFields from './forms/MyMultilineField'
import MySelectField from './forms/MySelectField'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const Create = () => {

    const[projectmanager, setProjectmanager] = useState()
    const[loading,setloading] = useState(true)

    const hardcoded_options = [
        {id:'', name:'None'},
        {id:'Open', name:'Open'},
        {id:'In progress', name:'In progress'},
        {id:'Completed', name:'Completed'},
    ]
  
    const GetData = () => {
      AxiosInstance.get(`projectmanager/`).then((res) =>{
        setProjectmanager(res.data)
        console.log(res.data)
        setloading(false)
      })
      
  
    }
  
    useEffect(() => {
      GetData();
    },[])


const navigate = useNavigate()
const defaultValues = {
    name:'',
    comment:'',
    status:'',
   

}

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    projectmanager: yup.string().required('Project Manager is required'),
    status: yup.string().required('Status is required'),
    comment:yup.string(),
    start_date:yup.date().required('Start date is required'),
    end_date: yup.date().required('End date is required').min(yup.ref('start_date'),'The end date can not before the start date'),
    
  })


const {handleSubmit, control} = useForm({defaultValues:defaultValues, resolver:yupResolver(schema)})

const submission = (data) => 
{
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")

    AxiosInstance.post(`project/`,{
        name:data.name,
        projectmanager:data.projectmanager,
        status:data.status,
        comment:data.comment,
        start_date:StartDate,
        end_date: EndDate,
    })

    .then((res) => {
        navigate(`/Tabledata `)

    })
}
  return (
    <div>

        { loading ? <p>loading data ...</p>:  
        <form onSubmit={handleSubmit(submission)}>
        <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px', padding:'10px'}}>
            <Typography sx={{marginLeft:'20px', color:'#ffffff'}}>
                Create records
            </Typography>

        </Box>

        <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column', backgroundColor:'rgba(210,210,220,0.90)'}}>

            <Box sx={{display:'flex', justifyContent:"space-around", marginBottom:'40px'}}>
                <MyTextField
                label="Name"
                name="name"
                control={control}
                placeholder = "Provide a project name "
                width={'30%'}
                />

                <MyDatePickerField 
                label="start_date"
                name="start_date"
                control={control}
                width={'30%'}
                />

                <MyDatePickerField 
                label="End_date"
                name="end_date"
                control={control}
                width={'30%'}
                />

            </Box>

            <Box sx={{display:'flex', justifyContent:"space-around"}}>
                <MyMultilineTextFields
                label="Comment"
                name="comment"
                control={control}
                placeholder = "Provide project comments "
                width={'30%'}
                />

                <MySelectField
                label="Status"
                name="status"
                control={control}
                width={'30%'}
                options = {hardcoded_options}
                />

                

                <MySelectField
                label="Project Manager"
                name="projectmanager"
                control={control}
                width={'30%'}
                options = {projectmanager}
                />

               

            </Box>

            <Box sx={{display:'flex', justifyContent:"space-around", marginTop:'40px'}}>
            <Button variant="contained" type="submit" sx={{width:'30%'}} >
                        Submit
                    </Button>

            </Box>


        </Box>


        </form>}
    </div>
  )
}

export default Create
