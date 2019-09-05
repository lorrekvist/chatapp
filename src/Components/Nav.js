import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';
import 'typeface-roboto';


  const useStyles = makeStyles({
    tabs: {
      flexGrow: 1,
      backgroundColor: "#1976d2",
      margin:0,
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
      
    },
    tab: {
      color: "#ffffff",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#1666b5"
        
    },
    }
  });
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
                    textColor="#ffffff"
                    centered
                    >
                    <Tab className={classes.tab} label="Home" component={Link} to="/" />
                    <Tab className={classes.tab} label="Login" component={Link} to="/Login"/>
                    <Tab className={classes.tab} label="About" component={Link} to="/About"/>
                    <Tab className={classes.tab} label="Chat" component={Link} to="/Chat"/>
                </Tabs>
        )
}

   
