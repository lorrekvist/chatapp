import React from 'react';
import axios from 'axios'
import openSocket from 'socket.io-client';
import { isLoggedIn, getToken } from './AuthHelper';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
            <div>
                <p>
                    {this.state.messages.map(value => 
                        <Paper className={classes.message}>
                            <Typography variant="h5" component="h3">
                                {value.displayName}
                            </Typography>
                            <Typography component="p">
                                {value.message}
                            </Typography>
                            <Typography component="small">
                                {value.createdAt}
                            </Typography>
                        </Paper>
                    )}
                </p>
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

/*Chat.propTypes = {
    classes: PropTypes.object.isRequired,
};*/


export default withStyles(useStyles)(Chat);