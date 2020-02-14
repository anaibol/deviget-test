import React from 'react'
import './App.css'

export default function App({ data, nextPage, previousPage }) {
  return (
    <div className="App">
      <div>
        {data &&
          data.children.map(post => (
            <div key={post.data.id}>
              <a
                href={"https://www.reddit.com/" + post.data.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                sad
              </a>
              <span>{post.data.author}</span>
              <span>{new Date(post.data.created * 1000).toDateString()}</span>
              <img
                src={
                  post.data.thumbnail
                }
              />
            </div>
          ))}
      </div>
      <button onClick={previousPage}>previous page</button>
      <button onClick={nextPage}>next page</button>
    </div>
  );
}

