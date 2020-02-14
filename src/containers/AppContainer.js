import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { loadPosts } from '../redux/modules/reddit'

import App from '../components/App'

function AppContainer({ data, loading, loadPosts }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadPosts(page)
  }, [page]);

  const nextPage = () => setPage(data.after);
  const previousPage = () => setPage(data.before);

  return (
    <App
      data={data}
      loading={loading}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
}

export default connect(
  state => ({ data: state.reddit.data, loading: state.reddit.loading }),
  { loadPosts }
)(AppContainer);