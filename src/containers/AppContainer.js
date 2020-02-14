import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { loadPosts, markRead, dismissPost } from "../redux/modules/posts";

import App from '../components/App'

function AppContainer({ data, loading, loadPosts, markRead, dismissPost }) {
  const [page, setPage] = useState();

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const nextPage = () => setPage(data.after);
  const previousPage = () => setPage(data.before);

  return (
    <App
      data={data}
      loading={loading}
      nextPage={nextPage}
      previousPage={previousPage}
      markRead={markRead}
      dismissPost={dismissPost}
    />
  );
}

export default connect(
  state => ({ data: state.posts.data, loading: state.posts.loading }),
  { loadPosts, markRead, dismissPost }
)(AppContainer);