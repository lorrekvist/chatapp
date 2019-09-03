import React from 'react';
import axios from 'axios'
import { isLoggedIn, getToken } from './AuthHelper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 5000
    },
    dense: {
        marginTop: theme.spacing(2),
    },

}));

class Chat extends React.Component{

    state = {
        displayName: "",
        message: ""
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
        })
    }

    componentDidMount() {
        if (!isLoggedIn()) {
            this.props.history.replace('/login')
        } else {
           //localStorage.getItem
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
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