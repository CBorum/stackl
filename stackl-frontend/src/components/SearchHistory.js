import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
    }

    render() {
        let searchHistory = this.props.searchHistory;
        if (searchHistory == null) {
            return null;
        }

        return (
            <div className="pt-2">
                <h3>Search History</h3>
                <div className="list-group list-group-flush">
                    {searchHistory.map((s, i) => {
                        return (
                            <div key={i} className="list-group-item px-0">
                                <Link to={`/posts?input=${s.query}`}>{s.query}</Link> on <i>{formatDate(s.creationDate)}</i>
                            </div>)
                    })}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SearchHistory);