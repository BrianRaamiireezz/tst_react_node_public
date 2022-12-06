import React, { useState } from 'react';

import { Link, Outlet } from 'react-router-dom';
import {
  Box,
  Divider,
  List, ListItemButton, ListItemIcon, ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PaidIcon from '@mui/icons-material/Paid';

const menuOptions = {
  1: {
    to: '/dashboard/puestos',
    primary: 'Puestos',
    icon: <WorkIcon/>
  },
  2: {
    to: '/dashboard/empleados',
    primary: 'Empleados',
    icon: <PersonIcon/>
  },
  3: {
    to: '/dashboard/reportes',
    primary: 'Reportes',
    icon: <AssessmentIcon/>
  },
  4: {
    to: '/dashboard/nomina',
    primary: 'Nomina',
    icon: <PaidIcon/>
  }
};

function ListLink({
  to,
  primary,
  icon,
  index,
  setSelectedIndex,
  selectedIndex
}: {
  to: string,
  primary: string,
  icon: JSX.Element,
  index: number,
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
  selectedIndex: number
}) {
  return (
    <>
      <ListItemButton
        component = { Link }
        to = { to }
        selected = { selectedIndex === index }
        onClick = { () => setSelectedIndex( index ) }
        sx = { {
          borderRadius: 1
        } }
      >
        <ListItemIcon>
          {
            icon
          }
        </ListItemIcon>
        <ListItemText primary = { primary }/>
      </ListItemButton>
    </>
  );
}

function Dashboard() {

  const [selectedIndex, setSelectedIndex] = useState( -1 );

  return (
    <>

      <Stack
        direction = { 'row' }
        spacing = { 2 }
        justifyContent = { 'flex-start' }
        alignItems = { 'stretch' }
      >

        {/* Left side menu */ }
        <Box
          sx = { {
            height: '100vh',
            overflowY: 'auto',
            paddingRight: 2,
          } }
        >

          <Paper
            elevation = { 1 }
            sx = { {
              py: 1,
              px: 2,
              height: '100%',
            } }
          >

            <Typography
              variant = { 'h6' }
              component = { 'h2' }
              align = { 'center' }
              gutterBottom
            >
              Dashboard
            </Typography>

            <Divider/>

            <List>

              {
                Object.values( menuOptions ).map(
                  (option, index) => (
                    <ListLink
                      to = { option.to }
                      primary = { option.primary }
                      icon = { option.icon }
                      index = { index }
                      selectedIndex = { selectedIndex }
                      setSelectedIndex = { setSelectedIndex }
                    />
                  )
                )
              }

            </List>

          </Paper>
        </Box>

        {/* Content */ }
        <Box
          px = { 2 }
          py = { 1 }
          flexGrow = { 1 }
          sx = { {
            height: '100vh',
            overflowY: 'auto'
          } }
        >
          <Outlet/>
        </Box>

      </Stack>
    </>
  );
}

/* TODO: -Move menuOptions and icons to constants file
*        -Move ListLink to a components folder
* */

export default Dashboard;