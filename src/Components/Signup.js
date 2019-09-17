import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { setToken } from './AuthHelper';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5px',
        backgroundColor:'#ffffff',
        borderRadius: 5,
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
    },
    menu: {
        width: 200,
    },
    button: {
        width: "auto",
        margin: "0 auto",
        backgroundColor: theme.primary,
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#1976d2"
        },
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
    }
    
});
 
class Signup extends React.Component {
    state = {
        email: "",
        password: "",
        displayName: ""
    }
    
    handleUsernameChange = (e) => {
        this.setState({email: e.target.value})

    }
    handleDisplayNameChange = (e) => {
        this.setState({displayName: e.target.value})
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})

    }
    handleChange = (e) => {
        this.setState({value: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3001/signup',
            data: {
                email: this.state.email,
                password: this.state.password,
                displayName: this.state.displayName
            }
        }).then((result) => {
            if(result && result.data && result.data.signedJWT){
                setToken(result.data.signedJWT)
                this.props.history.replace('/');
            }
        })
    }

   render() {
    const { classes } = this.props;
    return(
        <div style={{width: "300px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px"}}>
        
        <Typography variant="h1" component="h2" gutterBottom>
        Register
        </Typography>

        <form className = {classes.container}onSubmit = {this.handleSubmit}>
            <TextField
                id="email"
                label="email"
                className={classes.textField}
                value={this.state.email}
                onChange = {this.handleUsernameChange}
                margin="normal"
                variant="outlined"/>
                
            <TextField
                id="displayName"
                label="displayName"
                className={classes.textField}
                value={this.state.displayName}
                onChange = {this.handleDisplayNameChange}
                margin="normal"
                variant="outlined"/>
            
            <TextField
                id="password"
                label="password"
                type="password"
                className={classes.textField}
                value={this.state.password}
                onChange = {this.handlePasswordChange}
                margin="normal"
                variant="outlined"/>

            <Button variant="outlined" type="submit" className={classes.button} disableRipple>
                Sign up
            </Button>
        </form>
        </div>
        );
   }
}
Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);