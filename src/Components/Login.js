import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { setToken } from './AuthHelper';
import { shadows } from '@material-ui/system';
import 'typeface-roboto';
import Box from '@material-ui/core/Box';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '300px'
    },
    textField: {
       marginLeft: 'auto',
       marginRight: 'auto',
       marginTop: '5px',
       backgroundColor:'#ffffff',
       borderRadius: 5,
       boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
    },
    dense: {
       // marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    button: {
        width: "95px",
        marginLeft: "auto",
        marginRight: "5px",
        backgroundColor: "#1976d2",
        color: "#ffffff",
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#1976d2"
        },
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
    },
    button2: {
        width: "95px",
        marginRight: "auto",
        marginLeft: "5px",
        backgroundColor: "#1976d2",
        color: "#ffffff",
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#1976d2"
        },
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
    },
    
});
 
class Login extends React.Component {
    
    

    
    state = {
        email: "",
        password: ""
    }
    
    handleUsernameChange = (e) => {
        this.setState({email: e.target.value})

    }
    handleKeyDownPass = (e) => {
        console.log("key was pressed")
        if(e.key==='Enter'){
            this.handleSubmit(e)
        }
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
            url: 'http://localhost:3001/login',
            data: {
                email: this.state.email,
                password: this.state.password
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
                variant="outlined"
                />
                         
            <TextField
                id="password"
                label="password"
                type="password"
                className={classes.textField}
                value={this.state.password}
                onChange = {this.handlePasswordChange}
                onKeyDown={this.handleKeyDownPass}
                margin="normal"
                variant="outlined"/>
            <Button variant="outlined" type="submit"className={classes.button}>
                Log in
            </Button>
            <Button variant="outlined" className={classes.button2} component={RouterLink} to="/signup">
                sign up
            </Button>
    
        </form>           
        </div>      
        );
   }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Login);