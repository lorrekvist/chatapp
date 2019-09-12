import React from 'react';
import axios from 'axios'
import openSocket from 'socket.io-client';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import 'typeface-roboto';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { isLoggedIn, getToken } from './AuthHelper';
import ChatMessage from './ChatMessage';
import FriendList from './FriendList';

const useStyles = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.8em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.25)',
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
        messages: [],
        chats : [],
        chatTab: 1,
        createNewChat: false,
        searchFriend : ""
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
                chatroom: this.state.chatTab
            }
        });

        socket.emit('chat message', [getToken(), this.state.message]);
    }

    componentDidMount() {
        if (!isLoggedIn()) {
            this.props.history.replace('/login')
        } else {
            this.getMessagesFromDb();
            this.getChatroomsFromDb();
            socket = openSocket('http://localhost:3002');
                socket.on('chat message', (msg) => {
                    console.log("got msg: " + msg);
                    this.setState({messages: [msg, ...this.state.messages]})
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

    getChatroomsFromDb() {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/chatrooms',
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        })
        .then((res) => {
            this.setState({chats: res.data });
            console.log(this.state.chats);
        });
    }

    createNewChat() {
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/chatrooms',
            data: {
                name: "NEW CHAT"
            },
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        })
        .then((res) => {
            console.log(res);
        });
    }

    render() {
        const { classes } = this.props;

        const onChatTabClick = (event, newTab) => {
            this.setState({chatTab: newTab});
            if(newTab === 'NEW_CHAT') {
                handleClickNewChat();
            }
        }

        const handleClickNewChat = () => {
            this.setState({createNewChat: true});
          }
        
        const handleCloseNewChat = () => {
            this.setState({createNewChat: false});
        }

        const handleCreateNewChat = () => {
            this.setState({createNewChat: false});
            this.createNewChat();
        }

        const updateSearchFriend = (e) => {
            this.setState({
                searchFriend: e.target.value
            })
            console.log(this.state.searchFriend)
        }

        return (
            <div className={classes.root}>
                        <Tabs
                            value={this.state.chatTab}
                            onChange={onChatTabClick}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Create new chat room" disableRipple value="NEW_CHAT" />

                            {this.state.chats.map(chat => 
                            <Tab label={chat.displayName} disableRipple value={chat._id} key={chat._id} />
                                )}

                        </Tabs>
                <List className={classes.messagesList}>

                    {this.state.messages.map((value, index) => 
                    <React.Fragment key={index} >
                        <ChatMessage displayName={value.displayName} message={value.message} createdAt={value.createdAt} />
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
                 disableRipple
                 >
                    Post message
                </Button>
                </form>              
            

            <Dialog open={this.state.createNewChat} onClose={handleCloseNewChat} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create new chat</DialogTitle>
            <DialogContent>
            <FriendList searchFriend={this.state.searchFriend} />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Chat name"
                type="text"
                value={this.state.searchFriend}
                onChange={updateSearchFriend}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseNewChat} color="primary">
                Cancel
            </Button>
            <Button onClick={handleCreateNewChat} color="primary">
                Create
            </Button>
            </DialogActions>
            </Dialog>

            </div>
        )
    }
    
}

export default withStyles(useStyles)(Chat);