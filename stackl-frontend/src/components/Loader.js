import React from 'react';
import { connect } from 'react-redux'
import '../scss/index.scss';

// // <delete>
// import store from "../store";
// import {endLoad, startLoad} from "../actions/LoadActions";
// window.toggleLoading = () => {
//     const state = store.getState()
//     const {isLoading} = state.Load;
//
//     if(isLoading){
//         store.dispatch(endLoad())
//     }else{
//         store.dispatch(startLoad())
//     }
// };
// // </delete>

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