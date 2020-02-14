import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import loadPosts from '../redux/modules/reddit'

import App from '../components/App'

function AppContainer({ posts }) {
  useEffect(() => { loadPosts() }, [])

  return <App posts={posts} />
}

export default connect(state => ({ posts: state.reddit.posts }), { loadPosts })(AppContainer)