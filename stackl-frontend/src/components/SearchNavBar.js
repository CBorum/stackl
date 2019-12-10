import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import '../scss/index.scss';
import { getPosts } from '../actions/PostActions';


const mapStateToProps = (state, ownProps) => ({ userId: state.Login.userId });

class SearchNavBar extends React.Component {
    state = {
        searchStr: "",
    }

    search() {
        const { dispatch } = this.props
        dispatch(getPosts(this.state.searchStr, this.props.userId))
        this.setState({ searchStr: "" })
    }

    render() {
        if (this.props.location.pathname === "/") return null
        return (
            <div className="nav-bar-container mt-2 pl-3 pr-3">
                <div style={{ width: 100 }} className="inline-block">
                    <Link className="rm-link" to="/#">
                        <h2>Stackl</h2>
                    </Link>
                </div>
                <div className="inline-block float-right" style={{ width: 300 }}>
                    <div className="input-group input-group-sm mb-3 mt-1" >
                        <input onKeyDown={e => {if(e.key === "Enter") this.search()}} value={this.state.searchStr} onChange={e => this.setState({ searchStr: e.target.value })} placeholder="Search the Q&A's" type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        <div className="input-group-append">
                            <button onClick={() => this.search()} className="btn btn-outline-secondary" type="button">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SearchNavBar = withRouter(SearchNavBar)

export default connect(mapStateToProps)(SearchNavBar);