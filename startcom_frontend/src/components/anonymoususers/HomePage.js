import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './StyleHomePage';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
class HomePage extends Component {
    render() {
        const {classes} = this.props; 
        return (
            <Grid container className={classes.root}>
                <Navbar/>
                <Grid container spacing={0}>
                    <Grid item xs={6} className={classes.leftColumn}>
                        <Typography component="div">
                            <Box fontWeight="fontWeightRegular" m={1} className={classes.welcomeTittle}>
                                Welcome
                            </Box>
                            <Box fontWeight="fontWeightLight" m={1}>
                            StartCom began in 2020 with a simple idea that’s grown into an incredible opportunity for startup community. To do so, we’ve decided to develop this platform to connect startup owners, investors and consultants together. If you choose to join us, you’ll be taking a step towards the potential partnership.
                            </Box>
                        </Typography>
                        <Button variant="contained" className={classes.joinButton}>Join Us</Button>
                    </Grid>
                    <Grid item xs={6} className={classes.rightColumn}>
                        <CardMedia className={classes.media} image={require("../../images/community.svg")}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.row} >
                        <Box fontWeight="fontWeightMeidum" m={1} className={classes.rowTittle}>
                           StartCom
                        </Box>
                        <Box fontWeight="fontWeightRegular" m={1} color='white' marginBottom ='20px' >
                        Make a True Impact
                        </Box>
                        <Box fontWeight="fontWeightLight" m={1} color='white' >
                        StartCom is focused on bringing about chances. We’ve built and fueled our vision with time, resources, and passion, but we need your help to strengthen its connection.
                        </Box>
                    </Grid>
                    <Grid item xs={12} className={classes.below}>
                        <Box  m={1} className={classes.avatarBox}>
                        <Avatar src={require("../../images/deal.svg")} className={classes.avatar} />
                        </Box>
                        <Box fontWeight="fontWeightLight" m={1} >
                        StartCom is focused on bringing about chances. We’ve built and fueled our vision with time, resources, and passion, but we need your help to strengthen its connection.
                        </Box>
                    </Grid>
                </Grid>
                <Footer/>
            </Grid>
        )
    }
}
// export default connect (null, withStyles(style)(HomePage));
export default connect(null)(withStyles(style)(HomePage));
