import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';

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
      backgroundColor: "#1666b5"
      
  },
  }
}));

export default function Nav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    function handleChange(event, newValue) {
      setValue(newValue);
    }
        return (
                <Tabs className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    centered
                    >
                    <Tab className={classes.tab} label="Home" component={Link} to="/" disableRipple />
                    <Tab className={classes.tab} label="Login" component={Link} to="/Login" disableRipple />
                    <Tab className={classes.tab} label="About" component={Link} to="/About" disableRipple />
                    <Tab className={classes.tab} label="Chat" component={Link} to="/Chat" disableRipple />
                    <Tab className={classes.tab} label="Log out" component={Link} to="/" onClick={logOut} disableRipple />
                </Tabs>
        )
}

const logOut = () => {
  localStorage.removeItem('passToken');
}
