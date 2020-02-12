import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';



const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {

  const guestLinks = (
       <ul className="navbar-nav ml-auto">
        <li className="">
          <Link className="nav-link text-light font-weight-bold" to="#">Sign Up</Link>
        </li>
      </ul>);

  const authLinks = (
       <ul className="navbar-nav ml-auto">
        <li className="">
          <Link className="nav-link text-light font-weight-bold pl-2" to="#">Hi {user !== null ? user.firstName : null}</Link>
        </li>
        <li className="">
          <Link className="nav-link text-light font-weight-bold" to="#" onClick={logout}><i className="fas fa-sign-out-alt"></i>  Logout</Link>
        </li>
      </ul>
      );


 
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light navbar-transparent px-5">
    <Link className="navbar-brand text-light font-weight-bold" to="#">To do list</Link>
  

    <div className="ml-auto">
     {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}

    </div>
  </nav>

  
    </div>
    )
}


Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);