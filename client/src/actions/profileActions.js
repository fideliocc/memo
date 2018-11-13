import axios from 'axios';

import {
  GET_CURRENT_PROFILE,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';


// Get profile of current user
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: {}
      })
    );
};


// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

  // Get profile by handle
  export const getProfileByHandle = handle => dispatch => {
    dispatch(clearCurrentProfile())
    //dispatch(setProfileLoading())
    axios
      .get(`/api/profile/${handle}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: null
        })
      );
  };

// Delete account & profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Estás seguro(a)? Esto no puede ser deshecho!')) {
      axios
        .delete('/api/profile')
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  };


  
  // Profile loading
  export const setProfileLoading = () => {
    return {
      type: PROFILE_LOADING
    };
  };
  
  // Clear profile
  export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRENT_PROFILE
    };
  };