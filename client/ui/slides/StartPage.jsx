import React from 'react';
import { Link } from 'react-router';

const StartPage = (props) => {
  return (<div>
    <h1>First slide {props.text}</h1>
    <Link to="/hello">Open Hello Page</Link>
  </div>);
};

StartPage.propTypes = {
  text: React.PropTypes.string
};

export default StartPage;
