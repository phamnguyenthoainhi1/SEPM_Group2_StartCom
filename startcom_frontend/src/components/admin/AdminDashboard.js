import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './AdminDashboardStyle.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {fetchUnverifiedEmails, VerifiedEmails} from '../../actions/admin/adminActions.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id :'',
            email: '',
            loading: false,
            success: false,
            unverifiedEmails: [],
            open: false
        };
        // this.verify = this.verify.bind(this);
    }
    componentDidMount() { 
        this.props.fetchUnverifiedEmails();
        
    }
    componentDidUpdate(prevProps) {
        if (this.props.unverifiedEmails !== prevProps.unverifiedEmails ) {
            this.setState({
                unverifiedEmails: this.props.unverifiedEmails
            })
        }
        if (this.props.loading !== prevProps.loading) {
            this.setState({
                loading: this.props.loading
            })
        }
        if (this.props.success !== prevProps.success && this.props.success === true) {
            // this.setState({
            //     success: this.props.success
            // })
            console.log('success');
            this.handleClickOpen();
        }
        
    }
    verify = (key) => {
        // this.handleClickOpen()
        this.props.VerifiedEmails(key)
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
        
    };
    handleClose = () => {
        this.setState({
            open: false
        })
        this.props.fetchUnverifiedEmails()
        
        
    
    };


    render() {
        const {classes} = this.props; 
        
        return (
            <div>
                 <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableBody>
                            {this.state.unverifiedEmails.map((row) => (
                                <TableRow key ={row.id}>
                                    <TableCell component="th" scope="row">
                                    {row.email}
                                    </TableCell>
                                    <TableCell align="right"><Button onClick={()=> this.verify(row.id)}>Verify</Button></TableCell>
                                </TableRow>
                            ))} 
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog 
                            className={classes.dialog}
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                > 
                                <DialogContent>
                                   
                                                <Typography gutterBottom className={classes.text}>
                                                Verify Email Sucessfully!
                                                </Typography>
                                           
                                    
                                </DialogContent>
    
                            </Dialog> 
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchUnverifiedEmails: () => dispatch(fetchUnverifiedEmails()),
    VerifiedEmails: (id) => dispatch(VerifiedEmails(id))

  
})
const mapStateToProps = state => ({
    unverifiedEmails: state.unverifiedEmails.unverifiedEmails,
    loading: state.emailLoading.emailLoading,
    success: state.verifySuccess.verifySuccess
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(AdminDashboard));

