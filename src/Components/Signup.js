import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { setToken } from './AuthHelper';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
       // marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(1),
    },
    dense: {
       // marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    
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
        console.log(this.state.email);
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
                console.log("inuti 'THEN'")
                setToken(result.data.signedJWT)
                this.props.history.replace('/');
            }
        })
        console.log(this.state.email + " " + this.state.password);
    }

   render() {
       const { classes } = this.props;
    return(
        <div style={{width: "300px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px"}}>
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
                className={classes.textField}
                value={this.state.password}
                onChange = {this.handlePasswordChange}
                margin="normal"
                variant="outlined"/>

            <Button variant="outlined" type="submit"className={classes.button}>
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