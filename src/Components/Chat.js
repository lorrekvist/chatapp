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

const useStyles = theme => ({
    message: {
        marginTop: 5,
        padding: 5
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {

    },
    dense: {

    },
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    messagesList: {
        width: '100%',
        maxHeight: 500,
        overflow: "auto",
        overflowAnchor: "none"
    },
    anchor: {
        overflowAnchor: "auto",
        height: 1
      }

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
                    this.setState({messages: [...this.state.messages, msg]})
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
            <div>
                <List className={classes.messagesList}>
                    {this.state.messages.map((value, index) => 
                    <React.Fragment key={index} >
                         <ListItem alignItems="flex-start">
                           <ListItemAvatar>
                           <Avatar className={classes.orangeAvatar}>{value.displayName.charAt(0)}</Avatar>
                           </ListItemAvatar>
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
                                 {value.createdAt}
                               </React.Fragment>
                             }
                           />
                         </ListItem>
                         <Divider variant="inset" component="li" />
                         </React.Fragment>
                    )}
                    <p className="anchor" />
                </List>
                <form onSubmit = {this.handleSubmit} className={classes.inputForm}>
                <TextField
                    id="message"
                    label="message"
                    onChange={this.handleMessageChange}
                    value={this.state.message}
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    variant="filled"
                    multiline
                    rowsMax="4"
                    fullWidth
                />
                <br />
                <Button variant="outlined" type="submit" className={classes.button}>
                    Post message
                </Button>
                </form>                
            </div>
        )
    }
    
}

export default withStyles(useStyles)(Chat);