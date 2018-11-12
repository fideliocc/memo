import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'
import { getPost, updatePostText, getPendingPosts } from '../../../actions/postActions';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text: '',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // Recibe post y lo carga en el state
    if (nextProps.post) {
      this.setState({ text: nextProps.post.post.text })
    } 
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedPost = {
        text: this.state.text,
      };

      this.props.updatePostText(this.props.post.post._id, updatedPost);
      this.setState({ text: '' });
      this.props.history.push("/admin")
      this.props.getPendingPosts();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div className="post-form mb-3">
          <Link to="/admin" className="btn btn-light mb-3">
            Regresar
          </Link>

          <div className="card card-info">
            <div className="card-header bg-info text-white"><h3>Cuéntanos tu historia</h3></div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup
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

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(mapStateToProps, { getPost, updatePostText, getPendingPosts })(EditPost);