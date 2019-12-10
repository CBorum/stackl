import React from 'react';
import { connect } from 'react-redux'
import '../scss/index.scss';

const mapStateToProps = (state) => ({
    isLoading: state.Load.isLoading
});


function Loader(props){
    return (
        <div className={`loader-container ${props.isLoading ? 'is-loading' : ''}`}>
            <div className="spinner"></div>
        </div>
    )
}

export default connect(mapStateToProps)(Loader);