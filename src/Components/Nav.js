import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
const useStyles = makeStyles => ({
    root: {
      flexGrow: 1,
    },
  });
export default function Nav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    function handleChange(event, newValue) {
      setValue(newValue);
    }
   

        return (
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab label="Home" component={Link} to="/" />
                    <Tab label="Login" component={Link} to="/Login"/>
                    <Tab label="About" component={Link} to="/About"/>
                    <Tab label="Chat" component={Link} to="/Chat"/>
                </Tabs>
        )
}

   
