import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import { setToken } from './AuthHelper';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(1),
    },
    dense: {
       // marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
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
                Log in
            </Button>
    
        </form>

            <Link component={RouterLink} to="/signup">
            Click here to sign up.
            </Link>
        </div>
        );
   }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Login);