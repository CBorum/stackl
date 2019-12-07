import React from 'react';
import { connect } from 'react-redux'

import '../scss/index.scss';

const mapStateToProps = (state, ownProps) => ({});

class SideBar extends React.Component {
    state = {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="col-3 sideBarBorder">
                hejsa
            </div>
        );
    }
}

export default connect(mapStateToProps)(SideBar);