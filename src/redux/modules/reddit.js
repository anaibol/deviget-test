import api from '../../utils/api'

const LOAD_STARTED = 'reddit/LOAD_STARTED'
const LOAD_SUCCESS = 'reddit/LOAD_SUCCESS'
const LOAD_FAIL = 'reddit/LOAD_FAIL'

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

const loadSuccess = todo => ({
  type: LOAD_SUCCESS,
  payload: {
    ...todo
  }
})

const loadFailure = error => ({
  type: LOAD_FAIL,
  payload: {
    error
  }
})
