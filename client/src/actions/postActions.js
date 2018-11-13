import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_MY_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  GET_FAVORITES,
  GET_PENDING,
} from './types';

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Approved Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Update Post status by Id
export const updatePost = (id) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/admin/posts/${id}`)
    .then(res => dispatch(getPendingPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Update Post Text and Status by Id
export const updatePostText = (id, postData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/admin/posts/${id}/edit`, postData)
    .then(res => dispatch(getPendingPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};



// Get My Approved Posts
export const getMyPosts = user_id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/user/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_MY_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MY_POSTS,
        payload: err.response.data
      })
    );
};

// Get Pending Posts
export const getPendingPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/admin/posts/pending')
    .then(res =>
      dispatch({
        type: GET_PENDING,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};


// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like dispatching single post
export const addLikeSingle = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPost(id)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Favorite dispatching single post
export const addFavoriteSingle = id => dispatch => {
  axios
  .post(`/api/posts/favorite/${id}`)
  .then(res => dispatch(getPost(id)))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Favorite
export const addFavorite = id => dispatch => {
  axios
  .post(`/api/posts/favorite/${id}`)
  .then(res => dispatch(getPosts()))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// Add Like for Favorites Feed
export const addLikeFavs = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getFavorites()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Add Favorite for Favorites Feed
export const addFavoriteFavs = id => dispatch => {
  axios
  .post(`/api/posts/favorite/${id}`)
  .then(res => dispatch(getFavorites()))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// Add Like for My Posts Feed
export const addLikeMyPosts = (id, user_id) => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getMyPosts(user_id)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Get Favorites of current user
export const getFavorites =  () => dispatch => {
  dispatch(setPostLoading());
  axios
  .get('/api/posts/favorites')
  .then(res => dispatch({
    type: GET_FAVORITES,
    payload: res.data
  })
)
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  })
)
}


// Get Favorites by Id
export const getFavoritesById =  id => dispatch => {
  dispatch(setPostLoading());
  axios
  .get(`/api/posts/favorites/${id}`)
  .then(res => dispatch({
    type: GET_FAVORITES,
    payload: res.data
  })
)
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  })
)
}

// Add Favorite for My Posts Feed
export const addFavoriteMyPosts = (id, user_id) => dispatch => {
  axios
  .post(`/api/posts/favorite/${id}`)
  .then(res => dispatch(getMyPosts(user_id)))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}



// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
