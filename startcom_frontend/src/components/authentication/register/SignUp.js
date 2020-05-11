import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
// import CheckIcon from "@material-ui/icons/Check";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from './signUpStyle';
import {registerAccount} from '../../../actions/anonymoususers/AnonymoususersActions';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
import DoneIcon from '@material-ui/icons/Done';

const ColorCircularProgress = withStyles({
    root: {
      color: '#3C5155'
      
    },
  })(CircularProgress);

const CustomRadio = withStyles({
    root: {
      color: '#3C5155',
      '&$checked': {
        color: '#E3CFB5',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  




class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpEmail: "",
            signUpPassword: "",
            signUpConfirmPassword: "",
            type: 'startupowner',
            loading: '',
            success: false,

            formSignUpErrors: {
                emailError: "",
                passwordError: "",
                confirmPassError: ""
            },
        }
    }


    componentDidUpdate(prevProps) {
        if (this.props.registerLoading !== prevProps.registerLoading) {
            this.setState({
                loading: this.props.registerLoading
            })
        }
        if (this.props.registerMessage !== prevProps.registerMessage) {
           
            if (this.props.registerMessage.code === 'auth/email-already-in-use') {
                this.setState({
                    formSignUpErrors: {
                        emailError: this.props.registerMessage.message,
                        passwordError: "",
                        confirmPassError: ""
                    },
                })
            } else if (this.props.registerMessage.code === 'auth/weak-password') {
                this.setState({
                    formSignUpErrors: {
                        emailError: "",
                        passwordError: this.props.registerMessage.message,
                        confirmPassError: ""
                    },
                })
            } else if (this.props.registerMessage.code === "auth/invalid-email") {
                
                this.setState({
                    formSignUpErrors: {
                        emailError: this.props.registerMessage.message,
                        passwordError: '',
                        confirmPassError: ""
                    },
                })
            }
            else if (this.props.registerMessage.code === undefined) {
                console.log('success')
                this.setState({
                    signUpEmail: "",
                    signUpPassword: "",
                    signUpConfirmPassword: "",
                    type: '',
                    success: true,
                    loading: false
                })
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    signUpWithEmail = (event) => {
        event.preventDefault();
        if (this.state.signUpPassword !== this.state.signUpConfirmPassword) {
            this.setState({
                formSignUpErrors: {
                    emailError: "",
                    passwordError: "",
                    confirmPassError: "Password Confirmation does not match Password"
                },
            })
        } else {
            const user = {
                email: this.state.signUpEmail,
                password: this.state.signUpPassword,
                type: this.state.type
            };
            this.props.registerAccount(user);
        }
       
    };

    render() {
        const {classes} = this.props;

        return (
            <div className="form-container sign-up-container">
                <form>
                    <h1 className={classes.label} style ={{color: '#3C5155'}}>Create your account</h1>
                    <TextField
                        type="email"
                        name="signUpEmail"
                        placeholder="Email"
                        className={classes.formInput}
                        helperText={this.state.formSignUpErrors.emailError}
                        error={!!this.state.formSignUpErrors.emailError}
                        id="signUpEmail"
                        onChange={this.handleChange}
                        value={this.state.signUpEmail}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        type="password"
                        name="signUpPassword"
                        placeholder="Password"
                        className={classes.formInput}
                        helperText={this.state.formSignUpErrors.passwordError}
                        error={!!this.state.formSignUpErrors.passwordError}
                        id="signUpPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpPassword}
                        fullWidth
                
                    >
                    </TextField>
                    <TextField
                        type="password"
                        name="signUpConfirmPassword"
                        placeholder="Confirm Password"
                        className={classes.formInput}
                        helperText={this.state.formSignUpErrors.confirmPassError}
                        error={!!this.state.formSignUpErrors.confirmPassError}
                        id="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpConfirmPassword}
                        fullWidth
                       
                    >
                    </TextField>
                    <FormControl component="fieldset">
                            <RadioGroup row aria-label="type" name="type" value={this.state.type} onChange={this.handleChange} required>
                                <FormControlLabel  value="startupowner" control={<CustomRadio />}  label="Startup Owner" className={classes.formcontrollabel}/>
                                <FormControlLabel value="investor" control={<CustomRadio />} label="Investor" className={classes.formcontrollabel} />
                                <FormControlLabel value="consultant" control={<CustomRadio />} label="Consultant" className={classes.formcontrollabel}/>
                            </RadioGroup>
                </FormControl>

                    {
                    this.state.loading === true ? (<ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                    :
                    
                    ((this.state.success === false && (this.state.loading === '' || this.state.loading === false)) ? 
                    (<Button
                            variant="contained"
                           onClick={this.signUpWithEmail}
                           className={classes.registerBtn}

                        > Register </Button>)
                    : 
                    
                    (<Button
                            variant="contained"
                           
                           className={classes.successBtn}
                            startIcon={<DoneIcon />}
    
                        > Registered</Button>))
                    }
                </form>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    registerMessage: state.usersReducer.registerMessage,
    registerLoading: state.usersReducer.registerLoading
});

const mapDispatchToProps = dispatch => ({
    registerAccount : (user) => dispatch(registerAccount(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
