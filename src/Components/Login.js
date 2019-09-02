import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';


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
 
class Login extends React.Component {
    
    

    
    state = {
        username: "",
        password: ""
    }
    
    handleUsernameChange = (e) => {
        this.setState({username: e.target.value})

    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})

    }
    handleChange = (e) => {
        this.setState({value: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.username + " " + this.state.password);
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
                id="username"
                label="username"
                className={classes.textField}
                value={this.state.username}
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
            <Button variant="outlined" className={classes.button}>
                Default
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