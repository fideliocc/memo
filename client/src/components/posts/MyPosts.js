import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* import PostForm from './PostForm';*/
import MyPostFeed from './MyPostFeed';
import Spinner from '../common/Spinner';
import { getMyPosts } from '../../actions/postActions';

class MyPosts extends Component {

  componentDidMount() {
    this.props.getMyPosts(this.props.profile.profile.user._id);
  }

  render() {
    const { myposts, loading } = this.props.post;
    let postContent;

      if (myposts === null || loading) {
        postContent = <Spinner />;
      } else {
        postContent = <MyPostFeed posts={myposts} />;      
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

MyPosts.propTypes = {
  getMyPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getMyPosts })(MyPosts);

