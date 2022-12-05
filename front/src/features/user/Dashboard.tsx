import { Link, Outlet } from 'react-router-dom';
import {
  Box,
  Divider,
  List, ListItemButton, ListItemIcon, ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';

function ListLink({
                    to,
                    primary,
                    icon
                  }: { to: string, primary: string, icon: JSX.Element }) {
  return (
    <>
      <li>
        <ListItemButton
          component = { Link }
          to = { to }
        >
          <ListItemIcon>
            {
              icon
            }
          </ListItemIcon>
          <ListItemText primary = { primary }/>
        </ListItemButton>
      </li>
    </>
  );
}

function Dashboard() {
  return (
    <>

      <Stack
        direction = { 'row' }
        spacing = { 2 }
        justifyContent = { 'flex-start' }
      >

        {/* Left side menu */ }
        <Box
          px = { 2 }
          py = { 1 }
          sx = { {
            borderRightColor: 'primary.dark',
            borderRightWidth: '1px',
            borderRightStyle: 'solid'
          } }
        >

          <Typography
            variant = { 'h6' }
            component = { 'h2' }
            align = { 'center' }
          >
            Dashboard
          </Typography>

          <Divider/>

          <Paper elevation = { 0 }>
            <List>

              <ListLink
                to = { '/dashboard/puestos' }
                primary = { 'Puestos' }
                icon = { <PersonIcon/> }
              />

              <ListLink
                to = { '/dashboard/empleados' }
                primary = { 'Empleados' }
                icon = { <PersonIcon/> }
              />

              <ListLink
                to = { '/dashboard/nomina' }
                primary = { 'Nomina' }
                icon = { <PersonIcon/> }
              />

              <ListLink
                to = { '/dashboard/reportes' }
                primary = { 'Reportes' }
                icon = { <PersonIcon/> }
              />

            </List>
          </Paper>
        </Box>

        {/* Content */ }
        <Box
          px = { 2 }
          py = { 1 }
        >
          <Outlet/>
        </Box>

      </Stack>
    </>
  );
}

export default Dashboard;