import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAdd from '@material-ui/icons/PersonAdd';
import MailIcon from '@material-ui/icons/Mail';
import SettingsApplications from '@material-ui/icons/SettingsApplications'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import { isLoggedIn, getToken } from './AuthHelper';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    Drawer: {
        width: '240px'
    },
    thedrawer: {
        display: 'flex',
        width: '240px'
    },
    Link: {
        textDecoration: 'none'
    }
    }
));

const logOut = () => {
    localStorage.removeItem('passToken');
    console.log("huuuh")
  }


export default function FriendDrawer(props) {
    const [open, setOpen] = React.useState(false);
    const [displayName, setDisplayName] = React.useState("");
    function handleClickOpen() {
        setOpen(true);
      }
      function handleChange(e){
        setDisplayName(e.target.value)
        console.log(displayName)
      }
      function handleClose() {
        setOpen(false);
      }
      function handleAdd(){
          console.log("hey")
        axios({
            method: 'post',
            data: {friend2: displayName},
            url: 'http://localhost:3001/api/friend/'+displayName,
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        })
        .then((res) => {
            console.log(res)
        });
      }
      const displayLinks = (num) => {
        switch(num){
            case 0: return({icon:<PersonAdd />, onClick:handleClickOpen})
            case 1: return({icon:<SettingsApplications />, link:"/test"})
            case 2: return({icon:<CloseIcon />, link:"/", onClick:logOut})   
        }   
    }
    const classes = useStyles();
  return (
    <React.Fragment>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Add friend</DialogTitle>
    <DialogContent>
      <TextField
        value={displayName}
        onChange={handleChange}
        autoFocus
        margin="dense"
        id="name"
        label="Display name"
        type="text"
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleAdd} color="primary">
        Add friend
      </Button>
    </DialogActions>
  </Dialog>

    <div className={classes.thedrawer}>
      <CssBaseline />     
      <Drawer
        variant="persistent"
        anchor="left"
        open={props.open}
        className={classes.Drawer}
        >
        <Divider />
        <List>
          {['Add friend', 'Account settings', 'Logout'].map((text, index) => (
              <Link component={RouterLink} to={displayLinks(index).link} onClick={displayLinks(index).onClick}>
            <ListItem button key={text}>
              <ListItemIcon>{displayLinks(index).icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
    </React.Fragment>
  );
}