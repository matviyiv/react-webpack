import React from 'react';
import './hello.scss';
import store from 'reduxStore';

export default class HelloContainer extends React.Component {
  constructor(props) {
    super(props);
    const initialValues = store.getState().reducerFirst;
    this.state = {
      example: initialValues.example
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const newValues = store.getState().reducerFirst;
      this.setState({
        example: newValues.example
      });
    });
  }

  render() {
    const { text } = this.props;
    const { example } = this.state;

    return (<div className="hello__container">
        <h1>Hello world !</h1>
        <h2>{example} - value from store</h2>
        <h3>{text} - extra text from props</h3>
        <button onClick={this.handleExample}>click</button>
    </div>);
  }

  handleExample = () => {
    store.dispatch({ type: 'INCREMENT' });
  }
}

HelloContainer.propTypes = {
  text: React.PropTypes.string
};

HelloContainer.defaultProps = {
  text: 'default text'
};