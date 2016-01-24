import React from 'react';
import './hello.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'flux/actions';
import _ from 'lodash';

export class HelloContainer extends React.Component {
  render() {
    const { text, reducerFirst: {example, loadingJSON, loadedData} } = this.props;
    let loadingText = loadingJSON ? '(loading ...)' : '',
      jsonText = _.get(loadedData, 'text', '');

    if (jsonText) {
      jsonText = (<i>{loadedData.text}</i>);
    }

    return (<div className="hello__container">
        <h1>Hello world!</h1>
        <h2>{example} - value from store</h2>
        <h3>{text} - extra text from props</h3>
        <button className="hello__button-increment" onClick={this.handleExample}>click</button>
        <br/>
        <br/>
        <button className="hello__button-load" onClick={this.loadJSON}>Load JSON file {loadingText}</button>
        <br/>
        {jsonText}
    </div>);
  }

  handleExample = () => {
    this.props.actions.increment();
  }

  loadJSON = () => {
    this.props.actions.loadExampleJSON(111);
  }
}

HelloContainer.propTypes = {
  text: React.PropTypes.string,
  reducerFirst: React.PropTypes.object,
  actions: React.PropTypes.object
};

HelloContainer.defaultProps = {
  text: 'default text',
  reducerFirst: {}
};

function mapStateToProps(state) {
  return { reducerFirst: state.reducerFirst };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloContainer);

