import React from 'react'
import { connect } from 'react-redux'

import { getSearchHistory } from '../actions/UserActions';
import { formatDate } from './dateFormat'

const mapStateToProps = (state, ownProps) => ({
    userId: state.Login.userId,
    searchHistory: state.User.searchHistory
})

class SearchHistory extends React.Component {
    componentDidMount() {
        const { dispatch, userId } = this.props;
        dispatch(getSearchHistory(userId))
        console.log(this.props)
    }
    
    render() {
        let searchHistory = this.props.searchHistory;
        if (searchHistory == null) {
            return null;
        }
        console.log(searchHistory)
        return (
            <div className="pt-2">
                <h3>Search History</h3>
                <div className="list-group list-group-flush">
                    {searchHistory.map((s, i) => {
                        return (
                            <div key={i} className="list-group-item px-0">
                                {s.query} on {formatDate(s.creationDate)} 
                            </div>)
                    })}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SearchHistory);