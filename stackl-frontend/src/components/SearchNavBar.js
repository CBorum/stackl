import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import '../scss/index.scss';


const mapStateToProps = (state, ownProps) => ({ userId: state.Login.userId });

class SearchNavBar extends React.Component {
    state = {
        searchStr: "",
    }

    search() {
        this.props.history.push(`/posts?input=${this.state.searchStr}`)
        this.setState({ searchStr: "" })
    }

    render() {
        if (this.props.location.pathname === "/") return null
        return (
            <div className="nav-bar-container pt-2 pb-2 pl-3 pr-3 fixed-top" style={{backgroundColor: "white"}}>
                <div className="row">
                    <div className="col-4 col-md-9">
                        <div className="inline-block w-100">
                            <Link className="rm-link" to="/#">
                                <h2 className="mb-0">Stackl</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="col-8 col-md-3">
                        <div style={{width: "100%"}} className="inline-block float-right mt-1">
                            <div className="input-group input-group-sm" >
                                <input onKeyDown={e => {if(e.key === "Enter") this.search()}} value={this.state.searchStr} onChange={e => this.setState({ searchStr: e.target.value })} placeholder="Search the Q&A's" type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                <div className="input-group-append">
                                    <button onClick={() => this.search()} className="btn btn-outline-secondary" type="button">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SearchNavBar = withRouter(SearchNavBar)

export default connect(mapStateToProps)(SearchNavBar);