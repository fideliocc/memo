import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup"

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    //Binding
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // Redirect to Main page if user is logged in
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  // Takes new props and put those on the component state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // this.props.history permite hacer redirect desde la acción
    // gracias a { withRouter } de 'react-router-dom'
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    // Now errors is part of the state
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Regístrate</h1>
              <p className="lead text-center">
                y no te quedes con esas historias
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                            {/* Name input field */}
                            <TextFieldGroup 
                            placeholder="Usuario"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                            info="Escribe un alias que te identifique. También será la URL única hacia tu perfil"
                            />

                            {/* Email input field */}
                            <TextFieldGroup 
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            />


                            {/* Password input field */}
                            <TextFieldGroup 
                            placeholder="Contraseña"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                            />

                            {/* Password2 input field */}
                            <TextFieldGroup 
                            placeholder="Vuelve a escribir tu contraseña"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                            />
                            
                <input
                  type="submit"
                  className="btn btn btn-outline-dark btn-block mt-4"
                  value="Enviar"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Is a good practice to map the Proptypes
// in the component
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
