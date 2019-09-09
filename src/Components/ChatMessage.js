import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
        margin: 5
    },
    inline: {
      display: 'inline',
    },
  }));

const ChatMessage = (props) => {
    const classes = useStyles();
    return(
        <ListItem alignItems="flex-start">
        <Avatar className={classes.orangeAvatar}>{props.displayName.charAt(0)}</Avatar>
        <ListItemText
            primary={props.displayName}
            secondary={
            <React.Fragment>
                <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
                >
                {props.message}
                </Typography>
                <br />
                {new Date(props.createdAt).toLocaleDateString() + " " + new Date(props.createdAt).toLocaleTimeString()}
            </React.Fragment>
            }
        />
        </ListItem>
    );
}

export default ChatMessage;