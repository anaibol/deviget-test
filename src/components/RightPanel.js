import React from 'react'
import styled from '@emotion/styled'

import {
  useParams
} from 'react-router-dom'

const RightPanelContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  padding: 20px;
  position: relative;
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

const Lightbox = styled.a`
  display: none;
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);

  &:target {
    outline: none;
    display: block;
  }
`;

const LightboxImg = styled.img`
  max-width: 90%;
  max-height: 80%;
  margin-top: 2%;
`;

export default function RightPanel({ data }) {
  const { postId } = useParams()

  const post = data && data.children.find(post => post.data.id === postId)

  if (!post) return null;

  return (
    <RightPanelContainer>
      <Author>{post.data.author}</Author>
      <a href="#img1">
        <PostThumbnail alt={post.data.id} src={post.data.thumbnail} />
      </a>
      <Lightbox href="#_" id="img1">
        <LightboxImg
          src={post.data.preview.images[0].source.url.replace(/amp;/g, "")}
        />
      </Lightbox>
      <PostTitle>{post.data.title}</PostTitle>
    </RightPanelContainer>
  );
}
