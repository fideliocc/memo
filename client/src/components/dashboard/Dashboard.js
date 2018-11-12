import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { getMyPosts, getFavorites } from '../../actions/postActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';

/* Dashboard para "Mi Cuenta" */
class Dashboard extends Component {
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <div className="container">
              <div className="col-12">
              <hr/>
                <h2>General</h2>
                  <ProfileActions />

                <h2>Datos y seguridad</h2>
                <button
                  onClick={this.onDeleteClick.bind(this)}
                  className="btn btn-danger"
                >
              Eliminar mi cuenta
            </button>
          </div>
            </div>
          </div>



        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Hola, {user.name}</p>
            <p>Aún no has creado un perfil, por favor comparte un poco sobre ti</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Crear Perfil
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <h1 className="display-4">Mi cuenta</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deleteAccount })(
  Dashboard
);
