import React, { Component } from 'react'
import {connect} from 'react-redux';
import {fetchBI, registerBI} from '../../actions/businessideas/BIActions';
// import { withStyles } from '@material-ui/core';
class BIS extends Component {
    componentDidMount() { 
        this.props.fetchBI();
    }

    render() {
        console.log(this.props.businessIdeas);
        return (
            <div>
                
            </div>
        )
    }
}
const mapStateToProps = state => ({
    businessIdeas: state.businessIdeas.businessIdeas,
});
export default connect(mapStateToProps, { fetchBI})(BIS);
