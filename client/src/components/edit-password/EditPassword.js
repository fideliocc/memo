import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup';
import { changePassword, logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty';

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpassword: '',
      newpassword: '',
      newpassword2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const passwordData = {
      currentpassword: this.state.currentpassword,
      newpassword: this.state.newpassword,
      newpassword2: this.state.newpassword2
    };
    this.props.changePassword(passwordData, this.props.history);
    // Logging out
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Regresar
              </Link>

              <h1 className="display-4 text-center">Cambiar contraseña</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Ingresa tu contraseña actual"
                  name="currentpassword"
                  type="password"
                  value={this.state.currentpassword}
                  onChange={this.onChange}
                  error={errors.currentpassword}  
                />

                <TextFieldGroup
                placeholder="Ingresa tu nueva contraseña"
                name="newpassword"
                type="password"
                value={this.state.newpassword}
                onChange={this.onChange}
                error={errors.newpassword}
                /*info="Tell us a little about yourself"*/
              />


              <TextFieldGroup
              placeholder="Vuelve a ingresar tu nueva contraseña"
              name="newpassword2"
              type="password"
              value={this.state.newpassword2}
              onChange={this.onChange}
              error={errors.newpassword2}
              /*info="Tell us a little about yourself"*/
            />

                <input
                  type="submit"
                  value="Enviar"
                  className="btn btn-dark btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditPassword.propTypes = {
  clearCurrentProfile: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { changePassword, clearCurrentProfile, logoutUser })(
  withRouter(EditPassword)
);
