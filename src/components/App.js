import React from 'react'
import './App.css'
import styled from "@emotion/styled"

import timeSince from '../utils/timeSince'

const Subreddit = styled.div`
  font-weight: bold;
  margin: 0 10px;
`;

const ButtonContainer = styled.div`
  flex-direction: row;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid grey;
  margin: 20px;
`

const Date = styled.div`
  flex-direction: row;
  align-items: center;
`
const DateText = styled.div`
  margin-left: 5px;
`;

const Comments = styled.div`
  flex-direction: row;
  align-items: center;
`

const CommentsText = styled.div`
  margin-left: 5px;
`;

const PostHeader = styled.div`
  flex-direction: row;
`

const PostTitle = styled.a`
  color: black;
`

const AppContainer = styled.div`
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 100vh;
`;

export default function App({ loading, data, nextPage, previousPage }) {
  return (
    <AppContainer>
      {loading && (
        <div class="loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {!loading && (
        <div>
          <div>
            {data &&
              data.children.map(post => (
                <PostContainer key={post.data.id}>
                  <PostHeader>
                    <span>{post.data.author}</span>
                    <Subreddit>r/{post.data.subreddit}</Subreddit>
                    <Date>
                      <ion-icon name="time-outline"></ion-icon>
                      <DateText>
                        {timeSince(post.data.created * 1000)} ago
                      </DateText>
                    </Date>
                  </PostHeader>
                  <PostTitle
                    href={"https://www.reddit.com/" + post.data.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>{post.data.title}</h3>
                  </PostTitle>
                  <img alt={post.data.id} src={post.data.thumbnail} />
                  <Comments>
                    <ion-icon name="chatbubble-outline"></ion-icon>
                    <CommentsText>{post.data.num_comments}</CommentsText>
                  </Comments>
                </PostContainer>
              ))}
          </div>
          <ButtonContainer>
            <button onClick={previousPage}>previous page</button>
            <button onClick={nextPage}>next page</button>
          </ButtonContainer>
        </div>
      )}
    </AppContainer>
  );
}

