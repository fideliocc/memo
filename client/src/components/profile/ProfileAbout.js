import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import FavoritePosts from '../posts/FavoritePosts'
import MyPosts from '../posts/MyPosts'
import { Link } from 'react-router-dom'
import { getMyPosts, getFavorites } from '../../actions/postActions';

class ProfileAbout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myFavs : false
    }
  }

  componentDidMount() {
    //this.props.getCurrentProfile();
    this.props.getMyPosts(this.props.auth.user.id)
    this.props.getFavorites();
    console.log(this.props.post)
  }

  onMyFavsClick(e) {
    e.preventDefault();
    this.setState({ myFavs: true })
  }

  onMyPostsClick(e) {
    e.preventDefault();
    this.setState({ myFavs: false })
  }

  render() {
    let { myposts, favposts } = this.props.post
    return (
      <div>
      <div className="btn-group mb-4" role="group">
          <div className="col-md-auto"><Link to="" onClick={this.onMyPostsClick.bind(this)} className="btn btn-dark"><h2>Posts <span className="badge badge-light">{myposts.length}</span></h2></Link></div>
          <div className="col-md-auto"><Link to="" onClick={this.onMyFavsClick.bind(this)} className="btn btn-dark"><h2>Favoritos <span className="badge badge-light">{favposts.length}</span></h2></Link></div>
      </div>
          <div>
          {this.state.myFavs ? <FavoritePosts /> : <MyPosts />}
          </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
  getMyPosts: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getMyPosts, getFavorites })(ProfileAbout);
