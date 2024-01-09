import React from 'react';
import { Box, Typography, Tab, Tabs } from '@mui/material';
import Create from './Create';
import TableData from './TableData';
import GameList from './GameList';
import GameCreate from './GameCreate';

// Placeholder function for a11yProps
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

// Placeholder component for CustomTabPanel
const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor:'#ffffff' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="admin tabs">
        <Tab label="Create" {...a11yProps(0)} />
        <Tab label="View Project" {...a11yProps(0)} />
        <Tab label="Create Game" {...a11yProps(0)} />
        <Tab label="Game list" {...a11yProps(0)} />
      
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      <Create />
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      <TableData />
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
      <GameCreate />
    </CustomTabPanel>
   
    <CustomTabPanel value={value} index={3}>
      <GameList />
    </CustomTabPanel>
   
  </Box>
);
}