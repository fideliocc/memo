
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, addFavorite, updatePost } from '../../../actions/postActions';

class PostItem extends Component {

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onFavClick(id) {
    this.props.addFavorite(id);
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

  onApproveClick(id) {
    this.props.updatePost(id.toString());
  }


  render() {
    const { post, auth, showActions } = this.props;
    return (

      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
          <Link to={`/profile/${post.name}`} ><strong className="text-left">{post.name}</strong></Link>
            <p className="lead">{post.text}</p>
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

                {/* Comments Button */}
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comentarios
                </Link>

                {/* Edit Button */}
                <button
                //onClick={this.onEditClick.bind(this, post._id)} 
                type="button"
                className="btn btn-warning"
                value="Editar"
               >
              <Link to={`/admin/post/${post._id}/edit`} >Editar</Link>
             </button>

                {/* Approve Button */}
                <button
                onClick={this.onApproveClick.bind(this, post._id)} 
                type="button"
                className="btn btn-success mr-1"
                value="Aprobar"
               >
               <i>
               {"Aprobar"}
             </i>
             </button>



                
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
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
  updatePost: PropTypes.func.isRequired, 
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  //profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  //profile: state.profile
});

export default connect(mapStateToProps, { deletePost, addLike, addFavorite, updatePost })(
  PostItem
);
