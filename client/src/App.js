import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Front from './components/layout/Front'
import PrivateRoute from './components/routing/PrivateRouting';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';


if(localStorage.tokens) {
	setAuthToken(localStorage.tokens);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	return (	
<Provider store={store}>
<Router>
<Fragment>
<Navbar />
<Route exact path='/' component={Login} /> 
<Switch>
<PrivateRoute exact path='/front' component={Front} /> 
</Switch>
</Fragment>
</Router>
</Provider>)
}

export default App;
