import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavoritePostItem from './FavoritePostItem';

class FavoritePostFeed extends Component {
  render() {
    const { posts } = this.props;
    
    return posts.map(post => <FavoritePostItem key={post._id} post={post} />);
  }
}

FavoritePostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default FavoritePostFeed;
