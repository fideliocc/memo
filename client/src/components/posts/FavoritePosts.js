import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* import PostForm from './PostForm';*/
import FavoritePostFeed from './FavoritePostFeed';
import Spinner from '../common/Spinner';
import { getFavoritesById } from '../../actions/postActions';

class FavoritePosts extends Component {

  componentDidMount() {
    this.props.getFavoritesById(this.props.profile.profile.user._id);
  }

  render() {
   
    const { favposts, loading } = this.props.post;
    let postContent;

      if (favposts === null || loading) {
        postContent = <Spinner />;
      } else {
        postContent = <FavoritePostFeed posts={favposts} />;      
      }


    return (

      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/*<PostForm />*/}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FavoritePosts.propTypes = {
  getFavoritesById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
});

export default connect(mapStateToProps, { getFavoritesById })(FavoritePosts);

