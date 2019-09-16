import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const useStyles = makeStyles(theme => ({
    root: {
      shadows: "2",
      padding: theme.spacing(3, 2),
      width: "450px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "30px",
      backgroundColor: theme.primaryLight,
      color: "#ffffff",
    },
    
    
  }));
  
export default function PaperSheet() {
    const classes = useStyles();
  
    return (
      <div>
        <Paper className={classes.root} >
          <Typography variant="h5" component="h3">
            Home of chatBois
            </Typography>
                <Typography component="p">
                Here at chatbois you can chat about anything!
                Chat about chatBois! Chat about chatting about chatBois! You get the picture.
                </Typography>
        </Paper>
      </div>
    );
  }