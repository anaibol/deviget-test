import React from "react"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"

import timeSince from "../utils/timeSince";

const ButtonContainer = styled.div`
  flex-direction: row;
  justify-content: space-between;
`

const PostContainer = styled(Link)`
  border-bottom: 1px solid #333232;
  padding: 15px;

  &:focus {
    background-color: #333232;
  }
`;

const Date = styled.div`
  flex-direction: row;
  align-items: center;
`
const DateText = styled.div`
  margin-left: 5px;
`

const Comments = styled.div`
  flex-direction: row;
  align-items: center;
`

const CommentsText = styled.div`
  margin-left: 5px;
`

const PostFooter = styled.div`
  flex-direction: row;
  color: orange;
  justify-content: space-between;
  margin-top: 10px;
`;

const PostHeader = styled.div`
  flex-direction: row;
  margin-bottom: 10px;
`

const PostContent = styled.div`
  flex-direction: row;
  align-items: center;
  flex: 1;
  font-size: 14px;
`;

const PostThumbnail = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;
const PostTitle = styled.div`
`

const Author = styled.div`
  font-weight: bold;
  margin-right: 15px;
  margin-left: 15px;
`;

const LeftPanelContainer = styled.div`
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 450px;
  border-right: 1px solid white;
  color: white;
`

const Title = styled.h2`
  color: white;
  text-align: center;
  font-size: 18px;
`

const UnreadDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #033dfc;
  border-radius: 50%;
  margin-right: 15px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const PostsContainer = styled.div`
  overflow-y: auto;
  max-height: 100vh;
  position: relative;
`;

const Chevron = styled.div`
  margin-left: auto;
`;

const Dissmiss = styled.div`
  flex-direction: row;
  align-items: center;
`;

const DissmissText = styled.div`
  margin-left: 5px;
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  padding: 10px;
  border: 1px solid white;
  border-radius: 5px;
  margin: 5px;
`;

export default function LeftPanel({ loading, data, markRead, dismissPost, nextPage, previousPage }) {
  return (
    <LeftPanelContainer>
      {loading && (
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {!loading && (
        <div>
          <Title>Reddit posts</Title>
          <ButtonContainer>
            <Button onClick={previousPage}>previous page</Button>
            <Button onClick={nextPage}>next page</Button>
          </ButtonContainer>
          <PostsContainer>
            {data &&
              data.children.map(post => (
                <PostContainer
                  to={post.data.id}
                  key={post.data.id}
                  onClick={() => markRead(post.data.id)}
                >
                  <PostHeader>
                    {!post.read && <UnreadDot />}
                    <Author>{post.data.author}</Author>
                    <Date>
                      <ion-icon name="time-outline"></ion-icon>
                      <DateText>
                        {timeSince(post.data.created * 1000)} ago
                      </DateText>
                    </Date>
                  </PostHeader>
                  <PostContent>
                    <PostThumbnail
                      alt={post.data.id}
                      src={post.data.thumbnail}
                    />
                    <PostTitle>{post.data.title}</PostTitle>
                    <Chevron>
                      <ion-icon name="chevron-forward-outline"></ion-icon>
                    </Chevron>
                  </PostContent>
                  <PostFooter>
                    <Dissmiss onClick={() => dismissPost(post.data.id)}>
                      <ion-icon name="close-circle-outline"></ion-icon>
                      <DissmissText>Dismiss post</DissmissText>
                    </Dissmiss>
                    <Comments>
                      <ion-icon name="chatbubble-outline"></ion-icon>
                      <CommentsText>{post.data.num_comments}</CommentsText>
                    </Comments>
                  </PostFooter>
                </PostContainer>
              ))}
          </PostsContainer>
        </div>
      )}
    </LeftPanelContainer>
  );
}
