/* This is the Landing page layout. Comments are the main content for now, 
but in future it can change depending on authorization */

import React, { Component } from 'react'
import Posts from '../posts/Posts'

class Landing extends Component {
  render() {
    return (
      <div>
        <Posts/>
      </div>
    )
  }
}

export default Landing;

