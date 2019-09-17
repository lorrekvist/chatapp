import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      width: "450px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "30px",
      backgroundColor: theme.primaryLight,
      color: "#ffffff",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
    },
  }));
  
export default function PaperSheet() {
    const classes = useStyles();
  
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            What is chatBois?
          </Typography>
          <Typography component="p">
            Here at chatbois you can chat about anything!
            Chat about chatBois! Chat about chatting about chatBois!

            Start by creating an account and then go chat! You can add anyone you'd like by opening the menu.
            You can furthermore also create private chats with your friends by clicking the Create new chat button and then the friend you'd like a chat with!
          </Typography>
        </Paper>
      </div>
    );
  }

