import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost, getPosts } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      //avatar: user.avatar
      status: "pending"
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
    this.props.getPosts();
    this.props.history.push("/")
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (

      <div className="post-form mb-3">
       { /*} <Link to="/" className="btn btn-light mb-3">
          Regresar
    </Link> */ }
        
          <h2>Antes de lamentarte...</h2>
          <p>Ajusta tu historia a estas sencillas reglas para que sea publicada: </p>
          <li>Cuida la ortografía y puntuación</li>
          <li>Cuenta un suceso único</li>
          <li>No ofendas ni discrimines</li>
          <br></br>
        <div className="card card-info">
          <div className="card-header bg-dark text-white"><h3>Cuéntanos tu historia</h3></div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Recuerda que debes cuidar la ortografía y expresarte en 300 caractéres, por desgracia."
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
               Enviar
               </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost, getPosts })(PostForm);
