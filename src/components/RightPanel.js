import React from 'react'
import styled from '@emotion/styled'

import {
  useParams
} from 'react-router-dom'

const RightPanelContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  padding: 20px;
`;

const Author = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const PostThumbnail = styled.img`
  margin: 20px auto;
`;
const PostTitle = styled.div`
`;

export default function RightPanel({ data }) {
  const { postId } = useParams()

  const post = data && data.children.find(post => post.data.id === postId)

  if (!post) return null;

  return (
    <RightPanelContainer>
        <Author>{post.data.author}</Author>
        <PostThumbnail alt={post.data.id} src={post.data.thumbnail} />
        <PostTitle>{post.data.title}</PostTitle>
    </RightPanelContainer>
  );
}
