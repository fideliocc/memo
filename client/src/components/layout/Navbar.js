import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile, getCurrentProfile, getProfileByHandle } from "../../actions/profileActions";
import MemoLogo from "./logo-100.jpg"

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/profile/${this.props.auth.user.name}`} />
    }
  }

   componentDidMount() {
    this.props.getCurrentProfile();
  }

  onMyProfileClick(e) {
    e.preventDefault();
    this.props.getProfileByHandle(this.props.auth.user.name);
    this.setRedirect();
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { loading, profile }  = this.props.profile
    let authLinks;
    
    
    if (profile === null || loading) {
      authLinks = "..."
    } else {
      authLinks = (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
        <Link className="nav-link btn-lg dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Hola, {user.name}</Link>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="" onClick={this.onMyProfileClick.bind(this)}>Mi perfil</Link>

          <Link className="dropdown-item" to="/dashboard">Mi cuenta</Link>
          {/*<a className="dropdown-item" href="#">Another action</a>*/}
          {/*<a className="dropdown-item" href="#">Something else here</a>*/}
          <div className="dropdown-divider"></div>
          {this.renderRedirect()}
          <Link className="dropdown-item" to="" onClick={this.onLogoutClick.bind(this)}>Salir</Link>
        </div>
      </li>

        <li className="nav-item">
          <Link className="btn btn-lg btn-dark mr-2" to="/posts">
            Publicar
          </Link>
        </li>
      </ul>
    );
  }

    // Navbar Links if user isAuthenticated
    

    // Navbar Links if is Guest user
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Registrarse
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Iniciar sesión
          </Link>
        </li>
        {/*
        <li className="nav-item">
          <Link className="btn btn-lg btn-info mr-2" to="/posts">
            Publicar
          </Link>
        </li>*/}
        </ul> 
    );

    return (
      //<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <nav className="navbar navbar-expand-sm navbar-light" >
        <div className="container">
        
          <Link className="navbar-brand" to="/">
            <img src={MemoLogo} className="logo-main" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/*}
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="profiles.html">
                  {" "}
                  Developers
                </a>
              </li>
            </ul>
    */}

          {isAuthenticated ? authLinks : guestLinks}
          {/*</div>*/}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getCurrentProfile, getProfileByHandle }
)(Navbar);
