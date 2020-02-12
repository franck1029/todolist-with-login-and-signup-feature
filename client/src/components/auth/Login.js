import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert'
import { login } from '../../actions/auth';

const Login = ({ setAlert, register, isAuthenticated, login }) => {
	const [toggle, setToggle] = useState({
		Register: false
	});
	const { Register } = toggle;


	const [registerFormData, setRegisterFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: ''

	});

	const { firstName, lastName, email, password, password2 } = registerFormData;
	const onChange = e => setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value})
	const onSubmit = e => {
		e.preventDefault();
		if(password !== password2) {
			setAlert('passwords do not match', 'danger')
		} else {
			register({
				firstName, 
				lastName, 
				email, 
				password
			});
		}
	};


	const [loginFormData, setLoginFormData] = useState({
		lemail: '',
		lpassword: '',

	});

	const { lemail, lpassword } = loginFormData;
	const onChange2 = e => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value})
	const onSubmit2 = e => {
		e.preventDefault();
			login(lemail, lpassword);
	};
	

	//Redirect if logged in

if (isAuthenticated) {
    return <Redirect to='/front' />;
  }


	return <div className="login-page">
  <div className="form">
  {Register ?
  	<form className="register-form" onSubmit={e => onSubmit(e)}>
  	<Alert />
      <input type="text" name='firstName' placeholder="first name" onChange={e =>onChange(e)} value={firstName} required/>
      <input type="text" name='lastName' placeholder="last name" onChange={e =>onChange(e)} value={lastName} required/>
      <input type="text" name='email' placeholder="email address" onChange={e =>onChange(e)} value={email} required/>
      <input type="password" name='password' placeholder="password" onChange={e =>onChange(e)} value={password} minLength='6'/>
      <input type="password" name='password2' placeholder="confirm password" onChange={e =>onChange(e)} value={password2} minLength='6'/>
      <button type="submit">create</button>
      <p className="message">Already registered? <Link to="#" onClick={() => setToggle({ Register: false})}>Sign In</Link></p>
    </form>
    : null }
    

     {!Register ?
  <form className="login-form"onSubmit={e => onSubmit2(e)} >
  	<Alert />
      <input type="text" name='lemail' placeholder="email"  onChange={e => onChange2(e)} value={lemail} required/>
      <input type="password" name='lpassword' placeholder="password" onChange={e => onChange2(e)} value={lpassword} required/>
      <button type="submit">login</button>
      <p className="message">Not registered? <Link to="#" onClick={() => setToggle({ Register: true})}>Create an account</Link></p>
    </form>
    : null }
    
  </div>
</div>
}

Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setAlert, register, login })(Login);



