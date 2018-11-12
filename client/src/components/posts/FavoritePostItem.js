
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import { deletePost, addLikeFavs, addFavoriteFavs } from '../../actions/postActions';
import { getCurrentProfile, getProfileByHandle, clearCurrentProfile } from "../../actions/profileActions";


import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';

import {
  FacebookIcon,
  TwitterIcon
} from 'react-share';

class FavoritePostItem extends Component {
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
      return <Redirect to={`/profile/${this.props.profile.profile.handle}`} />
    }
    //this.props.history.push("/profile")
  }

  onNameClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.getProfileByHandle(this.props.post.name);
    this.setRedirect();
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLikeFavs(id);
  }

  onFavClick(id) {
    this.props.addFavoriteFavs(id);
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
    return (

      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
          {this.renderRedirect()}
          <Link to="" onClick={this.onNameClick.bind(this)}><strong className="text-left">{post.name}</strong></Link>
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
                <Link to={`/post/${post._id}`} className="btn btn-dark mr-1">
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
                  url={`http://elmuro.com/${post._id}`}
                  title={post.text}
                  /*via=""*/
                >
                  <TwitterIcon size={28} round={true} />
                </TwitterShareButton>
                </div>
                
                <FacebookShareButton
                  url={`http://elmuro.com/${post._id}`}
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

FavoritePostItem.defaultProps = {
  showActions: true
};

FavoritePostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLikeFavs: PropTypes.func.isRequired,
  addFavoriteFavs: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deletePost, addLikeFavs, addFavoriteFavs, getProfileByHandle, getCurrentProfile, clearCurrentProfile })(
  FavoritePostItem
);
