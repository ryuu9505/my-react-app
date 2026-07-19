import Container from '@components/common/Container';
import Divider from '@components/common/Divider';
import Footer from '@components/common/Footer';
import Loading from '@components/common/Loading';
import { PostTitle } from '@components/common/Title';
import BasicHeader from '@components/header/BasicHeader';
import usePost from '@hooks/usePost';
import { PostImageContainer } from '@styles/compositions/Project.styles';
import { formatDate } from '@utils/format';
import { toSafeHttpUrl } from '@utils/url';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Markdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const HeroImageContainer = styled(PostImageContainer)`
  margin-bottom: 32px;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  align-items: baseline;
`;

const AuthorName = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
`;

const PostDate = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 300;
  font-size: 1rem;
`;

const MarkdownBody = styled.div`
  margin-top: 24px;
  width: 100%;
  font-weight: 300;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};

  h1,
  h2,
  h3 {
    margin: 32px 0 12px;
    line-height: 1.3;
  }

  p {
    margin: 12px 0;
  }

  ul,
  ol {
    margin: 12px 0;
    padding-left: 24px;
  }

  blockquote {
    margin: 16px 0;
    padding: 4px 16px;
    border-left: 3px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.secondary};
  }

  pre {
    margin: 16px 0;
    padding: 16px;
    border-radius: 8px;
    background: #f6f8fa;
    overflow-x: auto;
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.9em;
    background: #f6f8fa;
    padding: 2px 4px;
    border-radius: 4px;
  }

  pre code {
    padding: 0;
    background: none;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }

  table {
    border-collapse: collapse;
    margin: 16px 0;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 6px 12px;
  }
`;

const ExternalNotice = styled.p`
  margin-top: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.secondary};

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }
`;

const ErrorState = styled.div`
  width: 100%;
  text-align: center;
  padding: 160px 20px;
  color: ${({ theme }) => theme.colors.secondary};

  h2 {
    font-weight: 400;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-weight: 200;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 24px;
  padding: 8px 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default function PostPage() {
  const { postId } = useParams();
  const { post, loading } = usePost(postId);

  if (loading) return <Loading />;

  // 캐시된 포스트가 있으면 refetch 실패(error)와 무관하게 본문을 유지한다.
  if (!post) {
    return (
      <>
        <BasicHeader />
        <Container maxWidth="1024px">
          <ErrorState>
            <h2>포스트를 불러올 수 없습니다</h2>
            <p>존재하지 않거나 삭제된 포스트입니다.</p>
            <BackLink to="/posts">포스트 목록으로</BackLink>
          </ErrorState>
        </Container>
        <Footer />
      </>
    );
  }

  const externalUrl = toSafeHttpUrl(post.externalUrl);
  const description = (post.content || post.subtitle || '').slice(0, 80);

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Unblind`}</title>
        <meta name="description" content={description} />
      </Helmet>

      <BasicHeader />
      <Container maxWidth="1024px">
        {post.thumbnail?.url && (
          <HeroImageContainer>
            <HeroImage
              src={post.thumbnail.url}
              alt={post.thumbnail.altText || ''}
            />
          </HeroImageContainer>
        )}
        <PostTitle>{post.title}</PostTitle>
        <MetaRow>
          {/* 백엔드가 아직 author 필드를 내려주지 않아 현재는 날짜만 표시된다.
              author 추가가 백엔드에 요청되어 있어 분기를 유지한다. */}
          {post.author?.name && <AuthorName>{post.author.name}</AuthorName>}
          <PostDate>{formatDate(post.createdAt)}</PostDate>
        </MetaRow>
        <Divider visible={true} margin="0" />
        {post.content ? (
          <MarkdownBody>
            <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
          </MarkdownBody>
        ) : (
          externalUrl && (
            <ExternalNotice>
              이 포스트의 본문은 외부 블로그에 있습니다.{' '}
              <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                원문 보러가기
              </a>
            </ExternalNotice>
          )
        )}
      </Container>
      <Footer />
    </>
  );
}
