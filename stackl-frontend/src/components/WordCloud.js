import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactWordcloud from 'react-wordcloud';
import { getWordCloud } from '../actions/WordCloudActions'
import queryString from 'query-string'

const mapStateToProps = (state, ownProps) => ({ words: state.Words.words });

class WordCloud extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        const query = queryString.parse(this.props.location.search)
        dispatch(getWordCloud(query.input))
    }

    componentWillUnmount() {
    }

    render() {
        let words = this.props.words;
        const options = {
          colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
          enableTooltip: true,
          deterministic: false,
          fontFamily: 'impact',
          fontSizes: [5, 60],
          fontStyle: 'normal',
          fontWeight: 'normal',
          padding: 1,
          rotations: 3,
          rotationAngles: [0, 90],
          scale: 'sqrt',
          spiral: 'archimedean',
          transitionDuration: 1000,
        };
        if (!this.props.words) return <div className="col-12 col-md-9 col-lg-9 mt-4"></div>;

        return (
          <div className="col-12 col-md-9 col-lg-9 mt-4">
            <ReactWordcloud options={options} words={words} />
          </div>
        );
    }
}

WordCloud = withRouter(WordCloud);



export default connect(mapStateToProps)(WordCloud);