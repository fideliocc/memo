import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    console.log(profile)
    const { profile } = this.props;
    const date = profile.user.date.toString().split("T", 1)

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-dark text-white mb-3">

            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>

              <div>
              <p>Usuario desde: {date}</p>
            </div>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

              <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>...</span>
              ) : (
                <span>{profile.bio}</span>
              )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
