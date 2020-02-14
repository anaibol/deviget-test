import api from '../../utils/api'

const LOAD_STARTED = 'posts/LOAD_STARTED'
const LOAD_SUCCESS = 'posts/LOAD_SUCCESS'
const LOAD_FAIL = 'posts/LOAD_FAIL'
const MARK_READ = "posts/MARK_READ";
const DISMISS_POST = "posts/DISMISS_POST";

const LIMIT = 50

export default (state = { loaded: false, page: 0 }, action = {}) => {
  switch (action.type) {
    case LOAD_STARTED:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case MARK_READ:
      return {
        ...state,
        data: {
          ...state.data,
          children: state.data.children.map(post => {
            if (action.payload === post.data.id) {
              return { ...post, read: true };
            } else return post;
          })
        }
      };
    case DISMISS_POST:
      return {
        ...state,
        data: {
          ...state.data,
          children: state.data.children.filter(
            post => action.payload !== post.data.id
          )
        }
      };

      default:
      return state
  }
}

export function loadPosts(after) {
  return (dispatch, state) => {
    dispatch(loadStarted());

    api
      .get("top/.json", { params: { limit: LIMIT, after } })
      .then(res => {
        dispatch(loadSuccess(res.data));
      })
      .catch(err => {
        dispatch(loadFailure(err.message));
      });
  };
}

export const loadStarted = () => ({
  type: LOAD_STARTED
});

export const markRead = postId => ({
  type: MARK_READ,
  payload: postId
});
export const dismissPost = postId => ({
  type: DISMISS_POST,
  payload: postId
});

const loadSuccess = data => ({
  type: LOAD_SUCCESS,
  payload: data
})

const loadFailure = error => ({
  type: LOAD_FAIL,
  payload: {
    error
  }
})
