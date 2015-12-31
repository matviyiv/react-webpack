# React Webpack
This is react webpack starter kit using redux for flux.
Client side unit test use karma.

## Table of contents

  * [Installation](#installation)
  * [Avaliable Commands](#avaliable-commands)
  * [Folder Structure](#folder-structure)
  * [UI modules](#ui-modules)
  * [Code Examples](#code-examples)
  	* [Actions](#actions)
  	* [Reducers](#reducers)
  * [Thanks](#thanks)

*****

## Installation
1. Install Node.js
2. `npm install`
3. `npm run hot`
4. open client/index.html in browser

## Avaliable Commands
Development - hot reload for js and css files + express server:
```
npm run start-dev
```

Production - minified and uglified files + express server:
```
npm start
```

Run tests:
```
npm test
```

TDD:
```
npm run test-watch
```

## Folder Structure
- client
	- css
	- data
	- flux
	- ui
		- hello
		- utils

`client` - all module paths are relative to this folder e.g. 'ui/utils/fetch'.
`css` - Sass files wich can `@import 'css/_settings.scss';` to get globall settings.
`data` - mocked json files.
`flux` - contains actions and reducers ([read here](#actions)).
`ui` - UI modules and other helpers.

### UI modules
Devide into three types:
 1. __container__ - does the data fetching for a small part of the application. It can represent a page or a fragment of a page.
 2. __component__ - doesn't do any data fetching and expects data pass via `props`. It is reusesable module that can have state and expects high-level data. Component can have styles for layouting.
 3. __element__ - doesn't do any data fetching and expects data pass via `props`. It is low-level reuseable module that can be used by different components. It has no state, contains own styles. Examples for elements: a drop down list, autocompletion edit box, radio button list.


### Code Examples
#### Actions
```javascript
import store from 'reduxStore';
import { actionName } from 'flux/actions';

store.dispatch(actionName());
```
Action can be sync and async:
__Sync__ actions returns an object `{ type: 'ACTION_NAME' }`
__Async__ actions returns a function that accept dispatch 
`(dispatch) => { dispatch({ type: 'ACTION_NAME' }); }`

#### Reducers
Reducers have pure functions to handle state change. If reducer for given action is not avaliable it should just return unmodified state.
```javascript
export function reducerExample(state = {example: 1}, action) {
  const actions = {
    ACTION_NAME: (st) => {
      st.example += 1;
      return st;
    },
    default: (st) => { return st; }
  };

  const modifier = actions[action.type] || actions.default;

  return modifier(state, action.data);
}
```

## Thanks
Cool webpack config I took from https://github.com/webpack/react-starter