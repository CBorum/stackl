import React from 'react'
import { connect } from 'react-redux'

import { formatDate } from './dateFormat'
import { getSearchHistory } from '../actions/UserActions';

const mapStateToProps = (state, ownProps) => ({
    userId: state.Login.userId
})

class SearchHistory extends React.Component {

    componentDidMount() {
        const { dispatch, userId } = this.props;
        dispatch(getSearchHistory(userId))
        console.log(this.props)
    }
    
    render() {
        return (
            <span>
                search hist
            </span>
        );
    }
}

export default connect(mapStateToProps)(SearchHistory);