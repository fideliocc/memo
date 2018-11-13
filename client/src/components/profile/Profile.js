import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
//import ProfileCreds from './ProfileCreds';
//import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle, getCurrentProfile } from '../../actions/profileActions';

class Profile extends Component {

  componentDidMount() {
    const handle = this.props.match.params.handle;
    //console.log(handle)
    if (handle) {
      this.props.getProfileByHandle(handle);
    }
    //this.props.history.push(`/profile/${handle}`)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }
  
  // OMG!!!
  componentDidUpdate(prevProps) {
    const oldHandle = prevProps.match.params.handle;
    const newHandle = this.props.match.params.handle;
    if(oldHandle !== newHandle) {
      this.props.getProfileByHandle(newHandle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    //console.log(this.props.match.params.handle, 'profile');
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle, getCurrentProfile })(Profile);
