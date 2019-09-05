import React from 'react';
import axios from 'axios'
import openSocket from 'socket.io-client';
import { isLoggedIn, getToken } from './AuthHelper';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { deepOrange } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import keydown from 'react-keydown';
import { shadows } from '@material-ui/system';
import 'typeface-roboto';


const useStyles = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.8em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey',
          borderRadius: 5
        }
      },
    root: {
        margin: 10,
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5
    },
    message: {
        marginTop: 5,
        padding: 10
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px",
        borderRadius: 5
    },
    dense: {
        
    },
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
        margin: 5
    },
    messagesList: {
        width: '100%',
        maxHeight: 500,
        overflow: "auto",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px",
        borderRadius: 5
    },
    
    button: {
        backgroundColor: theme.primary,
        color: "#ffffff",
        "&:hover": {
            backgroundColor: theme.primary
            
        },
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
    },
});

var socket;

class Chat extends React.Component{

    state = {
        displayName: "",
        message: "",
        messages: []
    }

    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    }
    handleKeyDown = (e) => {
        console.log("key was pressed")
        if(e.key==='Enter'){
            this.handleSubmit(e)
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.message)

        axios({
            method: 'post',
            url: 'http://localhost:3001/api/messages',
            headers: {
                authorization: 'Bearer ' + getToken()
            },
            data: {
                message: this.state.message,
            }
        });

        socket.emit('chat message', [getToken(), this.state.message]);
    }

    componentDidMount() {
        if (!isLoggedIn()) {
            this.props.history.replace('/login')
        } else {
            this.getMessagesFromDb();
            socket = openSocket('http://localhost:3002');
                socket.on('chat message', (msg) => {
                    console.log("got msg: " + msg);
                    this.setState({messages: [...this.state.messages.reverse(), msg].reverse()})
  });
        }
    }

    getMessagesFromDb() {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/messages',
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        })
        .then((res) => {
            this.setState({messages: res.data.reverse() });
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List className={classes.messagesList}>

                    {this.state.messages.map((value, index) => 
                    <React.Fragment key={index} >
                         <ListItem alignItems="flex-start">
                            <Avatar className={classes.orangeAvatar}>{value.displayName.charAt(0)}</Avatar>
                           <ListItemText
                             primary={value.displayName}
                             secondary={
                               <React.Fragment>
                                 <Typography
                                   component="span"
                                   variant="body2"
                                   className={classes.inline}
                                   color="textPrimary"
                                 >
                                   {value.message}
                                 </Typography>
                                 <br />
                                 {new Date(value.createdAt).toLocaleDateString() + " " + new Date(value.createdAt).toLocaleTimeString()}
                               </React.Fragment>
                             }
                           />
                         </ListItem>
                         <Divider variant="inset" component="li" />
                         </React.Fragment>

                    )}
                </List>
                <form onSubmit = {this.handleSubmit} className={classes.inputForm}>
                <TextField
                    id="message"
                    label="message"
                    onChange={this.handleMessageChange}
                    value={this.state.message}
                    onKeyDown={this.handleKeyDown}
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    fullWidth
                />
                <br />
                <Button variant="contained"
                 type="submit" 
                 className={classes.button}
                 >
                    Post message
                </Button>
                </form>                
            </div>
        )
    }
    
}

export default withStyles(useStyles)(Chat);