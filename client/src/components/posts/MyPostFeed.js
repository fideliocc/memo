import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyPostItem from './MyPostItem';

class MyPostFeed extends Component {
  render() {
    
    const { posts } = this.props;
    
    return posts.map(post => <MyPostItem key={post._id} post={post} />);
  }
}

MyPostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default MyPostFeed;
