import Container from '@components/Container';
import Divider from '@components/Divider';
import Loading from '@components/Loading';
import { PostTitle } from '@components/Title';
import usePost from '@hooks/usePost';
import {
  PostImageContainer,
  ProjectContent,
  ProjectDescription,
} from '@styles/compositions/Project.styles';
import { RoundedImage } from '@styles/ImageStyles';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const { postId } = useParams();
  const { post, loading, error } = usePost(postId);

  if (loading) return <Loading />;

  if (error || !post) {
    return (
      <Container maxWidth="1024px">
        <div
          style={{
            textAlign: 'center',
            padding: '200px 20px',
            color: '#888',
          }}
        >
          <h2 style={{ fontWeight: 400, marginBottom: 12 }}>
            포스트를 불러올 수 없습니다
          </h2>
          <p style={{ fontWeight: 200 }}>
            존재하지 않거나 삭제된 포스트입니다.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Unblind</title>
        <meta
          name="description"
          content={`${(post.content || '').substring(0, 50)}...`}
        />
      </Helmet>

      <Container maxWidth="1024px">
        <PostImageContainer style={{ marginBottom: 32 }}>
          {post.thumbnail?.url && (
            <RoundedImage
              src={post.thumbnail.url}
              alt={post.thumbnail.altText}
              style={{ width: '100%', height: '100%', borderRadius: 16 }}
            />
          )}
        </PostImageContainer>
        <ProjectContent>
          <PostTitle>{post.title}</PostTitle>
          <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
            <span style={{ fontWeight: 500, fontSize: 20 }}>
              {post.author?.name}
            </span>
            <span style={{ color: '#aaa', fontSize: 20 }}>
              {post.createdAt?.slice(0, 10)}
            </span>
          </div>
          <Divider visible={true} margin="0" />
          <ProjectDescription style={{ marginTop: 24, whiteSpace: 'pre-line' }}>
            {post.content}
          </ProjectDescription>
        </ProjectContent>
      </Container>
    </>
  );
}
