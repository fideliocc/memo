
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, addFavorite } from '../../actions/postActions';
import Modal from 'react-responsive-modal';
import '../../custom-styling.css';
import Icon from '../layout/favicon.png'

import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';

import {
  FacebookIcon,
  TwitterIcon
} from 'react-share';

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    if(this.props.auth.isAuthenticated) {
    this.props.addLike(id);
    } else {
      this.onOpenModal();
    }
  }

  onFavClick(id) {
    if(this.props.auth.isAuthenticated) {
      this.props.addFavorite(id);
      } else {
        this.onOpenModal();
      }
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  findUserFav(favs) {
    const { auth } = this.props;
    if (favs.filter(fav => fav.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    const { post, auth, showActions } = this.props;
    const date = post.date.toString().split("T", 1);

    const { open } = this.state;

    return (

      <div className="card card-body mb-3">
        {/* Modal Box */}
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{ overlay: 'black-overlay', modal: 'white' }}
        >
          <img src={Icon} className="favicon" />
          <h1>Desahógate</h1>
          <p>acá hay un espacio para las peores historias del día</p>
          <hr></hr>
          <p><Link to={"/login"}>Inicia sesión</Link> o <Link to={"/register"}>regístrate</Link> para continuar</p>
        </Modal>

        <div className="row">
          <div className="col-md-10">
          <Link to={`/profile/${post.name}`} ><strong className="text-left">{post.name}</strong></Link>
            <p className="lead">{post.text}</p>
            <div className="row"><div className="col-md-10"><p className="small text-muted">Publicado: {date}</p></div></div>

            {showActions ? (
              <span>
              {/* Like Button */}
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                
                {/* Favorite Button */}
                <button
                onClick={this.onFavClick.bind(this, post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i
                  className={classnames('fas fa-thumbtack', {
                    'text-info': this.findUserFav(post.favorites)
                  })}
                />
                <span className="badge badge-light">{post.favorites.length}</span>
              </button>

                {/* Dislike Button */}
                {/*<button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                  </button> */}

                {/* Comments Button */}
                <Link to={`/post/${post._id}`} className="btn btn-outline-dark mr-1">
                  Comentarios
                </Link>

                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
                
                <p></p>

                
                <div className="row">
                <div className="col-md-auto">
                <TwitterShareButton
                  url={`https://elmuro.com/${post._id}`}
                  title={post.text}
                  /*via=""*/
                >
                  <TwitterIcon size={28} round={true} />
                </TwitterShareButton>
                </div>
                
                <FacebookShareButton
                  url={`https://elmuro.com/${post._id}`}
                  quote={post.text}
                >
                <div className="col-md-auto">
                <FacebookIcon size={28} round={true} />
                </div>
                </FacebookShareButton>
                </div>


              </span>
            ) : null}
          </div>
        </div>
      </div>

    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired, 
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deletePost, addLike, addFavorite })(
  PostItem
);
