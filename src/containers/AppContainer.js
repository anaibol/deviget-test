import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { loadPosts } from '../redux/modules/reddit'

import App from '../components/App'

function AppContainer({ data, loadPosts }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadPosts(page)
  }, [page]);

  const nextPage = () => setPage(page => page + 1);
  const previousPage = () => setPage(page => page - 1);

  return <App data={data} nextPage={nextPage} previousPage={previousPage} />;
}

export default connect(state => ({ data: state.reddit.data }), { loadPosts })(AppContainer)