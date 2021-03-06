import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import FriendDrawer from './Drawer';

const useStyles = makeStyles(theme => ({
  tabs: {  
    flexGrow: 1,
    backgroundColor: theme.primary,
    margin:0,
    color: "#ffffff"
  },
  tab: {
    color: "#ffffff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: theme.primaryLight
      
  },
  
}
}));

export default function Nav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

  

  const toggleDrawer = () => {
    setOpen(!open)
  }
  

  
    function handleChange(event, newValue) {
      setValue(newValue);
    }
        return (
          <div>
                <Tabs className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    centered
                    >
                    <Tab className={classes.tab} label="Home" component={Link} to="/" disableRipple />
                    <Tab className={classes.tab} label="Login" component={Link} to="/Login" disableRipple />
                    <Tab className={classes.tab} label="About" component={Link} to="/About" disableRipple />
                    <Tab className={classes.tab} label="Chat" component={Link} to="/Chat" disableRipple />
                    
                    <Tab className={classes.tab} label="toggle menu"onClick={toggleDrawer} disableRipple />
                </Tabs>
                <FriendDrawer open={open}></FriendDrawer>
           </div>     
        )
}
