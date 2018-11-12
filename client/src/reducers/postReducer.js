import {
  ADD_POST,
  GET_POSTS,
  GET_MY_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  GET_FAVORITES,
  GET_PENDING,
} from '../actions/types';

const initialState = {
  posts: [],
  favposts: [],
  pendingposts: [],
  myposts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_FAVORITES:
      return {
        ...state,
        favposts: action.payload,
        loading: false
      }
    case GET_PENDING:
    return {
      ...state,
      pendingposts: action.payload,
      loading: false
    }
    case GET_MY_POSTS:
    return {
      ...state,
      myposts: action.payload,
      loading: false
    }
    default:
      return state;
  }
}
