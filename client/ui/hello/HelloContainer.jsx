import React from 'react';
import './hello.scss';
import store from 'reduxStore';
import { loadExampleJSON, increment } from 'flux/actions';
import _ from 'lodash';

export default class HelloContainer extends React.Component {
  constructor(props) {
    super(props);
    const initialValues = store.getState().reducerFirst;
    this.state = {
      example: initialValues.example,
      loading: false,
      jsonData: {}
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const newValues = store.getState().reducerFirst;
      const { example } = this.state;

      if (newValues.example != example) {
        this.setState({
          example: newValues.example
        });
      }

      this.setState({
        loading: newValues.loadingJSON,
        jsonData: newValues.loadedData
      });
    });
  }

  render() {
    const { text } = this.props;
    const { example, loading, jsonData } = this.state;
    let loadingText = loading ? '(loading ...)' : '',
      jsonText = _.get(jsonData, 'text', '');

    if (jsonText) {
      jsonText = (<i>{jsonData.text}</i>);
    }

    return (<div className="hello__container">
        <h1>Hello world !</h1>
        <h2>{example} - value from store</h2>
        <h3>{text} - extra text from props</h3>
        <button className="button" onClick={this.handleExample}>click</button>
        <br/>
        <br/>
        <button onClick={this.loadJSON}>Load JSON file {loadingText}</button>
        <br/>
        {jsonText}
    </div>);
  }

  handleExample = () => {
    store.dispatch(increment());
  }

  loadJSON = () => {
    store.dispatch(loadExampleJSON(111));
  }
}

HelloContainer.propTypes = {
  text: React.PropTypes.string
};

HelloContainer.defaultProps = {
  text: 'default text'
};