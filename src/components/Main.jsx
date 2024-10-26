import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NewLanding from '../pages/NewLanding';
import Update from '../pages/Update';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const drawerWidth = 240;

function PersistentDrawerLeft(props) {
  const { window } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [value, setValue] = React.useState("landing")
  const [isOpen, setIsOpen] = useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNav = (path) => {
    // navigate(path)
    setValue(path)
  }

  const handleLogout = () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        toast("You've been logged out", {
            icon: '⚠️',
        });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button onClick={() => handleNav('landing')}>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem button onClick={() => handleNav('update')}>
          <ListItemButton>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem button onClick={() => handleNav('Report')}>
          <ListItemButton>
            <ListItemText primary="Report" />
          </ListItemButton>
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemButton>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className='bg-apporange' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box  sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" noWrap component="div" >
              TODOS
            </Typography>
          </Box>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
              open={isOpen}
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={e => setSelectedDate(e)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ display: 'none' }}
            />
          </MuiPickersUtilsProvider>
              <EventAvailableIcon onClick={() => setIsOpen(true)}/>
          {/* <TextField type="date" format="DD/mm/yyyy" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} /> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {value === "landing" && <NewLanding date={moment(selectedDate).format('ddd, Do MMM YYYY')} />}
        {value === "update" && <Update />}
      </Box>
    </Box>
  );
}

PersistentDrawerLeft.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default PersistentDrawerLeft;
