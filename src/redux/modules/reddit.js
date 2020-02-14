import api from '../../utils/api'

const LOAD_STARTED = 'reddit/LOAD_STARTED'
const LOAD_SUCCESS = 'reddit/LOAD_SUCCESS'
const LOAD_FAIL = 'reddit/LOAD_FAIL'

export default (state = { loaded: false }, action = {}) => {
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
        posts: [...state.posts, action.payload]
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

export function loadPosts() {
  return dispatch => {
    api.get('top?json')
      .then(res => {
        dispatch(loadSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadFailure(err.message))
      })
  }
}


const loadSuccess = todo => ({
  type: LOAD_SUCCESS,
  payload: {
    ...todo
  }
})

// const loadStarted = () => ({
//   type: LOAD_STARTED
// })

const loadFailure = error => ({
  type: LOAD_FAIL,
  payload: {
    error
  }
})