import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPendingPosts } from '../../../actions/postActions'
import Spinner from '../../common/Spinner';
import PostFeed from './PostFeed';


class Dashboard extends Component {
  componentDidMount() {
    this.props.getPendingPosts();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { pendingposts, loading } = this.props.post;
    let postContent;

      // Check if logged in user has profile data

        if (pendingposts === null || loading) {
          postContent = <Spinner />;
        } else {
          postContent = <PostFeed posts={pendingposts} />;      
        }
       


    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <div className="row">
            <Link to="/" className="btn btn-light mb-3 float-left">
              Regresar
            </Link>
          </div>
              <h1 className="display-4">Administradorrrr</h1>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getPendingPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getPendingPosts })(
  Dashboard
);
